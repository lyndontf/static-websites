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
      <CostCalculatorClient />
    </div>
  );
}
