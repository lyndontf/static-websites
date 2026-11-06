'use client';

import { useEffect } from 'react';
import { useSiteLang } from '@/lib/useSiteLang';

// Browser tab title in the visitor's language. The server renders the English title; when the visitor chose Chinese and the
// page has signed Chinese text, the tab shows the Chinese title, and goes back to English when they switch back.
export default function MaidsTitle({ zh }: { zh?: string | null }) {
  const lang = useSiteLang();
  useEffect(() => {
    if (lang !== 'zh' || !zh) return;
    const original = document.title;
    document.title = zh;
    return () => {
      document.title = original;
    };
  }, [lang, zh]);
  return null;
}
