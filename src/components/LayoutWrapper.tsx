'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutWrapperProps {
  children: ReactNode;
  footer: ReactNode;
  isCmsSite?: boolean;
  isFullHtmlPage?: boolean;
}

export default function LayoutWrapper({ children, footer, isCmsSite, isFullHtmlPage }: LayoutWrapperProps) {
  const pathname = usePathname();
  const isLandingPage = pathname.startsWith('/lp/');
  // CMS sites embed their own nav/footer in the HTML content
  // isFullHtmlPage: a centre page rebuilt with its own embedded header/footer
  const hideFooter = isLandingPage || isCmsSite || isFullHtmlPage;
  return (
    <>
      <main id="main" className="flex-1 bg-white">{children}</main>
      {!hideFooter && <div id="site-footer">{footer}</div>}
    </>
  );
}
