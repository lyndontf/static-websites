'use client';

import { useEffect, useRef, useState } from 'react';
import { useSiteLang } from '@/lib/useSiteLang';
import { withCampaignCode } from '@/lib/attribution';

const WA_MESSAGES = {
  en: [
    'Hello, this is Dr. Phang from Genesis. How can I help you?',
    'Would you like to schedule a no-obligations visit?',
    'Did you know we have full-time doctors overseeing each centre?',
    'Fees start from RM2,500/month — transparent pricing, no hidden fees.',
    "We're JKM registered and AgeCope certified. Want to know more?",
    'Urgent cases can often be admitted within 24–48 hours.',
  ],
  zh: [
    '您好，我是Genesis的庞医生，有什么可以帮您的吗？',
    '您想预约一次免费参观吗？',
    '您知道吗？我们每间中心都有全职医生驻守。',
    '收费每月低至RM2,500起 — 价格透明，无隐藏费用。',
    '我们已获得JKM注册及AgeCope认证。想了解更多吗？',
    '紧急情况通常可在24至48小时内安排入住。',
  ],
};
const WA_NAME = 'Dr. Phang GLC';
const WA_STATUS = 'online';

interface WhatsAppWidgetProps {
  phone: string;
}

export default function WhatsAppWidget({ phone }: WhatsAppWidgetProps) {
  const [dismissed, setDismissed] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const [input, setInput] = useState('');
  // Shared with Header/Bilingual/ContentRenderer — reads the forced locale on
  // /zh/* routes for correct first paint, then follows the site-wide toggle.
  // (This widget used to track localStorage itself, which always started at
  // 'en' and only caught up after mount — showing English on every /zh route
  // until the visitor manually toggled, which ad-campaign traffic never does.)
  const lang = useSiteLang();
  const scrollAccum = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;
    function onScroll() {
      const y = window.scrollY;
      scrollAccum.current += Math.abs(y - lastScrollY.current);
      lastScrollY.current = y;
      if (scrollAccum.current > 600) {
        scrollAccum.current = 0;
        setMsgIndex((i) => (i + 1) % WA_MESSAGES.en.length);
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function sendMessage() {
    // #172: a visitor who came from a tracked post carries its Campaign code into WhatsApp.
    const text = withCampaignCode(input.trim() || 'Hello, I have a question about Genesis Life Care.');
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  }

  return (
    <div className="glc-wa-fab-wrap fixed bottom-5 right-5 z-50">
      <div
        className={`block absolute bottom-[calc(100%+14px)] right-0 w-[250px] bg-white rounded-xl overflow-hidden shadow-[0_20px_44px_-16px_rgba(0,0,0,0.4)] transition-all duration-200 ${
          dismissed ? 'opacity-0 invisible translate-y-2 pointer-events-none' : 'opacity-100 visible translate-y-0'
        }`}
        onClick={(e) => {
          // On mobile, tapping anywhere on the card (outside the close button and the
          // message input/send controls) opens WhatsApp directly.
          if (!window.matchMedia('(max-width:640px)').matches) return;
          const target = e.target as HTMLElement;
          if (target.closest('button[aria-label="Close"], input, button[aria-label="Send message"]')) return;
          sendMessage();
        }}
      >
        <button
          onClick={() => setDismissed(true)}
          aria-label="Close"
          type="button"
          className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/35 hover:bg-black/55 text-white text-xs flex items-center justify-center z-10"
        >
          ✕
        </button>
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noopener noreferrer" className="block">
          <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2.5">
            <div className="relative flex-none">
              <img src="/images/team/wa-avatar-dr-phang.jpg" alt="Dr. Phang GLC" className="w-[30px] h-[30px] rounded-full object-cover" />
              <span className="absolute -bottom-px -right-px w-[9px] h-[9px] rounded-full bg-[#31d158] border-2 border-[#075E54]" />
            </div>
            <div>
              <div className="text-[13px] font-bold text-white">{WA_NAME}</div>
              <div className="text-[10px] text-[#d4ede9]">{WA_STATUS}</div>
            </div>
          </div>
          <div className="bg-[#E5DDD5] px-2.5 py-3.5">
            <div className="relative bg-white rounded-tr-lg rounded-bl-lg rounded-br-lg px-2.5 py-2 text-[12.5px] text-[#111b21] leading-snug shadow-[0_1px_1px_rgba(0,0,0,0.15)]">
              {WA_MESSAGES[lang][msgIndex]}
              <span className="block text-right text-[10px] text-[#8696a0] mt-1">10:24 AM</span>
            </div>
          </div>
        </a>
        <div className="flex items-center gap-2 bg-[#f0f0f0] px-2.5 py-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder="Type a message"
            className="flex-1 min-w-0 border-0 rounded-full px-3 py-2 text-[12.5px] bg-white text-[#111b21] outline-none placeholder:text-[#8696a0]"
          />
          <button
            onClick={sendMessage}
            aria-label="Send message"
            type="button"
            className="w-[30px] h-[30px] rounded-full bg-[#25D366] hover:bg-[#20bd5a] flex items-center justify-center flex-none"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>

      <button
        onClick={() => setDismissed(false)}
        aria-label="Open WhatsApp chat"
        type="button"
        className={`relative flex items-center justify-center [filter:drop-shadow(0_6px_14px_rgba(0,0,0,0.3))] transition-all duration-200 border-0 bg-transparent p-0 cursor-pointer overflow-hidden hover:scale-105 ${
          dismissed ? 'opacity-100 visible w-[52px] h-[59px]' : 'opacity-0 invisible pointer-events-none w-0 h-0'
        }`}
      >
        <svg viewBox="0 0 448 512" width="52" height="59" fill="#25D366" aria-hidden="true">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.4 0 222-99.6 222-222 0-59.3-23.1-115-65-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.6-27.5-16.5-14.7-27.6-32.9-30.8-38.5-3.2-5.6-.3-8.6 2.4-11.4 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.6 5.5-9.3 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 13.3 5.7 23.6 9.1 31.7 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.3-5-3.7-10.5-6.5z" />
        </svg>
      </button>
    </div>
  );
}
