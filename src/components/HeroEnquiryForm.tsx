'use client';

import { useState } from 'react';
import { submitContactForm } from '@/lib/supabase';

interface Props {
  centreName: string;
  pageUrl: string;
  /** Optional: override the heading text */
  heading?: string;
  /** Optional: override the sub-heading text */
  subheading?: string;
  /** Language – 'en' or 'zh' */
  lang?: 'en' | 'zh';
}

const t = {
  en: {
    heading: 'Book a Free Tour',
    subheading: 'Our care advisors will get back to you within 24 hours.',
    name: 'Full Name',
    namePh: 'Your name',
    phone: 'Phone Number',
    phonePh: '+60 12-345 6789',
    message: 'How Can We Help?',
    messagePh: "Tell us about your loved one\u2019s care needs\u2026",
    submit: 'Send Enquiry',
    submitting: 'Sending…',
    successTitle: 'Thank You!',
    successMsg: "We\u2019ve received your enquiry and will contact you within 24 hours.",
    sendAnother: 'Send Another Enquiry',
    required: '*',
    error: 'Something went wrong. Please try again or call us directly.',
    validation: 'Please fill in your name and phone number.',
    trust1: 'No obligations',
    trust2: '100% confidential',
  },
  zh: {
    heading: '预约免费参观',
    subheading: '我们的护理顾问将在24小时内回复您。',
    name: '姓名',
    namePh: '您的姓名',
    phone: '电话号码',
    phonePh: '+60 12-345 6789',
    message: '我们如何帮助您？',
    messagePh: '请告诉我们您亲人的护理需求…',
    submit: '发送询问',
    submitting: '发送中…',
    successTitle: '谢谢您！',
    successMsg: '我们已收到您的询问，将在24小时内与您联系。',
    sendAnother: '再次发送询问',
    required: '*',
    error: '出了点问题。请重试或直接致电我们。',
    validation: '请填写您的姓名和电话号码。',
    trust1: '无任何义务',
    trust2: '100%保密',
  },
};

export default function HeroEnquiryForm({
  centreName,
  pageUrl,
  heading,
  subheading,
  lang = 'en',
}: Props) {
  const l = t[lang];
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError(l.validation);
      return;
    }

    setSubmitting(true);
    setError('');

    const success = await submitContactForm({
      name: form.name.trim(),
      email: '', // phone-first form, email optional
      phone: form.phone.trim(),
      message: form.message.trim() || `Enquiry from ${centreName} old folks home page`,
      page_url: pageUrl,
      lang,
    });

    setSubmitting(false);

    if (success) {
      setSubmitted(true);
      setForm({ name: '', phone: '', message: '' });
    } else {
      setError(l.error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-7">
      {submitted ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">{l.successTitle}</h3>
          <p className="text-sm text-gray-600 mb-5">{l.successMsg}</p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary text-sm font-semibold hover:underline"
          >
            {l.sendAnother}
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
              {heading || l.heading}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {subheading || l.subheading}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {l.name} <span className="text-red-400">{l.required}</span>
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                placeholder={l.namePh}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {l.phone} <span className="text-red-400">{l.required}</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors"
                placeholder={l.phonePh}
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">
                {l.message}
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-colors resize-none"
                placeholder={l.messagePh}
              />
            </div>

            {error && (
              <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-white py-3 rounded-xl font-bold text-sm hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {submitting ? l.submitting : l.submit}
            </button>
          </form>

          <p className="text-center text-[11px] text-gray-400 mt-3">
            {l.trust1} · {l.trust2}
          </p>
        </>
      )}
    </div>
  );
}
