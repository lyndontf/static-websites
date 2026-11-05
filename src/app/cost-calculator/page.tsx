import { Metadata } from 'next';
import CostCalculatorClient from '@/components/CostCalculatorClient';

export const metadata: Metadata = {
  title: 'Nursing Home Cost Calculator',
  description:
    'Get an instant estimate of the monthly cost of nursing home care at Genesis Life Care. Choose your centre, room, care level and services and see the price, SST and total.',
  alternates: { languages: { 'zh-MY': '/zh/cost-calculator' } },
  openGraph: {
    title: 'Nursing Home Cost Calculator | Genesis Life Care',
    description: 'Choose your centre, room, care level and services and see the monthly price, SST and total.',
    type: 'website',
  },
};

export default function CostCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#edf1f3]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] py-14 sm:py-20">
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-white/90 mb-4">Free tool</span>
          <h1 className="text-3xl sm:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4 text-balance">
            Nursing home cost calculator
          </h1>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            Select a centre, room type, care level and add-on services to see the full monthly cost, with the SST shown separately. No sign-up needed.
          </p>
        </div>
      </section>
      <CostCalculatorClient lang="en" />
    </div>
  );
}
