import type { Metadata } from 'next';
import './lcs.css';
import { LcsNav } from './LcsNav';

export const metadata: Metadata = {
  icons: {
    icon: '/favicon.ico',
  },
};

function LcsFooter() {
  return (
    <footer className="lcs-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.1rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 768 768" height="30" width="30" style={{ flexShrink: 0 }}>
                <path fill="rgba(255,255,255,0.95)" d="M306.527 662.285L484.277 484.535C544.594 424.219 544.594 326.434 484.277 266.113L577.41 172.984C691.027 286.602 691.027 470.82 577.41 584.449C503.926 657.938 400.891 683.867 306.527 662.285ZM306.516 662.273L371.668 597.117L392.18 576.605L436.848 662.297C383.508 669.996 356.648 670.504 306.516 662.273Z" />
                <path fill="rgba(255,255,255,0.65)" d="M431.305 438.797C398.113 471.723 344.52 471.5 311.594 438.309C278.672 405.117 278.891 351.523 312.082 318.602C345.273 285.676 398.867 285.895 431.793 319.086C464.703 352.277 464.484 405.887 431.305 438.797ZM655.266 443.863C676.852 349.504 650.918 246.469 577.422 172.973C516.773 112.336 436.031 84.066 356.637 88.16C299.574 91.105 272.887 160.168 313.301 200.582L314.934 202.215C327.746 215.031 345.359 221.523 363.473 220.961C404.594 219.684 446.117 234.727 477.504 266.113ZM213.945 370.477C214.504 352.363 208.012 334.75 195.199 321.938L193.566 320.305C153.152 279.891 84.09 306.578 81.141 363.645C77.047 443.035 105.32 523.781 165.953 584.426C239.449 657.922 342.484 683.855 436.836 662.273L259.098 484.512C227.719 453.133 212.664 411.598 213.945 370.477Z" />
              </svg>
              Life Care Systems
            </div>
            <p>Malaysia&apos;s most complete nursing home management platform — built for operators who want to focus on care, not paperwork.</p>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)' }}>No.3, Amverton Business Centre, 41000 Klang, Selangor</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="/lcs/features">Features</a></li>
              <li><a href="/lcs/pricing">Pricing</a></li>
              <li><a href="https://app.genesiscare.com.my/" target="_blank" rel="noopener noreferrer">Login</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="/lcs/about">About Us</a></li>
              <li><a href="/lcs/about#team">Our Team</a></li>
              <li><a href="/lcs/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+60196210457">+6019 621 0457</a></li>
              <li><a href="mailto:hello@lifecaresystems.com.my">Email Us</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; 2026 Life Care Systems by Genesis Flex Sdn Bhd. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default function LcsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lcs">
      <LcsNav />
      <main>{children}</main>
      <LcsFooter />
    </div>
  );
}
