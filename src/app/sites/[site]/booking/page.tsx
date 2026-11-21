import { Metadata } from 'next';
import BookingFormClient from '@/components/BookingFormClient';

export const metadata: Metadata = {
  title: "Book a Visit",
  description:
    'Schedule a free tour of our nursing home and elderly care centres in Klang, PJ, Kajang, Puchong, and Johor Bahru. Choose your preferred date and time.',
  openGraph: {
    title: 'Book a Visit | Genesis Life Care',
    description:
      'Schedule a free tour of our nursing home and elderly care centres. Choose your preferred location, date and time.',
    type: 'website',
  },
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-[#edf1f3]">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] py-14 sm:py-20">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '26px 26px',
          }}
        />
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-white/90 mb-4">
            <span className="w-5 h-0.5 bg-white/50 rounded" />
            Free Tour
            <span className="w-5 h-0.5 bg-white/50 rounded" />
          </span>
          <h1 className="text-3xl sm:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4 text-balance">
            Book a Free Visit
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Experience our world-class elderly care first-hand. Tour our facilities, meet our care team, and see why families trust Genesis Life Care.
          </p>
        </div>
      </section>

      {/* Booking form */}
      <section className="max-w-3xl mx-auto px-4 -mt-10 sm:-mt-12 pb-16 relative z-10">
        <BookingFormClient />
      </section>

      {/* Trust bar */}
      <section className="bg-white border-t border-[#e4eaed] py-12">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-[#eaf3f6] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#173039] mb-1">No Obligations</h3>
            <p className="text-xs text-[#7a8a92] leading-relaxed">Tour our facilities with zero commitment. We want you to feel confident in your choice.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#eaf3f6] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#173039] mb-1">Flexible Scheduling</h3>
            <p className="text-xs text-[#7a8a92] leading-relaxed">Pick a date and time that works for you. Our care advisors are available 7 days a week.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-[#eaf3f6] rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#2c88a2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-[#173039] mb-1">Personal Guided Tour</h3>
            <p className="text-xs text-[#7a8a92] leading-relaxed">Meet our care team, see the rooms, and ask all the questions you need.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
