'use client';

import Link from 'next/link';
import { useSiteLang } from '@/lib/useSiteLang';

type ContactInfo = {
  fullName: string;
  address: string;
  phone: string;
  mapEmbed: string;
};

const t = {
  en: {
    label: 'Find Us',
    heading: 'Location & Contact',
    address: 'Address',
    phone: 'Phone',
    hours: 'Operating Hours',
    hoursVisit: 'Visits: 9:00 AM – 6:00 PM daily',
    hoursNursing: 'Nursing care: 24/7',
    email: 'Email',
    bookTour: 'Book a Visit',
    whatsapp: 'WhatsApp Us',
    contactLink: '/contact',
  },
  zh: {
    label: '联系方式',
    heading: '位置与联系',
    address: '地址',
    phone: '电话',
    hours: '营业时间',
    hoursVisit: '探访时间：每日 9:00 AM – 6:00 PM',
    hoursNursing: '护理服务：全天候24/7',
    email: '电邮',
    bookTour: '预约参观',
    whatsapp: 'WhatsApp 联系我们',
    // Same page, no separate /zh route — the toggle swaps text in place.
    contactLink: '/contact',
  },
};

export default function LocationContact({ centre, lang }: { centre: ContactInfo; lang?: 'en' | 'zh' }) {
  const detected = useSiteLang();
  const l = t[lang ?? detected];
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-bold uppercase tracking-widest mb-2">{l.label}</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            {l.heading}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-200 h-[350px] bg-gray-200">
            <iframe
              src={centre.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${centre.fullName} map`}
            />
          </div>

          {/* Contact details */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">{centre.fullName}</h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{l.address}</p>
                  <p className="text-sm text-gray-500">{centre.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{l.phone}</p>
                  <a href={`tel:${centre.phone.replace(/\s/g, '')}`} className="text-sm text-primary hover:underline">
                    {centre.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{l.hours}</p>
                  <p className="text-sm text-gray-500">{l.hoursVisit}</p>
                  <p className="text-sm text-gray-500">{l.hoursNursing}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-2.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{l.email}</p>
                  <a href="mailto:enquiries@genesiscare.com.my" className="text-sm text-primary hover:underline">
                    enquiries@genesiscare.com.my
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                href={l.contactLink}
                className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                {l.bookTour}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://wa.me/60193250457"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white font-bold px-6 py-3 rounded-lg hover:bg-green-600 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {l.whatsapp}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
