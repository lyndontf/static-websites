// The preview pages read ?id=... in the browser and show unpublished drafts to the editor: they must be
// rendered per request, never cached or shared.
export const dynamic = 'force-dynamic';

export default function PreviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
