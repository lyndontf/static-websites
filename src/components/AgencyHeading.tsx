'use client';

import { useSiteLang } from '@/lib/useSiteLang';

const ZH: Record<string, string> = {
  'Browse all biodata →': '浏览所有履历 →',
  'Check before you apply': '申请前先检查',
  'Can your family hire a domestic helper?': '您的家庭可以聘请家庭帮佣吗？',
};

export default function AgencyHeading({ text }: { text: string }) {
  const lang = useSiteLang();
  return <>{lang === 'zh' && ZH[text] ? ZH[text] : text}</>;
}
