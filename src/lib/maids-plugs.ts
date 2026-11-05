// Signed plug blocks for maidsinmalaysia.com (marketing agency campaign 86b1b36e, signed off by Lyndon 5 Nov 2026).
// Text is copied from the signed Deliverable versions; do not edit by hand. Change it through a new signed version.
// {PAGE_CODE} in a link is replaced by the host page's campaign code, so attribution follows the page.

export type MaidsPlug = {
  key: string;
  label: 'Our service' | 'From our group' | null;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  moreLink?: { label: string; href: string };
  centres?: { name: string; town: string; whatsapp: string }[];
};

export const MAIDS_PLUGS: Record<string, MaidsPlug> = {
  "transfer": {
    "key": "transfer",
    "label": "Our service",
    "heading": "Transfer a helper already in Malaysia",
    "body": "We handle transfers of a domestic helper already working in Malaysia to your family as employer. The Immigration Department allows a change of employer only in the first year of her work pass (PLKS), with the old employer's written consent. Ask us for a quote.",
    "ctaLabel": "Ask us on WhatsApp",
    "ctaHref": "https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20transferring%20a%20maid.%20Ref%3A%20{PAGE_CODE}",
    "moreLink": {
      "label": "About transfers",
      "href": "/transfer-a-maid"
    }
  },
  "placement-abroad": {
    "key": "placement-abroad",
    "label": "Our service",
    "heading": "Hire a helper from abroad with us",
    "body": "We place a domestic helper from abroad with your family and help with each step of the official process. Your family is the helper's legal employer. A consultant can explain the rules and give you a quote.",
    "ctaLabel": "Ask us on WhatsApp",
    "ctaHref": "https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20hire%20a%20maid.%20Ref%3A%20{PAGE_CODE}",
    "moreLink": {
      "label": "How hiring with us works",
      "href": "/hire-a-maid"
    }
  },
  "guarantee": {
    "key": "guarantee",
    "label": "Our service",
    "heading": "Our replacement guarantee",
    "body": "Our guarantee is 6 months from handover, with one free replacement and no refund. Our replacement and guarantee page sets out the policy. A consultant can go through it with you before you decide.",
    "ctaLabel": "Ask us on WhatsApp",
    "ctaHref": "https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20your%20replacement%20guarantee.%20Ref%3A%20{PAGE_CODE}",
    "moreLink": {
      "label": "Read the guarantee",
      "href": "/replacement-guarantee"
    }
  },
  "disclosure": {
    "key": "disclosure",
    "label": null,
    "heading": "Who publishes this guide",
    "body": "This guide is published by Agensi Pekerjaan Genesis Life Care Sdn Bhd (PEA Licence B No. 1681, valid 15 Sep 2025 to 14 Sep 2027), a maid agency in the Genesis Life Care group. Labelled boxes promote our services.",
    "ctaLabel": "See our licence",
    "ctaHref": "/licence"
  },
  "centres": {
    "key": "centres",
    "label": "From our group",
    "heading": "When your parent needs more care",
    "body": "Our group, Genesis Life Care, runs five care centres offering residential nursing home care, short respite stays and senior day care. They are care centres, not branches of our agency. Message the nearest one on WhatsApp.",
    "ctaLabel": "Visit genesiscare.com.my",
    "ctaHref": "https://genesiscare.com.my",
    "centres": [
      {
        "name": "Genesis Life Care — Kajang",
        "town": "Kajang, Selangor",
        "whatsapp": "https://api.whatsapp.com/send?phone=60193340457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20care%20for%20my%20parent.%20Ref%3A%20{PAGE_CODE}"
      },
      {
        "name": "Genesis Life Care — Klang",
        "town": "Klang, Selangor",
        "whatsapp": "https://api.whatsapp.com/send?phone=60123210457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20care%20for%20my%20parent.%20Ref%3A%20{PAGE_CODE}"
      },
      {
        "name": "Genesis Life Care — Petaling Jaya",
        "town": "Petaling Jaya, Selangor",
        "whatsapp": "https://api.whatsapp.com/send?phone=60192950457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20care%20for%20my%20parent.%20Ref%3A%20{PAGE_CODE}"
      },
      {
        "name": "Genesis Life Care — Puchong",
        "town": "Puchong, Selangor",
        "whatsapp": "https://api.whatsapp.com/send?phone=60197590457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20care%20for%20my%20parent.%20Ref%3A%20{PAGE_CODE}"
      },
      {
        "name": "Genesis Life Care — Johor Bahru",
        "town": "Johor Bahru, Johor",
        "whatsapp": "https://api.whatsapp.com/send?phone=60192820457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20care%20for%20my%20parent.%20Ref%3A%20{PAGE_CODE}"
      }
    ]
  },
  "academy": {
    "key": "academy",
    "label": "From our group",
    "heading": "Short care courses for your helper",
    "body": "If you want your helper to learn basic caregiving or CPR, Genesis Training Academy, part of our group, runs short courses:\n- Basic Life Support (BLS): 1 day, RM 350\n- Caregiving Essentials: 2 days, RM 900\n- Caregiver Foundation: 2 weeks, RM 1,500\nCheck the academy for current dates and fees.",
    "ctaLabel": "Visit the academy",
    "ctaHref": "https://gtacademy.com.my"
  },
  "consultant-whatsapp": {
    "key": "consultant-whatsapp",
    "label": "Our service",
    "heading": "Ask a consultant on WhatsApp",
    "body": "A named Agensi consultant can explain these rules and give you a quote. We reply within 1 working hour, 8am to 6pm Mon to Sat, on +60 19-224 0457. The message carries a short reference code for this page.",
    "ctaLabel": "Ask us on WhatsApp",
    "ctaHref": "https://api.whatsapp.com/send?phone=60192240457&text=Hi%2C%20I%27d%20like%20to%20ask%20about%20hiring%20a%20maid.%20Ref%3A%20{PAGE_CODE}"
  },
};

export const MAIDS_DISCLOSURE_SHORT = { text: 'This box promotes our services. We are a maid agency,', link: { label: 'PEA Licence B No. 1681', href: '/licence' } };

// Campaign code of each guide page (from deliverable-links when the Deliverable was signed). Pages not listed use the site's standing code.
export const MAIDS_PAGE_CODES: Record<string, string> = {
  'rules-and-fees': 'IK2611-WB20',
  'official-links': 'IK2611-WB21',
  'faq/process': 'IK2611-WB22',
  'faq/eligibility-and-rules': 'IK2611-WB23',
  'faq/scams-and-pitfalls': 'IK2611-WB24',
};
export const MAIDS_DEFAULT_PAGE_CODE = 'IAPG2611-WB';
