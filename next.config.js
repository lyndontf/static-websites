/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hztfeqfnvwzkaeiwldmd.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'genesiscare.com.my',
      },
    ],
  },
  async headers() {
    return [
      {
        // Security headers on every page of every site.
        // The Content-Security-Policy is REPORT-ONLY for now: it blocks nothing, and every violation is logged by
        // /api/csp-report, so it can be tightened from real traffic before it is enforced. 'unsafe-inline' stays in
        // script-src because the CMS pages carry their own inline scripts (see A5 notes in the PR).
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()' },
          { key: 'Content-Security-Policy-Report-Only', value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: blob: https:; media-src 'self' blob: https://hztfeqfnvwzkaeiwldmd.supabase.co; connect-src 'self' https://hztfeqfnvwzkaeiwldmd.supabase.co https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://stats.g.doubleclick.net https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com https://www.youtube.com https://www.google.com https://maps.google.com https://www.facebook.com; frame-ancestors 'self' https://web.genesiscare.com.my https://web.lifecaresystems.com.my; base-uri 'self'; form-action 'self' https://hztfeqfnvwzkaeiwldmd.supabase.co https://wa.me https://api.whatsapp.com; object-src 'none'; report-uri /api/csp-report" },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          // Pictures change rarely and are not renamed when they do: a day in the browser, a week stale-while-revalidate.
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
      {
        source: '/videos/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ];
  },
  async redirects() {
    return [
      // ── Old WordPress page slugs → new CMS equivalents ──
      // Nursing homes (old slug pattern → new)
      { source: '/nursing-home-in-cheras', destination: '/elderly-care-in-cheras', permanent: true },
      { source: '/nursing-home-in-cheras/', destination: '/elderly-care-in-cheras', permanent: true },
      { source: '/nursing-home-in-klang-valley', destination: '/nursing-home-in-klang', permanent: true },
      { source: '/nursing-home-in-klang-valley/', destination: '/nursing-home-in-klang', permanent: true },
      { source: '/nursing-homes-in-petaling-jaya', destination: '/nursing-home-in-petaling-jaya', permanent: true },
      { source: '/nursing-homes-in-petaling-jaya/', destination: '/nursing-home-in-petaling-jaya', permanent: true },
      { source: '/nursing-home-malaysia', destination: '/nursing-home-kajang', permanent: true },
      { source: '/nursing-home-malaysia/', destination: '/nursing-home-kajang', permanent: true },

      // Old folks homes (old slug → new)
      { source: '/old-folks-home-klang', destination: '/old-folks-home-in-klang', permanent: true },
      { source: '/old-folks-home-klang/', destination: '/old-folks-home-in-klang', permanent: true },
      { source: '/old-folks-home-cheras', destination: '/elderly-care-in-cheras', permanent: true },
      { source: '/old-folks-home-cheras/', destination: '/elderly-care-in-cheras', permanent: true },
      { source: '/old-folks-home-puchong', destination: '/old-folks-home-in-puchong', permanent: true },
      { source: '/old-folks-home-puchong/', destination: '/old-folks-home-in-puchong', permanent: true },
      { source: '/old-folks-home-petaling-jaya', destination: '/old-folks-home-in-petaling-jaya', permanent: true },
      { source: '/old-folks-home-petaling-jaya/', destination: '/old-folks-home-in-petaling-jaya', permanent: true },
      { source: '/old-folks-home-petaling-jaya-genesis-life-care', destination: '/old-folks-home-in-petaling-jaya', permanent: true },
      { source: '/old-folks-home-petaling-jaya-genesis-life-care/', destination: '/old-folks-home-in-petaling-jaya', permanent: true },
      { source: '/old-folks-home-kajang', destination: '/old-folks-home-in-kajang', permanent: true },
      { source: '/old-folks-home-kajang/', destination: '/old-folks-home-in-kajang', permanent: true },
      { source: '/old-folks-home-near-me', destination: '/our-locations', permanent: true },
      { source: '/old-folks-home-near-me/', destination: '/our-locations', permanent: true },
      { source: '/old-folks-home', destination: '/our-services', permanent: true },
      { source: '/old-folks-home/', destination: '/our-services', permanent: true },

      // Stroke rehab (old slug → new)
      { source: '/stroke-rehabilitation-klang', destination: '/stroke-rehabilitation-in-klang', permanent: true },
      { source: '/stroke-rehabilitation-klang/', destination: '/stroke-rehabilitation-in-klang', permanent: true },
      { source: '/stroke-rehabilitation-malaysia', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/stroke-rehabilitation-malaysia/', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/stroke-rehabilitation-centre-petaling-jaya', destination: '/stroke-rehabilitation-in-petaling-jaya', permanent: true },
      { source: '/stroke-rehabilitation-centre-petaling-jaya/', destination: '/stroke-rehabilitation-in-petaling-jaya', permanent: true },
      { source: '/stroke-rehabilitation-centre-puchong', destination: '/stroke-rehabilitation-in-puchong', permanent: true },
      { source: '/stroke-rehabilitation-centre-puchong/', destination: '/stroke-rehabilitation-in-puchong', permanent: true },
      { source: '/stroke-rehabilitation-centre-johor-bahru', destination: '/stroke-rehabilitation-in-johor-bahru', permanent: true },
      { source: '/stroke-rehabilitation-centre-johor-bahru/', destination: '/stroke-rehabilitation-in-johor-bahru', permanent: true },
      { source: '/stroke-rehabilitation-centre-in-petaling-jaya', destination: '/stroke-rehabilitation-in-petaling-jaya', permanent: true },
      { source: '/stroke-rehabilitation-centre-in-petaling-jaya/', destination: '/stroke-rehabilitation-in-petaling-jaya', permanent: true },
      { source: '/stroke-rehabilitation-centre-in-puchong', destination: '/stroke-rehabilitation-in-puchong', permanent: true },
      { source: '/stroke-rehabilitation-centre-in-puchong/', destination: '/stroke-rehabilitation-in-puchong', permanent: true },
      { source: '/stroke-rehabilitation-centre-in-johor-bahru', destination: '/stroke-rehabilitation-in-johor-bahru', permanent: true },
      { source: '/stroke-rehabilitation-centre-in-johor-bahru/', destination: '/stroke-rehabilitation-in-johor-bahru', permanent: true },
      { source: '/stroke-rehabilitation', destination: '/stroke-rehabilitation-centre', permanent: true },

      // Dementia care (old slug → new)
      { source: '/dementia-care-centre', destination: '/dementia-care', permanent: true },
      { source: '/dementia-care-centre/', destination: '/dementia-care', permanent: true },
      { source: '/dementia-care-centre-petaling-jaya', destination: '/dementia-care-in-petaling-jaya', permanent: true },
      { source: '/dementia-care-centre-petaling-jaya/', destination: '/dementia-care-in-petaling-jaya', permanent: true },
      { source: '/dementia-care-centre-kajang', destination: '/dementia-care-in-kajang', permanent: true },
      { source: '/dementia-care-centre-kajang/', destination: '/dementia-care-in-kajang', permanent: true },
      { source: '/dementia-care-centre-johor-bahru', destination: '/dementia-care-in-johor-bahru', permanent: true },
      { source: '/dementia-care-centre-johor-bahru/', destination: '/dementia-care-in-johor-bahru', permanent: true },
      { source: '/dementia-care-centre-puchong', destination: '/dementia-care-in-puchong', permanent: true },
      { source: '/dementia-care-centre-puchong/', destination: '/dementia-care-in-puchong', permanent: true },
      { source: '/dementia-care-centre-in-klang-valley', destination: '/dementia-care-in-klang', permanent: true },
      { source: '/dementia-care-centre-in-klang-valley/', destination: '/dementia-care-in-klang', permanent: true },
      { source: '/genesis-dementia-care-centre', destination: '/dementia-care', permanent: true },
      { source: '/genesis-dementia-care-centre/', destination: '/dementia-care', permanent: true },
      { source: '/care-for-dementia', destination: '/dementia-care', permanent: true },
      { source: '/care-for-dementia/', destination: '/dementia-care', permanent: true },
      { source: '/activities-for-dementia', destination: '/dementia-care', permanent: true },
      { source: '/activities-for-dementia/', destination: '/dementia-care', permanent: true },

      // Retirement homes → nearest equivalent
      { source: '/retirement-home-kajang', destination: '/elderly-care-in-cheras', permanent: true },
      { source: '/retirement-home-kajang/', destination: '/elderly-care-in-cheras', permanent: true },
      { source: '/retirement-home-petaling-jaya', destination: '/elderly-care-in-damansara', permanent: true },
      { source: '/retirement-home-petaling-jaya/', destination: '/elderly-care-in-damansara', permanent: true },
      { source: '/retirement-home-in-puchong', destination: '/elderly-care-in-subang-jaya', permanent: true },
      { source: '/retirement-home-in-puchong/', destination: '/elderly-care-in-subang-jaya', permanent: true },
      { source: '/retirement-home-in-klang', destination: '/elderly-care-in-shah-alam', permanent: true },
      { source: '/retirement-home-in-klang/', destination: '/elderly-care-in-shah-alam', permanent: true },
      { source: '/retirement-home-in-johor-bahru', destination: '/elderly-care-in-johor', permanent: true },
      { source: '/retirement-home-in-johor-bahru/', destination: '/elderly-care-in-johor', permanent: true },

      // Post-op / rehab (old slug → new or closest)
      { source: '/post-op-care-in-petaling-jaya', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-petaling-jaya/', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-klang', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-klang/', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-puchong', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-puchong/', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-kajang', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-kajang/', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-johor-bahru', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/post-op-care-in-johor-bahru/', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/physical-rehabilitation-centre-in-puchong', destination: '/stroke-rehabilitation-in-puchong', permanent: true },
      { source: '/physical-rehabilitation-centre-in-puchong/', destination: '/stroke-rehabilitation-in-puchong', permanent: true },
      { source: '/physical-rehabilitation-centre-in-klang', destination: '/stroke-rehabilitation-in-klang', permanent: true },
      { source: '/physical-rehabilitation-centre-in-klang/', destination: '/stroke-rehabilitation-in-klang', permanent: true },
      { source: '/physical-rehabilitation-centre-in-johor-bahru', destination: '/stroke-rehabilitation-in-johor-bahru', permanent: true },
      { source: '/physical-rehabilitation-centre-in-johor-bahru/', destination: '/stroke-rehabilitation-in-johor-bahru', permanent: true },
      { source: '/rehabilitation-centre-malaysia', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/rehabilitation-centre-malaysia/', destination: '/stroke-rehabilitation-centre', permanent: true },

      // General / about pages
      { source: '/about-us-trusted-brand-in-long-term-care', destination: '/about-us', permanent: true },
      { source: '/about-us-trusted-brand-in-long-term-care/', destination: '/about-us', permanent: true },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
        has: [{ type: 'host', value: 'genesiscare.com.my' }],
      },
      {
        source: '/about/',
        destination: '/about-us',
        permanent: true,
        has: [{ type: 'host', value: 'genesiscare.com.my' }],
      },
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
        has: [{ type: 'host', value: 'www.genesiscare.com.my' }],
      },
      {
        source: '/about/',
        destination: '/about-us',
        permanent: true,
        has: [{ type: 'host', value: 'www.genesiscare.com.my' }],
      },
      { source: '/privacy-policy', destination: '/', permanent: true },
      { source: '/privacy-policy/', destination: '/', permanent: true },
      { source: '/terms-of-service', destination: '/', permanent: true },
      { source: '/terms-of-service/', destination: '/', permanent: true },
      { source: '/senior-daycare', destination: '/elderly-day-care', permanent: true },
      { source: '/geriatric-care', destination: '/our-services', permanent: true },
      { source: '/geriatric-care/', destination: '/our-services', permanent: true },
      { source: '/read-our-reviews', destination: '/our-gallery', permanent: true },
      { source: '/read-our-reviews/', destination: '/our-gallery', permanent: true },
      { source: '/review-of-our-old-folks-home', destination: '/our-gallery', permanent: true },
      { source: '/review-of-our-old-folks-home/', destination: '/our-gallery', permanent: true },
      { source: '/what-our-clients-say-about-us', destination: '/our-gallery', permanent: true },
      { source: '/what-our-clients-say-about-us/', destination: '/our-gallery', permanent: true },
      { source: '/professional-nursing-and-rehabilitation', destination: '/our-services', permanent: true },
      { source: '/professional-nursing-and-rehabilitation/', destination: '/our-services', permanent: true },
      { source: '/top-nursing-homes', destination: '/nursing-home-kajang', permanent: true },
      { source: '/top-nursing-homes/', destination: '/nursing-home-kajang', permanent: true },

      // Old blog posts that were top-level pages in WordPress → blog or services
      { source: '/best-nursing-home-in-malaysia', destination: '/nursing-home-kajang', permanent: true },
      { source: '/best-nursing-home-in-malaysia/', destination: '/nursing-home-kajang', permanent: true },
      { source: '/best-old-folks-home-in-malaysia', destination: '/our-services', permanent: true },
      { source: '/best-old-folks-home-in-malaysia/', destination: '/our-services', permanent: true },
      { source: '/best-dementia-care-centre-in-malaysia', destination: '/dementia-care', permanent: true },
      { source: '/best-dementia-care-centre-in-malaysia/', destination: '/dementia-care', permanent: true },
      { source: '/best-stroke-rehabilitation-centre-in-malaysia', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/best-stroke-rehabilitation-centre-in-malaysia/', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/best-rehabilitation-centre-malaysia', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/best-rehabilitation-centre-malaysia/', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/best-retirement-home-in-malaysia', destination: '/our-services', permanent: true },
      { source: '/best-retirement-home-in-malaysia/', destination: '/our-services', permanent: true },
      { source: '/best-post-op-care-in-malaysia', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/best-post-op-care-in-malaysia/', destination: '/post-op-care-malaysia', permanent: true },
      { source: '/preferred-nursing-home-malaysia', destination: '/nursing-home-kajang', permanent: true },
      { source: '/preferred-nursing-home-malaysia/', destination: '/nursing-home-kajang', permanent: true },
      { source: '/choosing-the-best-nursing-home', destination: '/blog/how-to-choose-nursing-home-for-parents', permanent: true },
      { source: '/choosing-the-best-nursing-home/', destination: '/blog/how-to-choose-nursing-home-for-parents', permanent: true },
      { source: '/finding-the-best-nursing-home-in-malaysia-what-to-look-for', destination: '/blog/how-to-choose-nursing-home-for-parents', permanent: true },
      { source: '/finding-the-best-nursing-home-in-malaysia-what-to-look-for/', destination: '/blog/how-to-choose-nursing-home-for-parents', permanent: true },
      { source: '/a-day-at-genesis-life-care', destination: '/blog/daily-life-in-a-nursing-home', permanent: true },
      { source: '/a-day-at-genesis-life-care/', destination: '/blog/daily-life-in-a-nursing-home', permanent: true },
      { source: '/the-benefits-of-professional-dementia-care-services', destination: '/blog/understanding-dementia-guide-malaysian-families', permanent: true },
      { source: '/the-benefits-of-professional-dementia-care-services/', destination: '/blog/understanding-dementia-guide-malaysian-families', permanent: true },
      { source: '/care-in-nursing-homes', destination: '/blog/daily-life-in-a-nursing-home', permanent: true },
      { source: '/care-in-nursing-homes/', destination: '/blog/daily-life-in-a-nursing-home', permanent: true },
      { source: '/family-support-services-in-nursing-homes', destination: '/blog/what-to-expect-first-nursing-home-visit', permanent: true },
      { source: '/family-support-services-in-nursing-homes/', destination: '/blog/what-to-expect-first-nursing-home-visit', permanent: true },
      { source: '/post-stroke-care-facilities-in-malaysia', destination: '/blog/benefits-of-physiotherapy-for-elderly-after-stroke', permanent: true },
      { source: '/post-stroke-care-facilities-in-malaysia/', destination: '/blog/benefits-of-physiotherapy-for-elderly-after-stroke', permanent: true },

      // Location-specific blog posts → nearest CMS pages
      { source: '/top-10-nursing-homes-in-klang', destination: '/nursing-home-in-klang', permanent: true },
      { source: '/top-10-nursing-homes-in-klang/', destination: '/nursing-home-in-klang', permanent: true },
      { source: '/top-10-nursing-homes-in-johor-bahru-2024', destination: '/nursing-home-in-johor-bahru', permanent: true },
      { source: '/top-10-nursing-homes-in-johor-bahru-2024/', destination: '/nursing-home-in-johor-bahru', permanent: true },
      { source: '/top-10-nursing-homes-in-johor-bahru-2026', destination: '/nursing-home-in-johor-bahru', permanent: true },
      { source: '/top-10-nursing-homes-in-johor-bahru-2026/', destination: '/nursing-home-in-johor-bahru', permanent: true },
      { source: '/top-10-nursing-homes-and-elderly-care-centres-in-pj', destination: '/nursing-home-in-petaling-jaya', permanent: true },
      { source: '/top-10-nursing-homes-and-elderly-care-centres-in-pj/', destination: '/nursing-home-in-petaling-jaya', permanent: true },
      { source: '/top-5-nursing-homes-in-puchong-2024', destination: '/nursing-home-in-puchong', permanent: true },
      { source: '/top-5-nursing-homes-in-puchong-2024/', destination: '/nursing-home-in-puchong', permanent: true },
      { source: '/top-5-nursing-homes-in-puchong-2025', destination: '/nursing-home-in-puchong', permanent: true },
      { source: '/top-5-nursing-homes-in-puchong-2025/', destination: '/nursing-home-in-puchong', permanent: true },
      { source: '/top-5-nursing-homes-in-puchong-2026', destination: '/nursing-home-in-puchong', permanent: true },
      { source: '/top-5-nursing-homes-in-puchong-2026/', destination: '/nursing-home-in-puchong', permanent: true },
      { source: '/kajang-senior-facilities-review', destination: '/nursing-home-kajang', permanent: true },
      { source: '/kajang-senior-facilities-review/', destination: '/nursing-home-kajang', permanent: true },
      { source: '/best-elderly-care-centres-johor-bahru', destination: '/blog/best-elderly-care-centres-johor-bahru', permanent: true },
      { source: '/elderly-care-services-in-malaysia', destination: '/our-services', permanent: true },
      { source: '/elderly-care-services-in-malaysia/', destination: '/our-services', permanent: true },
      { source: '/senior-living-facilities-in-malaysia', destination: '/our-services', permanent: true },
      { source: '/senior-living-facilities-in-malaysia/', destination: '/our-services', permanent: true },
      { source: '/residential-care-homes-in-malaysia', destination: '/our-services', permanent: true },
      { source: '/residential-care-homes-in-malaysia/', destination: '/our-services', permanent: true },
      { source: '/leading-rehab-centre-in-kl', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/leading-rehab-centre-in-kl/', destination: '/stroke-rehabilitation-centre', permanent: true },
      { source: '/geriatric-care-centre-in-malaysia', destination: '/our-services', permanent: true },
      { source: '/geriatric-care-centre-in-malaysia/', destination: '/our-services', permanent: true },
      { source: '/muslim-friendly-nursing-care', destination: '/our-services', permanent: true },
      { source: '/muslim-friendly-nursing-care/', destination: '/our-services', permanent: true },
      { source: '/perkhidmatan-penjagaan-orang-tua-di-malaysia', destination: '/our-services', permanent: true },
      { source: '/perkhidmatan-penjagaan-orang-tua-di-malaysia/', destination: '/our-services', permanent: true },
      { source: '/nursing-home-cost-in-malaysia', destination: '/blog/nursing-home-cost-in-malaysia', permanent: true },

      // Old WordPress ?lang=zh → new zh pages
      { source: '/about', destination: '/about-us', permanent: true, has: [{ type: 'query', key: 'lang', value: 'zh' }] },

      // Old WordPress category pages → blog
      { source: '/category/:path*', destination: '/blog', permanent: true },

      // Old WordPress /wp-content and /wp-includes paths → homepage
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },

      // Old Elementor floating buttons
      { source: '/e-floating-buttons/:path*', destination: '/', permanent: true },

      // GTA redesign — dropped "why-choose-us" page merged into "about"
      {
        source: '/why-choose-us',
        destination: '/about',
        permanent: true,
        has: [{ type: 'host', value: 'gtacademy.com.my' }],
      },
      {
        source: '/why-choose-us',
        destination: '/about',
        permanent: true,
        has: [{ type: 'host', value: 'www.gtacademy.com.my' }],
      },
      // Dev-preview path-prefix equivalent (e.g. localhost/gta/why-choose-us)
      { source: '/gta/why-choose-us', destination: '/gta/about', permanent: true },
    ];
  },
};

module.exports = nextConfig;
