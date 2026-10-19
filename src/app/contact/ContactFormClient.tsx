'use client';

import { useEffect, useState } from 'react';
import { submitContactForm } from '@/lib/supabase';
import { useSiteLang } from '@/lib/useSiteLang';

const t = {
  en: {
    eyebrow: 'Get In Touch',
    h1: 'Contact Us',
    subtitle: 'Have questions about our care services? We would love to hear from you.',
    thankYouTitle: 'Thank You!',
    thankYouBody: 'Your message has been sent successfully. We will get back to you shortly.',
    sendAnother: 'Send Another Message',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    centre: 'Which centre?',
    centreNotSure: 'Not sure yet',
    message: 'Message',
    namePlaceholder: 'Your name',
    messagePlaceholder: 'How can we help you?',
    requiredError: 'Please fill in all required fields.',
    genericError: 'Something went wrong. Please try again or contact us directly.',
    sending: 'Sending...',
    send: 'Send Message',
    getInTouch: 'Get in Touch',
    phoneLabel: 'Phone',
    phoneDesc: 'Call us for immediate assistance',
    emailLabel: 'Email',
    emailDesc: 'Send us a detailed enquiry',
    locationsLabel: 'Locations',
    locationsList: 'Klang, Kajang, Petaling Jaya, Puchong, Johor Bahru',
    needHelp: 'Need Immediate Help?',
    needHelpDesc: 'Our care team is available to answer your questions and help you find the right care solution.',
    callToday: 'Call us today',
  },
  zh: {
    eyebrow: '联系方式',
    h1: '联系我们',
    subtitle: '对我们的护理服务有任何疑问？欢迎与我们联系。',
    thankYouTitle: '谢谢您！',
    thankYouBody: '您的讯息已成功发送。我们会尽快回复您。',
    sendAnother: '发送另一则讯息',
    fullName: '全名',
    email: '电邮',
    phoneNumber: '电话号码',
    centre: '哪一间中心？',
    centreNotSure: '还不确定',
    message: '讯息',
    namePlaceholder: '您的姓名',
    messagePlaceholder: '我们可以如何协助您？',
    requiredError: '请填写所有必填栏位。',
    genericError: '发生错误，请重试或直接联系我们。',
    sending: '发送中…',
    send: '发送讯息',
    getInTouch: '联系方式',
    phoneLabel: '电话',
    phoneDesc: '致电获得即时协助',
    emailLabel: '电邮',
    emailDesc: '发送详细询问给我们',
    locationsLabel: '分院',
    locationsList: '巴生、加影、八打灵再也、蒲种、新山',
    needHelp: '需要即时协助？',
    needHelpDesc: '我们的护理团队随时为您解答疑问，协助您找到合适的护理方案。',
    callToday: '立即致电我们',
  },
};

// "Which centre?" (Genesis website only, lcs#974): routes the enquiry to that centre in LCS; "Not sure" -> Unassigned.
const CENTRES = [
  { slug: 'kajang', en: 'Kajang', zh: '加影' },
  { slug: 'klang', en: 'Klang', zh: '巴生' },
  { slug: 'petaling-jaya', en: 'Petaling Jaya', zh: '八打灵再也' },
  { slug: 'puchong', en: 'Puchong', zh: '蒲种' },
  { slug: 'johor-bahru', en: 'Johor Bahru', zh: '新山' },
];

