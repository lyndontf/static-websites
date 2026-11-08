import { NextRequest, NextResponse } from 'next/server';

// Receives Content-Security-Policy-Report-Only violation reports from browsers (see next.config.js). Nothing is
// stored: each report becomes one short line in the Vercel runtime logs, so the policy can be tightened from
// what pages actually load. Bounded and unauthenticated by design (browsers send these without credentials).
const MAX_BYTES = 8 * 1024;

export async function POST(request: NextRequest) {
  try {
    const text = (await request.text()).slice(0, MAX_BYTES);
    const body = JSON.parse(text);
    const r = body['csp-report'] ?? body;
    const pick = (k: string) => String(r?.[k] ?? r?.body?.[k] ?? '').slice(0, 200);
    console.log(
      'csp-report',
      JSON.stringify({
        page: pick('document-uri') || pick('documentURL'),
        directive: pick('violated-directive') || pick('effectiveDirective'),
        blocked: pick('blocked-uri') || pick('blockedURL'),
      }),
    );
  } catch {
    // malformed report: ignore
  }
  return new NextResponse(null, { status: 204 });
}
