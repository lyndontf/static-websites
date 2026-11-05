'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { submitContactForm } from '@/lib/supabase';
import { useSiteLang } from '@/lib/useSiteLang';
import {
  centreSlugFor, formatRM, getCostCentres, getCostOptions, getCostQuote, quoteSummary, shortCentreName,
  type CostCentre, type CostOption, type CostOptions, type CostPick, type CostQuote,
} from '@/lib/costCalculator';

const T = {
  en: {
    heroTag: 'Free tool', heroTitle: 'Nursing home cost calculator',
    heroText: 'Select a centre, room type, care level and add-on services to see the full monthly cost, with the SST shown separately. No sign-up needed.',
    centre: 'Centre', choose: 'Choose…', none: 'None', stay: 'Length of stay', long: 'Long stay', short: 'Short stay',
    room: 'Room type', bed: 'Bed type', ac: 'Air-conditioning', laundry: 'Laundry', meal: 'Meals',
    feeding: 'Feeding assistance', grooming: 'Grooming assistance', mobility: 'Mobility assistance', toileting: 'Toileting assistance', wound: 'Wound care',
    dementia: 'Dementia care programme', rehab: 'Intensive rehabilitation programme',
    sessions: 'Sessions each month', doctor: 'Doctor reviews', dietician: 'Dietician reviews', activity: 'Activity sessions', physio: 'Physiotherapy sessions',
    perDay: '/ day', yourEstimate: 'Your monthly estimate', item: 'Item', price: 'Price', sst: 'SST', total: 'Total', priceRow: 'Price', sstRow: 'SST', totalRow: 'Total per month',
    pickRoom: 'Choose a centre and a room type to see your estimate.', loading: 'Working out your estimate…', unavailable: 'The estimate is not available right now. Please call us and we will help.',
    note: 'Indicative estimate only, based on 30 days a month. Final pricing is confirmed after assessment.',
    callTitle: 'Want us to call you about this estimate?', name: 'Your name', phone: 'Mobile number', email: 'Email',
    send: 'Call me', sending: 'Sending…', sent: 'Thank you. Our team will call you soon about this estimate.', failed: 'We could not send that. Please try again or call us.',
    privacy: 'We use your details only to contact you about this enquiry.', need: 'Please fill in your name, mobile number and email.',
  },
  zh: {
    heroTag: '免费工具', heroTitle: '安老院费用计算器',
    heroText: '选择护理中心、房型、护理等级和附加服务，即可查看每月总费用，服务税 (SST) 另行列出。无需注册。',
    centre: '护理中心', choose: '请选择…', none: '不需要', stay: '入住时长', long: '长期入住', short: '短期入住',
    room: '房型', bed: '床型', ac: '冷气', laundry: '洗衣服务', meal: '膳食',
    feeding: '喂食协助', grooming: '梳洗协助', mobility: '行动协助', toileting: '如厕协助', wound: '伤口护理',
    dementia: '失智症护理计划', rehab: '强化复健计划',
    sessions: '每月次数', doctor: '医生诊视', dietician: '营养师诊视', activity: '活动课程', physio: '物理治疗',
    perDay: '/ 天', yourEstimate: '您的每月费用估算', item: '项目', price: '价格', sst: '服务税 (SST)', total: '合计', priceRow: '费用', sstRow: '服务税 (SST)', totalRow: '每月合计',
    pickRoom: '请选择护理中心和房型，即可查看估算。', loading: '正在计算…', unavailable: '暂时无法提供估算，请致电我们，我们乐意协助。',
    note: '此为参考估算，以每月 30 天计算，最终价格以评估后确认为准。',
    callTitle: '希望我们就此估算联系您？', name: '您的姓名', phone: '手机号码', email: '电邮',
    send: '请致电给我', sending: '提交中…', sent: '谢谢，我们的团队会尽快就此估算联系您。', failed: '提交失败，请重试或直接致电我们。',
    privacy: '我们只会使用您的资料来回复此查询。', need: '请填写姓名、手机号码和电邮。',
  },
} as const;

type Cat = 'room' | 'bed' | 'ac' | 'laundry' | 'meal' | 'feeding' | 'grooming' | 'mobility' | 'toileting' | 'wound' | 'dementia' | 'rehab';
const CATS: Cat[] = ['room', 'bed', 'ac', 'laundry', 'meal', 'feeding', 'grooming', 'mobility', 'toileting', 'wound', 'dementia', 'rehab'];
const SESSIONS = ['doctor', 'dietician', 'activity', 'physio'] as const;

