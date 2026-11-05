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
      <CostCalculatorClient />
    </div>
  );
}