export default function ContactFormClient() {
  const lang = useSiteLang();
  const l = t[lang];
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', centre: '' });
  const [isGenesis, setIsGenesis] = useState(false);
  useEffect(() => {
    setIsGenesis(/(^|\.)genesiscare\.com\.my$/i.test(window.location.hostname));
  }, []);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(l.requiredError);
      return;
    }

    setSubmitting(true);
    setError('');

    const success = await submitContactForm({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      message: form.message.trim(),
      page_url: '/contact',
      lang,
      centre: isGenesis ? form.centre : undefined,
    });

    setSubmitting(false);

    if (success) {
      setSubmitted(true);
      setForm({ name: '', email: '', phone: '', message: '', centre: '' });
    } else {
      setError(l.genericError);
    }
  };

  return (
    <div className="py-10 sm:py-16 bg-[#edf1f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-[#2c88a2] mb-3">
            <span className="w-5 h-0.5 bg-[#2c88a2] rounded" />
            {l.eyebrow}
            <span className="w-5 h-0.5 bg-[#2c88a2] rounded" />
          </span>
          <h1 className="text-4xl font-extrabold text-[#173039] mb-4 tracking-tight">{l.h1}</h1>
          <p className="text-lg text-[#5b6b73]">
            {l.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-[20px] shadow-[0_30px_70px_-30px_rgba(8,30,38,0.4)] p-6 sm:p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#e6f6ec] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[#1a7f4b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-[#173039] mb-2">{l.thankYouTitle}</h3>
                <p className="text-[#5b6b73] mb-6">
                  {l.thankYouBody}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#2c88a2] font-semibold hover:text-[#0b4a5e]"
                >
                  {l.sendAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#33424a] mb-1">
                    {l.fullName} <span className="text-[#c1493f]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#dbe3e6] rounded-lg text-sm text-[#173039] focus:ring-2 focus:ring-[#2c88a2]/30 focus:border-[#2c88a2] outline-none transition-colors"
                    placeholder={l.namePlaceholder}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#33424a] mb-1">
                    {l.email} <span className="text-[#c1493f]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#dbe3e6] rounded-lg text-sm text-[#173039] focus:ring-2 focus:ring-[#2c88a2]/30 focus:border-[#2c88a2] outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#33424a] mb-1">
                    {l.phoneNumber}
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#dbe3e6] rounded-lg text-sm text-[#173039] focus:ring-2 focus:ring-[#2c88a2]/30 focus:border-[#2c88a2] outline-none transition-colors"
                    placeholder="+60 12-345 6789"
                  />
                </div>
                {isGenesis && (
                  <div>
                    <label htmlFor="centre" className="block text-sm font-medium text-[#33424a] mb-1">
                      {l.centre}
                    </label>
                    <select
                      id="centre"
                      value={form.centre}
                      onChange={(e) => setForm({ ...form, centre: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#dbe3e6] rounded-lg text-sm text-[#173039] focus:ring-2 focus:ring-[#2c88a2]/30 focus:border-[#2c88a2] outline-none transition-colors"
                    >
                      <option value="">{l.centreNotSure}</option>
                      {CENTRES.map((c) => (
                        <option key={c.slug} value={c.slug}>{lang === 'zh' ? c.zh : c.en}</option>
                      ))}
                    </select>
                  </div>
                )}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#33424a] mb-1">
                    {l.message} <span className="text-[#c1493f]">*</span>
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#dbe3e6] rounded-lg text-sm text-[#173039] focus:ring-2 focus:ring-[#2c88a2]/30 focus:border-[#2c88a2] outline-none transition-colors resize-none"
                    placeholder={l.messagePlaceholder}
                  />
                </div>
                {error && (
                  <p className="text-sm text-[#c1493f] bg-[#fbe9e9] px-3 py-2 rounded-lg">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#2c88a2] text-white py-3 rounded-xl font-bold hover:bg-[#0b4a5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {submitting ? l.sending : l.send}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-[20px] shadow-[0_30px_70px_-30px_rgba(8,30,38,0.4)] p-6">
              <h3 className="text-lg font-bold text-[#173039] mb-4">{l.getInTouch}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#eaf3f6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#173039]">{l.phoneLabel}</p>
                    <p className="text-sm text-[#7a8a92]">{l.phoneDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#eaf3f6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#173039]">{l.emailLabel}</p>
                    <p className="text-sm text-[#7a8a92]">{l.emailDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#eaf3f6] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#173039]">{l.locationsLabel}</p>
                    <p className="text-sm text-[#7a8a92]">{l.locationsList}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] rounded-[20px] p-6 text-white">
              <h3 className="text-lg font-bold mb-2">{l.needHelp}</h3>
              <p className="text-sm text-white/85 mb-4">
                {l.needHelpDesc}
              </p>
              <p className="text-2xl font-bold">{l.callToday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
