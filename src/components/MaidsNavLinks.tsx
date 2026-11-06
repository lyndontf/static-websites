'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Main menu links with aria-current on the page the visitor is on (also gives the CSS an "active" style).
// The middleware may prefix the path with /maids in local previews, so match on the end of the path.
type Item = { href: string; label: string };

export default function NavLinks({ items, variant }: { items: Item[]; variant: 'desktop' | 'mobile' }) {
  const path = (usePathname() || '/').replace(/^\/maids(?=\/|$)/, '') || '/';
  const links = items.map((n) => {
    const current = n.href === '/' ? path === '/' : path === n.href || path.startsWith(n.href + '/');
    return (
      <Link key={n.href} className={variant === 'desktop' ? 'nav__link' : undefined} href={n.href} aria-current={current ? 'page' : undefined}>
        {n.label}
      </Link>
    );
  });
  if (variant === 'mobile') return <>{links}</>;
  return (
    <nav className="nav nav--desktop" aria-label="Main">
      {links}
    </nav>
  );
}