const INPUT = 'w-full px-3.5 py-2.5 bg-[#f8fafc] border border-[#dbe3e6] rounded-lg text-sm text-[#173039] placeholder-[#9aa8ae] focus:ring-2 focus:ring-[#2c88a2]/30 focus:border-[#2c88a2] outline-none transition-colors';
const LABEL = 'block text-xs font-bold text-[#5b6b73] mb-1.5';
const CARD = 'bg-white rounded-2xl border border-[#e4eaed] shadow-sm p-5 sm:p-6';
const MUTED = 'text-[#7a8a92]';

// The language follows the site's own toggle (saved choice first, else the route's default), like every other page on the site.
export default function CostCalculatorClient() {
  const lang = useSiteLang();
  const t = T[lang];
  const [centres, setCentres] = useState<CostCentre[]>([]);
  const [centreId, setCentreId] = useState('');
  const [opts, setOpts] = useState<CostOptions | null>(null);
  const [pick, setPick] = useState<Partial<Record<Cat, string>>>({});
  const [sessions, setSessions] = useState<Record<(typeof SESSIONS)[number], string>>({ doctor: '', dietician: '', activity: '', physio: '' });
  const [short, setShort] = useState(false);
  const [quote, setQuote] = useState<CostQuote | null>(null);
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);
  const [lead, setLead] = useState({ name: '', phone: '', email: '' });
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'sent' | 'error' | 'missing'>('idle');
  const seq = useRef(0);

  useEffect(() => { getCostCentres().then(setCentres); }, []);

  useEffect(() => {
    setOpts(null); setPick({}); setQuote(null);
    if (!centreId) return;
    getCostOptions(centreId).then(setOpts);
  }, [centreId]);

  const request: CostPick = useMemo(() => {
    const p: CostPick = {};
    for (const c of CATS) if (pick[c]) p[c] = pick[c];
    for (const s of SESSIONS) { const n = Number(sessions[s]); if (n > 0) p[`${s}_n` as 'doctor_n'] = Math.min(60, n); }
    if (short) p.stay = 'short';
    return p;
  }, [pick, sessions, short]);

  useEffect(() => {
    if (!centreId || !request.room) { setQuote(null); setFailed(false); return; }
    const mine = ++seq.current;
    setBusy(true);
    const timer = setTimeout(async () => {
      const q = await getCostQuote(centreId, request);
      if (mine !== seq.current) return;
      setBusy(false);
      if (!q || q.error) { setQuote(null); setFailed(true); } else { setQuote(q); setFailed(false); }
    }, 250);
    return () => clearTimeout(timer);
  }, [centreId, request]);

  const centreName = centres.find((c) => c.id === centreId)?.name ?? '';

  async function sendLead(e: React.FormEvent) {
    e.preventDefault();
    if (!lead.name.trim() || !lead.phone.trim() || !lead.email.trim() || !quote) { setLeadState('missing'); return; }
    setLeadState('sending');
    const ok = await submitContactForm({
      name: lead.name.trim(), email: lead.email.trim(), phone: lead.phone.trim(),
      message: quoteSummary(centreName, quote, short),
      page_url: typeof window !== 'undefined' ? window.location.href : undefined,
      lang, centre: centreSlugFor(centreName),
    });
    setLeadState(ok ? 'sent' : 'error');
  }

  const optionLabel = (o: CostOption) => (o.daily != null ? `${o.label} (${formatRM(Number(o.daily))} ${t.perDay})` : o.label);
  const selectFor = (cat: Cat) => {
    const list = (opts?.[cat] ?? []) as CostOption[];
    if (!list.length) return null;
    return (
      <div key={cat}>
        <label className={LABEL}>{t[cat]}{cat === 'room' ? ' *' : ''}</label>
        <select className={INPUT} value={pick[cat] ?? ''} onChange={(e) => setPick((p) => ({ ...p, [cat]: e.target.value || undefined }))}>
          <option value="">{cat === 'room' ? t.choose : t.none}</option>
          {list.map((o) => <option key={o.id} value={o.id}>{optionLabel(o)}</option>)}
        </select>
      </div>
    );
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] py-14 sm:py-20">
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-white/90 mb-4">{t.heroTag}</span>
          <h1 className="text-3xl sm:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4 text-balance">{t.heroTitle}</h1>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">{t.heroText}</p>
        </div>
      </section>
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`${CARD} space-y-4`}>
          <div>
            <label className={LABEL}>{t.centre} *</label>
            <select className={INPUT} value={centreId} onChange={(e) => setCentreId(e.target.value)}>
              <option value="">{t.choose}</option>
              {centres.map((c) => <option key={c.id} value={c.id}>{shortCentreName(c.name)}</option>)}
            </select>
          </div>
          {opts && (
            <>
              <div>
                <label className={LABEL}>{t.stay}</label>
                <div className="flex gap-5 text-sm text-[#173039]">
                  <label><input type="radio" checked={!short} onChange={() => setShort(false)} /> {t.long}</label>
                  <label><input type="radio" checked={short} onChange={() => setShort(true)} /> {t.short}</label>
                </div>
              </div>
              {CATS.map(selectFor)}
              <div>
                <label className={LABEL}>{t.sessions}</label>
                <div className="grid grid-cols-2 gap-3">
                  {SESSIONS.map((s) => (
                    <div key={s}>
                      <span className={`text-xs ${MUTED}`}>{t[s]}</span>
                      <input className={INPUT} type="number" min={0} max={60} inputMode="numeric" value={sessions[s]}
                        onChange={(e) => setSessions((x) => ({ ...x, [s]: e.target.value }))} placeholder="0" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="space-y-4">
          <div className={CARD} aria-live="polite">
            <h2 className="text-lg font-extrabold text-[#173039] mb-3">{t.yourEstimate}</h2>
            {!quote && !busy && !failed && <p className="text-sm text-[#5b6b73]">{t.pickRoom}</p>}
            {busy && <p className="text-sm text-[#5b6b73]">{t.loading}</p>}
            {failed && !busy && <p className="text-sm text-[#c1493f]">{t.unavailable}</p>}
            {quote && !busy && (
              <>
                <table className="w-full text-sm text-[#173039]">
                  <thead>
                    <tr className={`text-left text-xs ${MUTED}`}>
                      <th className="py-1 font-semibold">{t.item}</th><th className="text-right font-semibold">{t.price}</th><th className="text-right font-semibold">{t.sst}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quote.lines.map((l, i) => (
                      <tr key={`${l.key}-${i}`} className="border-t border-[#e4eaed]">
                        <td className="py-1.5 pr-2">{l.label}</td>
                        <td className="text-right">{formatRM(l.monthly)}</td>
                        <td className={`text-right ${MUTED}`}>{l.sst ? formatRM(l.sst) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-sm text-[#173039] space-y-1">
                  <div className="flex justify-between"><span>{t.priceRow}</span><span>{formatRM(quote.price)}</span></div>
                  <div className="flex justify-between"><span>{t.sstRow}</span><span>{formatRM(quote.sst)}</span></div>
                  <div className="flex justify-between font-extrabold text-lg pt-2 border-t border-[#e4eaed]"><span>{t.totalRow}</span><span>{formatRM(quote.total)}</span></div>
                </div>
                <p className={`mt-3 text-xs ${MUTED}`}>{t.note}</p>
              </>
            )}
          </div>

          {quote && (
            <form onSubmit={sendLead} className={`${CARD} space-y-3`}>
              <h3 className="text-sm font-bold text-[#173039]">{t.callTitle}</h3>
              {leadState === 'sent' ? (
                <p className="text-sm text-[#1e9e6a] font-semibold">{t.sent}</p>
              ) : (
                <>
                  <input className={INPUT} placeholder={t.name} value={lead.name} onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))} autoComplete="name" />
                  <input className={INPUT} type="tel" placeholder={t.phone} value={lead.phone} onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))} autoComplete="tel" />
                  <input className={INPUT} type="email" placeholder={t.email} value={lead.email} onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))} autoComplete="email" />
                  {leadState === 'missing' && <p className="text-xs text-[#c1493f]">{t.need}</p>}
                  {leadState === 'error' && <p className="text-xs text-[#c1493f]">{t.failed}</p>}
                  <button type="submit" className="w-full bg-[#FAB515] text-[#173039] py-3 rounded-xl font-bold text-sm hover:bg-[#E5A20C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md" disabled={leadState === 'sending'}>{leadState === 'sending' ? t.sending : t.send}</button>
                  <p className={`text-xs ${MUTED}`}>{t.privacy}</p>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
