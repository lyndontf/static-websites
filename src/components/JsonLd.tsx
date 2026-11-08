import { jsonLdString } from '@/lib/site-schema';

// Renders schema.org JSON-LD. Server component: the markup is in the cached HTML.
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const list = Array.isArray(data) ? data : [data];
  if (list.length === 0) return null;
  return (
    <>
      {list.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString(d) }} />
      ))}
    </>
  );
}
