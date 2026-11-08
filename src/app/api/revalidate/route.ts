import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { timingSafeEqual } from 'node:crypto';

// Called after a CMS publish / unpublish / save / delete (the Flutter admin does this fire-and-forget) to make a
// change visible straight away instead of waiting out the 60-second cache window.
//
// Every CMS read made on the server carries the tag "cms" and, when the query is for one site, "site:<site_id>"
// (see src/lib/supabase.ts). Dropping a tag marks the cached data stale AND the cached pages that were built
// from it, so each page is rebuilt the next time somebody asks for it. Nothing is rebuilt eagerly.
//
// Body (JSON, all optional): { site_id?: "<uuid>", slug?, type? }. With site_id only that site's pages are
// dropped; without it, every site's are (the callers that do not know the site id, today's Flutter admin, land here).
// Header: x-revalidation-secret.

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function secretMatches(given: string | null): boolean {
  const expected = process.env.REVALIDATION_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get('x-revalidation-secret'))) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  let body: { site_id?: unknown; slug?: unknown; type?: unknown } = {};
  try {
    body = await request.json();
  } catch {
    // an empty body means "everything"
  }

  const siteId = typeof body.site_id === 'string' && UUID.test(body.site_id) ? body.site_id.toLowerCase() : null;
  const tag = siteId ? `site:${siteId}` : 'cms';
  try {
    revalidateTag(tag);
    return NextResponse.json({ revalidated: true, tag, slug: body.slug ?? null, type: body.type ?? null });
  } catch {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
