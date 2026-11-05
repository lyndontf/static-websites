import { Metadata } from 'next';
import CostCalculatorClient from '@/components/CostCalculatorClient';

export const metadata: Metadata = {
  title: '安老院费用计算器',
  description: '即时估算 Genesis Life Care 安老院的每月费用。选择护理中心、房型、护理等级和服务，查看费用、服务税 (SST) 和合计。',
  alternates: { languages: { en: '/cost-calculator' } },
};

export default function CostCalculatorZhPage() {
  return (
    <div className="min-h-screen bg-[#edf1f3]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0e5a72] to-[#2c88a2] py-14 sm:py-20">
        <div className="relative max-w-2xl mx-auto px-4 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[.14em] uppercase text-white/90 mb-4">免费工具</span>
          <h1 className="text-3xl sm:text-[40px] font-extrabold text-white leading-tight tracking-tight mb-4 text-balance">安老院费用计算器</h1>
          <p className="text-base sm:text-lg text-white/85 max-w-xl mx-auto leading-relaxed">
            选择护理中心、房型、护理等级和附加服务，即可查看每月总费用，服务税 (SST) 另行列出。无需注册。
          </p>
        </div>
      </section>
      <CostCalculatorClient lang="zh" />
    </div>
  );
}
