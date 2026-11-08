'use client';

import { useEffect, useRef } from 'react';
import { lazyLoadImages } from '@/lib/lazy-images';

// Browsers never execute <script> tags that arrive via innerHTML (which is what
// dangerouslySetInnerHTML does under the hood) — only tags parsed directly by
// the browser's own HTML parser run. Since React's hydration occasionally
// detects a mismatch elsewhere on the page and "repairs" this subtree by
// re-setting its innerHTML client-side, every embedded <script> (mobile menu,
// tab switches, the WhatsApp widget, tour modals, the cost calculator, etc.)
// can silently stop working. Re-creating and re-appending each <script> node
// after mount forces it to execute, regardless of how hydration went.
export default function CmsHtmlRenderer({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    function runScripts() {
      if (!container) return;
      const scripts = Array.from(container.querySelectorAll('script:not([data-executed])'));
      scripts.forEach((oldScript) => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach((attr) => {
          newScript.setAttribute(attr.name, attr.value);
        });
        newScript.setAttribute('data-executed', 'true');
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });
    }

    runScripts();

    // If a hydration mismatch fires elsewhere on the page, React "repairs" this
    // subtree by wholesale-replacing its innerHTML with the original (unexecuted)
    // server HTML — silently killing every listener the scripts above attached.
    // Since the effect's [html] dependency never changes, it won't re-fire on its
    // own, so watch the subtree directly and re-run against any fresh script tags.
    const observer = new MutationObserver(() => runScripts());
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [html]);

  return (
    <div
      ref={ref}
      className="cms-html-page"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: lazyLoadImages(html) }}
    />
  );
}
