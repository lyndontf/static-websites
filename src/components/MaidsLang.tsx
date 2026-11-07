'use client';

import { useEffect } from 'react';
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
  // page chrome
  Home: '首页',
  'On this page': '本页内容',
  'Questions answered': '常见问题解答',
  'WhatsApp this centre': 'WhatsApp 联系此中心',
  'Our service ': '我们的服务',
  'From our group': '来自我们集团',
  'Need short term care for your parents?': '需要为父母安排短期照护吗？',
  'Visit genesiscare.com.my': '访问 genesiscare.com.my',
  'Ask us on WhatsApp ': 'WhatsApp 咨询',
  'About transfers': '了解转换雇主',
  'How hiring with us works': '通过我们聘请的流程',
  'Read the guarantee': '阅读保证条款',
  'See our licence': '查看我们的执照',
  'Who publishes this guide': '本指南的发布者',
  years: '岁',
  'years old': '岁',
  Single: '未婚',
  Married: '已婚',
  Divorced: '离异',
  Widowed: '丧偶',
  Indonesian: '印尼籍',
  Filipino: '菲律宾籍',
  Malaysian: '马来西亚籍',
  Indonesia: '印度尼西亚',
  Philippines: '菲律宾',
  English: '英语',
  Tagalog: '他加禄语',
  'Bahasa Indonesia': '印尼语',
  'Bahasa Melayu': '马来语',
  Maid: '女佣',
  Caregiver: '看护',
  // eligibility form
  'Answer these questions to see whether your family meets JIM’s basic rules. Your answers stay on this page: we do not send or store them.': '回答以下问题，了解您的家庭是否符合移民局（JIM）的基本规定。您的答案只保留在本页，我们不会发送或保存。',
  '1. Does your household have a child under 15, or a parent who is sick or ill?': '1. 您的家中有15岁以下的孩子，或患病的父母吗？',
  '2. Which country is the helper from?': '2. 帮佣来自哪个国家？',
  'Choose a country': '请选择国家',
  '3. What is your net monthly income (RM)?': '3. 您的每月净收入是多少（令吉）？',
  'For example 6000': '例如 6000',
  '4. How many foreign domestic helpers does your family employ now?': '4. 您的家庭目前雇用了几位外籍帮佣？',
  None: '没有',
  One: '一位',
  Two: '两位',
  'Three or more': '三位或以上',
  '5. Are you a Muslim employer?': '5. 您是穆斯林雇主吗？',
  '6. Is the helper a Muslim?': '6. 帮佣是穆斯林吗？',
  '7. Have you been declared bankrupt, or are you on JIM’s suspect list or blacklist?': '7. 您是否被宣告破产，或在移民局的嫌疑名单或黑名单上？',
  Yes: '是',
  No: '否',
  'Check my family': '检查我的家庭是否符合',
  'Not eligible under JIM’s rules': '不符合移民局规定',
  'Eligible under JIM’s basic rules': '符合移民局基本规定',
  'Keep in mind': '请注意',
  'JIM counts an employer and spouse with a child under 15, or with sick or ill parents. Your household has neither.': '移民局认可的是：雇主与配偶育有15岁以下孩子，或父母患病。您的家庭两者都没有。',
  'A person who has been declared bankrupt, or who is on JIM’s suspect list or blacklist, cannot apply.': '被宣告破产，或在移民局嫌疑名单或黑名单上的人不能申请。',
  'A Muslim employer may employ only a Muslim domestic helper.': '穆斯林雇主只能雇用穆斯林帮佣。',
  'A second helper needs an employer net monthly income of over RM10,000.': '聘请第二位帮佣，雇主的每月净收入须超过 RM10,000。',
  'A second helper also needs a valid reason backed by documents.': '聘请第二位帮佣还须有文件证明的合理理由。',
  'A third helper needs an employer net monthly income of over RM15,000.': '聘请第三位帮佣，雇主的每月净收入须超过 RM15,000。',
  'A third helper also needs a valid reason backed by documents.': '聘请第三位帮佣还须有文件证明的合理理由。',
  'A fourth or more helper needs the Director General’s approval.': '聘请第四位或以上帮佣须获总监批准。',
  'If your helper is Muslim, you must let her pray and let her fast in Ramadan.': '若帮佣是穆斯林，您必须让她礼拜，并让她在斋戒月守斋。',
  'You will need proof of income: three months of payslips and EPF statements, or tax records.': '您需要提供收入证明：三个月的薪资单和 EPF 月结单，或税务记录。',
  'This is a guide, not JIM’s decision, and it does not cover every condition. The approval decision is made by the authorities. Source: Immigration Department (JIM), last checked 5 November 2026.': '这只是参考指南，并非移民局的决定，也未涵盖所有条件。批准与否由有关当局决定。资料来源：移民局（JIM），最近核对日期：2026年11月5日。',
  // centres, disclosure, helper details
  'Kajang, Selangor': '雪兰莪 加影',
  'Klang, Selangor': '雪兰莪 巴生',
  'Petaling Jaya, Selangor': '雪兰莪 八打灵再也',
  'Puchong, Selangor': '雪兰莪 蒲种',
  'Johor Bahru, Johor': '柔佛 新山',
  'Genesis Life Care — Kajang': 'Genesis Life Care — 加影',
  'Genesis Life Care — Klang': 'Genesis Life Care — 巴生',
  'Genesis Life Care — Petaling Jaya': 'Genesis Life Care — 八打灵再也',
  'Genesis Life Care — Puchong': 'Genesis Life Care — 蒲种',
  'Genesis Life Care — Johor Bahru': 'Genesis Life Care — 新山',
  'This box promotes our services. We are a maid agency,': '本框内容为我们的服务推广。我们是一家女佣中介，',
  'Home Elder Care': '居家长者看护',
  'Bahasa Malaysia': '马来语',
  Mandarin: '华语',
  Cantonese: '广东话',
  Hokkien: '福建话',
  Tamil: '泰米尔语',
  'A hiring guide for families in Malaysia': '为马来西亚家庭准备的聘请指南',
  Guides: '指南',
  'Domestic Maid': '家庭女佣',
  Pakistani: '巴基斯坦籍',
  Nepalese: '尼泊尔籍',
  Cambodian: '柬埔寨籍',
  Indian: '印度籍',
  Vietnamese: '越南籍',
  Myanmar: '缅甸籍',
  // costs
  'What it costs to hire a maid': '聘请女佣的费用',
  'Check if your family can apply': '检查您的家庭是否可以申请',
  'The charges involved, in one place. Where an official amount is not shown yet, we say so.': '所有相关费用集中在这里。若官方金额尚未列出，我们会明确说明。',
  'Paid to the authorities after approval': '获批后向有关当局缴付',
  Levy: '征费',
  PLKS: 'PLKS（工作准证）',
  Visa: '签证',
  Processing: '处理费',
  'FOMEMA medical': 'FOMEMA 体检',
  'Not shown yet': '暂未列出',
  "RM410 a year": "每年 RM410",
  "RM60": "RM60",
  "RM125": "RM125",
  "About RM220 to RM235": "约 RM220 至 RM235",
  "Indicative": "参考金额",
  "Indicative. Within 30 days of arrival": "参考金额。抵达后30天内办理",
  "Levy, PLKS and processing match the Immigration Department’s MAID Online user guide (sample payment screen, 2018) and a pass issued in 2016. The FOMEMA amount comes from published guides. All four are indicative and subject to change. Please check the Immigration Department (imi.gov.my) and FOMEMA (fomema2u.com.my) portals for the latest figures.": "人头税、PLKS 和手续费与移民局 MAID Online 使用指南（2018年样本付款画面）及一张2016年签发的准证相符。FOMEMA 体检费来自已公布的指南。四项均为参考金额，可能变动。请到移民局 (imi.gov.my) 和 FOMEMA (fomema2u.com.my) 网站查看最新金额。",
  "FOMEMA medical examination form (specimen)": "FOMEMA 体检表（样本）",
  "The form printed from the FOMEMA portal after registration and payment: copies for the employer, the doctor, the laboratory and the X-ray facility. Sample details, from FOMEMA’s own user guide (2017 sample).": "在 FOMEMA 网站完成登记和付款后打印的表格，分别供雇主、医生、化验室和 X 光中心使用。数据为样本，取自 FOMEMA 官方使用指南（2017 年样本）。",
  "FOMEMA user guide, Immigration Department": "FOMEMA 使用指南，移民局",
  "Blank forms are published by the authorities. The specimen shows what an approval letter looks like, with personal details and the agency blacked out. None is anyone’s completed document.": "空白表格由官方机构公布。样本展示批准信的样子，个人资料和代理机构名称已涂黑。以上均不是任何人已填写的文件。",
  "Specimen": "样本",
  "Approval letter for the helper’s pass (specimen)": "帮佣准证批准信（样本）",
  "What the immigration approval letter looks like after the VDR application: it lists the payments, the visa step and the entry rules. Names, reference number and the agency are blacked out.": "VDR 申请后移民局批准信的样子：列出须缴付的款项、签证步骤和入境规定。姓名、参考编号和代理机构名称已涂黑。",
  "Immigration Department (JIM), Perak, example for a Filipino helper": "移民局 (JIM) 霹雳州，菲律宾帮佣的示例",
  'Blank form': '空白表格',
  'View': '查看',
  'Download': '下载',
  'page': '页',
  'pages': '页',
  'Immigration Department (JIM)': '移民局 (JIM)',
  'Indonesian consulate, Penang (KJRI)': '印尼驻槟城领事馆 (KJRI)',
  'These are the blank forms published by the authorities. They are examples of what you will be asked to fill in, not anyone’s completed document.': '以下是官方机构公布的空白表格，仅供参考您将需要填写的内容，并非任何人的已填写文件。',
  'New application form for a foreign domestic helper (PRA1)': '外籍女佣新申请表 (PRA1)',
  'The employer’s application at the immigration office, step 3.': '雇主在移民局提交的申请，第3步。',
  'Visa application form (IM.38)': '签证申请表 (IM.38)',
  'Used for the helper’s visa, step 4.': '用于帮佣的签证，第4步。',
  'Visit Pass application form (IM.12)': '访问准证申请表 (IM.12)',
  'Used for the PL(KS) pass, step 7.': '用于 PL(KS) 准证，第7步。',
  'Employment agreement for a foreign domestic helper': '外籍女佣雇佣协议',
  'Stamped with an RM10 revenue stamp and signed by the employer and the helper.': '贴上 RM10 印花税票，并由雇主和帮佣签署。',
  'Employment contract for an Indonesian helper (Perjanjian Kerja)': '印尼帮佣雇佣合同 (Perjanjian Kerja)',
  'The Indonesian helper’s contract, which the Indonesian mission must endorse.': '印尼帮佣的合同，须经印尼使领馆签证确认。',
  'RM13 to RM50': 'RM13 至 RM50',
  'By nationality; confirm for your helper. Vietnam RM13, Indonesia and Sri Lanka RM15, Nepal RM20, India RM50, countries not listed RM20. Applied for before she enters Malaysia.':
    '按国籍而定，请向我们确认您的帮佣适用的金额。越南 RM13，印尼和斯里兰卡 RM15，尼泊尔 RM20，印度 RM50，未列出的国家 RM20。在她入境马来西亚前申请。',
  'Applied for through MyVISA before she enters Malaysia': '在她入境马来西亚前通过 MyVISA 申请',
  'Within 30 days of arrival': '抵达后30天内',
  'We are checking the current official amounts and will add each one with its source when it is confirmed.': '我们正在核对最新的官方金额，确认后会连同来源逐项列出。',
  'Personal bond, by the helper’s home country': '个人保证金（按帮佣的祖国）',
  'Indonesia, Thailand, Cambodia': '印度尼西亚、泰国、柬埔寨',
  'Philippines, Sri Lanka, India': '菲律宾、斯里兰卡、印度',
  Nepal: '尼泊尔',
  'Laos, Vietnam': '老挝、越南',
  'If a helper absconds, the employer pays bail on the personal bond.': '若帮佣逃跑，雇主须就个人保证金缴付保释金。',
  'For an Indonesian helper': '聘请印尼籍帮佣',
  'Maximum entry cost': '最高入境费用',
  'For a helper hired through a Malaysia Recruitment Agency': '通过马来西亚招聘机构聘请的帮佣',
  'Minimum wage': '最低工资',
  'RM1,500 a month': '每月 RM1,500',
  'Insurance, paid by the employer (PERKESO)': '保险，由雇主缴付（PERKESO）',
  'Employment Injury': '工伤保险',
  Invalidity: '残障保险',
  'From 1 July 2024': '自2024年7月1日起',
  'Our fee': '我们的费用',
  'Placement with us': '通过我们安排聘用',
  'By quote': '按报价',
  'A consultant will explain the steps and give you a quote': '顾问会讲解步骤并为您报价',
  'Official figures: Immigration Department (JIM) and PERKESO, last checked 5 November 2026.': '官方数据：移民局（JIM）和 PERKESO，最近核对日期：2026年11月5日。',
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

export function useIsZh() {
  return useSiteLang() === 'zh';
}

export function LangToggle({ className = '' }: { className?: string }) {
  const [lang, setLang] = useLangToggle();
  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';
  }, [lang]);
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
