'use client';

import type { ReactNode } from 'react';
import { useSiteLang } from '@/lib/useSiteLang';

// Shows the Chinese version of a part of a page when the visitor chose Chinese and that page has signed Chinese text;
// otherwise the English. Both are rendered on the server, so no extra request is made.
export default function MaidsLangSwitch({ en, zh }: { en: ReactNode; zh?: ReactNode | null }) {
  const lang = useSiteLang();
  return <>{lang === 'zh' && zh ? zh : en}</>;
}
