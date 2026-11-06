'use client';

import { useLangToggle, useSiteLang } from '@/lib/useSiteLang';

// English / Mandarin toggle for Maids in Malaysia, the same system as the agency site (shared 'glc-lang' choice, saved in the
// browser). The site's own labels (menu, buttons, footer, trust bar, WhatsApp callout, helper cards) have Chinese below.
// Page text has no Chinese yet: it stays in English until the Chinese pages are written, checked and signed off.

export const ZH: Record<string, string> = {
  // header, menu, footer
  'Skip to content': '跳到正文',
  'Start here': '从这里开始',
  'Step by step': '逐步指南',
  FAQ: '常见问题',
  'Rules and fees': '规则与费用',
  'Official links': '官方链接',
  'Our services': '我们的服务',
  Menu: '菜单',
  'Ask us on WhatsApp': 'WhatsApp 咨询',
  Learn: '了解',
  About: '关于',
  'How to hire, step by step': '如何聘请女佣：逐步指南',
  'FAQ: the hiring process': '常见问题：聘请流程',
  'FAQ: eligibility and rules': '常见问题：资格与规定',
  'FAQ: scams and pitfalls': '常见问题：骗局与陷阱',
  'Hire a maid from abroad': '从海外聘请女佣',
  'Transfer a maid': '转换雇主（转聘女佣）',
  'Elderly care': '长者看护',
  'Replacement guarantee': '更换保证',
  'Our licence': '我们的执照',
  Contact: '联系我们',
  'Privacy notice': '隐私声明',
  'All rights reserved.': '版权所有。',
  // home
  'Start the guide': '开始阅读指南',
  'Speak to a consultant': '联系顾问',
  'Licensed agency': '持牌机构',
  'PEA Licence B No. 1681': 'PEA 执照 B 号 1681',
  'Official sources': '官方来源',
  'Rules checked against the official pages, last checked 5 November 2026': '规则已对照官方页面核对，最近核对日期：2026年11月5日',
  'Your family is the employer': '您的家庭是雇主',
  'Never the agency or one of our group companies': '绝不是中介，也不是我们集团旗下的公司',
  'Quick replies': '快速回复',
  'A consultant replies within 1 working hour, 8am to 6pm Mon to Sat': '顾问在1个工作小时内回复，周一至周六上午8点至下午6点',
  // helper cards
  'Our service': '我们的服务',
  'Helpers available for hire': '可聘请的帮佣',
  'Caregivers available for hire': '可聘请的看护',
  'Profiles of helpers on our books. Ask a consultant on WhatsApp about any of them.': '以下是我们名册上的帮佣。欢迎通过 WhatsApp 向顾问咨询其中任何一位。',
  'Profiles of caregivers on our books. Ask a consultant on WhatsApp about any of them.': '以下是我们名册上的看护。欢迎通过 WhatsApp 向顾问咨询其中任何一位。',
  Available: '可聘请',
  'Ask about her': '咨询她的情况',
  'Ask about this caregiver': '咨询这位看护',
  // WhatsApp callout
  'Hello, a named Agensi consultant answers your questions here.': '您好，Agensi 的专属顾问会在这里解答您的问题。',
  'Not sure if your family qualifies? Ask us and a consultant will go through the rules with you.': '不确定您的家庭是否符合资格？问问我们，顾问会陪您逐条了解规则。',
  'Want a quote? A consultant can give you one.': '想要报价？顾问可以为您提供。',
  'We reply within 1 working hour, 8am to 6pm Mon to Sat.': '我们在1个工作小时内回复，周一至周六上午8点至下午6点。',
  'Agensi consultant': 'Agensi 顾问',
  'Type a message': '输入信息',
};

/** Shows the Chinese for a label when the visitor chose Chinese and the label has a translation. */
export function T({ children }: { children: string }) {
  const lang = useSiteLang();
  return <>{lang === 'zh' && ZH[children] ? ZH[children] : children}</>;
}

/** The Chinese text for use in attributes (placeholders): returns the English when there is none. */
export function useT() {
  const lang = useSiteLang();
  return (en: string) => (lang === 'zh' && ZH[en] ? ZH[en] : en);
}

export function LangToggle({ className = '' }: { className?: string }) {
  const [lang, setLang] = useLangToggle();
  return (
    <button
      type="button"
      className={`lang-toggle ${className}`.trim()}
      aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
      onClick={() => {
        const next = lang === 'zh' ? 'en' : 'zh';
        setLang(next);
        document.documentElement.lang = next === 'zh' ? 'zh-Hans' : 'en';
      }}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
      </svg>
      <span>{lang === 'zh' ? 'EN' : '中文'}</span>
    </button>
  );
}
