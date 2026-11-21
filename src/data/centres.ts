/* ─── Shared centre data for location service pages ──────────────────── */

/**
 * Google Business Profile figures per centre: the ONE source for every rating and review count on the site.
 * Read from the Google Business Profile locations (Markifact, business_profile_get_location_info) on 2026-11-21.
 * Update the numbers here only; pages import them.
 */
export const GOOGLE_RATINGS_AS_OF = '2026-11-21';
export const GOOGLE_RATINGS = {
  klang: { rating: '4.3', reviews: 75 },
  pj: { rating: '4.7', reviews: 23 },
  puchong: { rating: '4.9', reviews: 29 },
  kajang: { rating: '4.9', reviews: 40 },
  jb: { rating: '4.1', reviews: 15 },
} as const;
const _all = Object.values(GOOGLE_RATINGS);
const _sel = [GOOGLE_RATINGS.pj, GOOGLE_RATINGS.klang, GOOGLE_RATINGS.kajang, GOOGLE_RATINGS.puchong];
/** All five centres together: review-weighted average, one decimal. */
export const GOOGLE_GROUP = {
  rating: (_all.reduce((a, c) => a + Number(c.rating) * c.reviews, 0) / _all.reduce((a, c) => a + c.reviews, 0)).toFixed(1),
  reviews: _all.reduce((a, c) => a + c.reviews, 0),
};
/** The four Selangor centres (not Johor Bahru). */
export const GOOGLE_SELANGOR = {
  min: Math.min(..._sel.map((c) => Number(c.rating))).toFixed(1),
  max: Math.max(..._sel.map((c) => Number(c.rating))).toFixed(1),
  reviews: _sel.reduce((a, c) => a + c.reviews, 0),
};

export type CentreData = {
  name: string;
  fullName: string;
  slug: string;
  phone: string;
  phoneCTA: string;
  address: string;
  rating: string;
  reviews: number;
  established: string;
  beds: string;
  heroImg: string;
  mapEmbed: string;
  highlights: { label: string; value: string; sub: string }[];
  facilityImages: { src: string; alt: string }[];
  teamMembers: { name: string; role: string; bio: string; img: string }[];
  testimonials: { name: string; text: string; textZh?: string; rating: number }[];
};

export const centres: Record<string, CentreData> = {
  klang: {
    name: 'Klang',
    fullName: 'Genesis Life Care Klang',
    slug: 'nursing-home-in-klang',
    phone: '+6019 325 0457',
    phoneCTA: '+6019-325-0457',
    address: '3, Jalan Istana, Kawasan 1, 41000 Klang, Selangor',
    rating: GOOGLE_RATINGS.klang.rating, reviews: GOOGLE_RATINGS.klang.reviews,
    established: '2018',
    beds: '120+',
    heroImg: '/images/klang-centre.jpg',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.3!2d101.4484!3d3.0456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4c3a1f5e5b1d%3A0x2e5f5c8b7a8d9e3f!2sGenesis+Life+Care!5e0!3m2!1sen!2smy!4v1700000000000',
    highlights: [
      { label: 'Google Rating', value: GOOGLE_RATINGS.klang.rating, sub: `${GOOGLE_RATINGS.klang.reviews} reviews` },
      { label: 'Beds', value: '120+', sub: 'Capacity' },
      { label: 'Established', value: '2018', sub: 'Our Original Centre' },
      { label: 'Affordable Rates', value: '✓', sub: 'All Centres' },
      { label: 'Care Team', value: '25+', sub: 'Professionals' },
    ],
    facilityImages: [
      { src: '/images/klang-centre.jpg', alt: 'Genesis Life Care Klang exterior' },
      { src: '/images/services/rehab-department.jpg', alt: 'Rehabilitation area' },
      { src: '/images/services/bedded-room.jpg', alt: 'Comfortable living space' },
      { src: '/images/services/common-area-scenic.jpg', alt: 'Common area' },
      { src: '/images/services/nursing-station.jpg', alt: 'Care facilities' },
      { src: '/images/services/halal-dinner.jpg', alt: 'Dining area' },
    ],
    teamMembers: [
      {
        name: 'Dr. Phang Sue Ling',
        role: 'Chief of Operations',
        bio: 'Oversees Genesis Life Care operations and ensures the highest standards of patient care across all centres.',
        img: '/images/team/team-1.png',
      },
      {
        name: 'Rose',
        role: 'Centre Manager',
        bio: 'Manages daily operations at the Klang centre, ensuring smooth coordination between all care teams.',
        img: '/images/team/team-2.png',
      },
      {
        name: 'Seow Zhi Heng',
        role: 'Senior Therapist',
        bio: 'Specialises in elderly rehabilitation with a patient-centred, multidisciplinary approach.',
        img: '/images/team/team-3.png',
      },
    ],
    testimonials: [
      {
        name: 'Alyse Cheong',
        text: 'My mom been staying at Genesis Life Care Centre, Klang for 2 months+ for her post surgery recovery. She enjoyed staying there.',
        textZh: '我妈妈在Genesis Life Care巴生中心住了两个多月，进行术后康复。她在那里住得很开心。',
        rating: 5,
      },
      {
        name: 'Kenneth Ng',
        text: 'I sent my mum here for 2 months after her hip operation, they take care of my mum very well, definitely a recommended place for good nursing care home for elderly.',
        textZh: '我妈妈髋关节手术后在这里住了两个月，他们把我妈妈照顾得非常好，绝对是值得推荐的优质老年护理中心。',
        rating: 5,
      },
      {
        name: 'Lee Steffi',
        text: 'Dr Phoon, thank you and your team for the gentle care of my mum. Though she was only there a short time, she passed away peacefully, and I am truly grateful.',
        textZh: '潘医生，感谢您和您的团队悉心照顾我的妈妈。虽然她在那里的时间不长，但她安详地离开了，我由衷感激。',
        rating: 4,
      },
    ],
  },

  'petaling-jaya': {
    name: 'Petaling Jaya',
    fullName: 'Genesis Life Care Petaling Jaya',
    slug: 'nursing-home-in-petaling-jaya',
    phone: '+6019 295 0457',
    phoneCTA: '+6019-295-0457',
    address: '1, Petaling Utama Ave, PJS 1, 58200 Petaling Jaya, Selangor',
    rating: GOOGLE_RATINGS.pj.rating, reviews: GOOGLE_RATINGS.pj.reviews,
    established: '2020',
    beds: '50+',
    heroImg: '/images/pj-centre.jpg',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.0!2d101.6168!3d3.0936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4bdc8b9d5c1d%3A0x5e3f7c8a6b4d2e1a!2sGenesis+Life+Care+Petaling+Jaya!5e0!3m2!1sen!2smy!4v1700000000000',
    highlights: [
      { label: 'Google Rating', value: GOOGLE_RATINGS.pj.rating, sub: `${GOOGLE_RATINGS.pj.reviews} reviews` },
      { label: 'Beds', value: '50+', sub: 'Capacity' },
      { label: 'Established', value: '2020', sub: 'Flagship Centre' },
      { label: 'Affordable Rates', value: '✓', sub: 'All Centres' },
      { label: 'Care Team', value: '30+', sub: 'Professionals' },
    ],
    facilityImages: [
      { src: '/images/pj-centre.jpg', alt: 'Genesis Life Care Petaling Jaya exterior' },
      { src: '/images/services/rehab-department.jpg', alt: 'Rehabilitation area' },
      { src: '/images/services/bedded-room.jpg', alt: 'Comfortable living space' },
      { src: '/images/services/common-area-scenic.jpg', alt: 'Common area' },
      { src: '/images/services/nursing-station.jpg', alt: 'Care facilities' },
      { src: '/images/services/halal-dinner.jpg', alt: 'Dining area' },
    ],
    teamMembers: [
      {
        name: 'Sherrelyn',
        role: 'Centre Manager',
        bio: 'Leads the Petaling Jaya team with dedication to providing personalised, compassionate care for every resident.',
        img: '/images/team/team-7.png',
      },
      {
        name: 'Joharry Mustafa',
        role: 'Supervisor',
        bio: 'Coordinates daily care operations and ensures smooth staff scheduling across all shifts.',
        img: '/images/team/team-8.png',
      },
      {
        name: 'Seow Zhi Heng',
        role: 'Senior Therapist',
        bio: 'Specialises in elderly rehabilitation with a patient-centred, multidisciplinary approach.',
        img: '/images/team/team-9.png',
      },
    ],
    testimonials: [
      {
        name: 'Mei Ling T.',
        text: 'The PJ centre is outstanding. The staff truly care about every resident and the facilities are modern and well-maintained.',
        textZh: '八打灵再也中心非常出色。工作人员真心关怀每一位居民，设施现代化且保养得宜。',
        rating: 5,
      },
      {
        name: 'Ahmad R.',
        text: 'We chose Genesis PJ for my father and it was the best decision. The team is professional and the care is excellent.',
        textZh: '我们为父亲选择了Genesis八打灵再也中心，这是最正确的决定。团队专业，护理品质卓越。',
        rating: 5,
      },
      {
        name: 'Sarah L.',
        text: 'The dementia care programme at PJ has made a real difference for my mother. The psychologist-led approach is very effective.',
        textZh: '八打灵再也中心的痴呆症护理计划为我的母亲带来了实质的改善。由心理学家主导的方针非常有效。',
        rating: 5,
      },
    ],
  },

  puchong: {
    name: 'Puchong',
    fullName: 'Genesis Life Care Puchong',
    slug: 'nursing-home-in-puchong',
    phone: '+6019 759 0457',
    phoneCTA: '+6019-759-0457',
    address: '16, Jln TPP 1/1, Taman Perindustrian Puchong, 47100 Puchong, Selangor',
    rating: GOOGLE_RATINGS.puchong.rating, reviews: GOOGLE_RATINGS.puchong.reviews,
    established: '2022',
    beds: '120+',
    heroImg: '/images/puchong-centre.jpeg',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.5!2d101.6200!3d3.0300!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4e8a5c7d3b1f%3A0x4d2e1a8b6c5f7e3d!2sGenesis+Life+Care+Puchong!5e0!3m2!1sen!2smy!4v1700000000000',
    highlights: [
      { label: 'Google Rating', value: GOOGLE_RATINGS.puchong.rating, sub: `${GOOGLE_RATINGS.puchong.reviews} reviews` },
      { label: 'Beds', value: '120+', sub: 'Capacity' },
      { label: 'Established', value: '2022', sub: 'Modern Facility' },
      { label: 'Affordable Rates', value: '✓', sub: 'All Centres' },
      { label: 'Care Team', value: '20+', sub: 'Professionals' },
    ],
    facilityImages: [
      { src: '/images/puchong-centre.jpeg', alt: 'Genesis Life Care Puchong exterior' },
      { src: '/images/services/rehab-department.jpg', alt: 'Rehabilitation area' },
      { src: '/images/services/bedded-room.jpg', alt: 'Comfortable living space' },
      { src: '/images/services/common-area-scenic.jpg', alt: 'Common area' },
      { src: '/images/services/nursing-station.jpg', alt: 'Care facilities' },
      { src: '/images/services/halal-dinner.jpg', alt: 'Dining area' },
    ],
    teamMembers: [
      {
        name: 'Dr. Phang Sue Ling',
        role: 'Chief of Operations',
        bio: 'Oversees Genesis Life Care operations and ensures the highest standards of patient care across all centres.',
        img: '/images/team/team-1.png',
      },
      {
        name: 'Jenny',
        role: 'Centre Manager',
        bio: 'Leads the Puchong team with a focus on creating a warm, home-like environment for all residents.',
        img: '/images/team/team-2.png',
      },
      {
        name: 'Seow Zhi Heng',
        role: 'Senior Therapist',
        bio: 'Specialises in elderly rehabilitation with a patient-centred, multidisciplinary approach.',
        img: '/images/team/team-3.png',
      },
    ],
    testimonials: [
      {
        name: 'Sarah Tan',
        text: 'The Puchong centre is well-maintained and the staff are incredibly caring. My father has been very comfortable here.',
        textZh: '蒲种中心保养得宜，工作人员非常体贴用心。我的父亲在这里住得很舒适。',
        rating: 5,
      },
      {
        name: 'Ahmad Razak',
        text: 'Professional nursing care with a personal touch. The team goes above and beyond for every resident.',
        textZh: '专业的护理服务中带着人情味。团队总是为每一位居民付出额外的关怀。',
        rating: 5,
      },
      {
        name: 'Michelle Lim',
        text: 'We appreciate the regular updates about our mother. The care team is responsive and always available.',
        textZh: '我们很感激他们定期通报母亲的状况。护理团队反应迅速，随时都能联系上。',
        rating: 4,
      },
    ],
  },

  kajang: {
    name: 'Kajang',
    fullName: 'Genesis Life Care Kajang',
    slug: 'nursing-home-kajang',
    phone: '+6019 334 0457',
    phoneCTA: '+6019-334-0457',
    address: '41, Jalan Ria 1, Kawasan Perindustrian Ria, 43500 Kajang, Selangor',
    rating: GOOGLE_RATINGS.kajang.rating, reviews: GOOGLE_RATINGS.kajang.reviews,
    established: '2021',
    beds: '120',
    heroImg: '/images/kajang-centre.jpeg',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.6!2d101.7900!3d2.9900!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4f9e5b7a3d1c%3A0x8e3f2a4b6c5d7e1a!2sGenesis+Life+Care+Kajang!5e0!3m2!1sen!2smy!4v1700000000000',
    highlights: [
      { label: 'Google Rating', value: GOOGLE_RATINGS.kajang.rating, sub: `${GOOGLE_RATINGS.kajang.reviews} reviews` },
      { label: 'Beds', value: '120', sub: 'Capacity' },
      { label: 'Established', value: '2021', sub: 'Southern KV' },
      { label: 'Affordable Rates', value: '✓', sub: 'All Centres' },
      { label: 'Care Team', value: '20+', sub: 'Professionals' },
    ],
    facilityImages: [
      { src: '/images/kajang-centre.jpeg', alt: 'Genesis Life Care Kajang exterior' },
      { src: '/images/services/rehab-department.jpg', alt: 'Rehabilitation area' },
      { src: '/images/services/bedded-room.jpg', alt: 'Comfortable living space' },
      { src: '/images/services/common-area-scenic.jpg', alt: 'Common area' },
      { src: '/images/services/nursing-station.jpg', alt: 'Care facilities' },
      { src: '/images/services/halal-dinner.jpg', alt: 'Dining area' },
    ],
    teamMembers: [
      {
        name: 'Dr. Phang Sue Ling',
        role: 'Chief of Operations',
        bio: 'Oversees Genesis Life Care operations and ensures the highest standards of patient care across all centres.',
        img: '/images/team/team-1.png',
      },
      {
        name: 'Farah',
        role: 'Centre Manager',
        bio: 'Manages the Kajang centre with a commitment to maintaining high care standards and a supportive environment.',
        img: '/images/team/team-2.png',
      },
      {
        name: 'Seow Zhi Heng',
        role: 'Senior Therapist',
        bio: 'Specialises in elderly rehabilitation with a patient-centred, multidisciplinary approach.',
        img: '/images/team/team-3.png',
      },
    ],
    testimonials: [
      {
        name: 'Nurul Aisyah',
        text: 'The Kajang centre provides excellent care for my grandmother. The staff are attentive and the facilities are comfortable.',
        textZh: '加影中心为我的祖母提供了卓越的护理。工作人员细心周到，设施也很舒适。',
        rating: 5,
      },
      {
        name: 'David Wong',
        text: 'Very impressed with the professional nursing care here. The team communicates regularly with our family about progress.',
        textZh: '对这里专业的护理服务印象非常深刻。团队会定期向我们家人通报进展。',
        rating: 5,
      },
      {
        name: 'Priya Raman',
        text: 'Good rehabilitation programme and caring staff. My father has shown improvement since staying here.',
        textZh: '康复计划完善，工作人员也很有爱心。我父亲入住以来情况已有所改善。',
        rating: 4,
      },
    ],
  },

  'johor-bahru': {
    name: 'Johor Bahru',
    fullName: 'Genesis Life Care Johor Bahru',
    slug: 'nursing-home-in-johor-bahru',
    phone: '+6019 282 0457',
    phoneCTA: '+6019-282-0457',
    address: 'Level 6, Holiday Plaza Tower, Jalan Dato Sulaiman, Taman Century, 80250 Johor Bahru, Johor Darul Ta’zim',
    rating: GOOGLE_RATINGS.jb.rating, reviews: GOOGLE_RATINGS.jb.reviews,
    established: '2023',
    beds: '120+',
    heroImg: '/images/jb-centre.jpeg',
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.2!2d103.7600!3d1.4800!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da1ec8a5b7d3f1%3A0x6e2f4a8b5c7d3e1a!2sGenesis+Life+Care+Johor+Bahru!5e0!3m2!1sen!2smy!4v1700000000000',
    highlights: [
      { label: 'Google Rating', value: GOOGLE_RATINGS.jb.rating, sub: `${GOOGLE_RATINGS.jb.reviews} reviews` },
      { label: 'Beds', value: '120+', sub: 'Capacity' },
      { label: 'Established', value: '2023', sub: 'Southern Region' },
      { label: 'Affordable Rates', value: '✓', sub: 'All Centres' },
      { label: 'Care Team', value: '20+', sub: 'Professionals' },
    ],
    facilityImages: [
      { src: '/images/jb-centre.jpeg', alt: 'Genesis Life Care Johor Bahru exterior' },
      { src: '/images/services/rehab-department.jpg', alt: 'Rehabilitation area' },
      { src: '/images/services/bedded-room.jpg', alt: 'Comfortable living space' },
      { src: '/images/services/common-area-scenic.jpg', alt: 'Common area' },
      { src: '/images/services/nursing-station.jpg', alt: 'Care facilities' },
      { src: '/images/services/halal-dinner.jpg', alt: 'Dining area' },
    ],
    teamMembers: [
      {
        name: 'Dr. Phang Sue Ling',
        role: 'Chief of Operations',
        bio: 'Oversees Genesis Life Care operations and ensures the highest standards of patient care across all centres.',
        img: '/images/team/team-1.png',
      },
      {
        name: 'Amirah',
        role: 'Centre Manager',
        bio: 'Leads the Johor Bahru team, bringing warmth and professionalism to our newest southern region centre.',
        img: '/images/team/team-2.png',
      },
      {
        name: 'Seow Zhi Heng',
        role: 'Senior Therapist',
        bio: 'Specialises in elderly rehabilitation with a patient-centred, multidisciplinary approach.',
        img: '/images/team/team-3.png',
      },
    ],
    testimonials: [
      {
        name: 'Lim Wei Shan',
        text: 'The JB centre is wonderful. The staff are very professional and my mother receives excellent care every day.',
        textZh: '新山中心非常棒。工作人员十分专业，我的母亲每天都获得优质的照护。',
        rating: 5,
      },
      {
        name: 'Hakim Ibrahim',
        text: 'Glad to have a Genesis centre in JB now. The quality of care matches their other centres perfectly.',
        textZh: '很高兴新山现在也有Genesis的中心。护理品质与其他中心完全一致。',
        rating: 5,
      },
      {
        name: 'Siti Nurhaliza',
        text: 'Good facilities and caring staff. The rehabilitation programme has been very helpful for my father.',
        textZh: '设施完善，工作人员也很用心。康复计划对我父亲的帮助很大。',
        rating: 4,
      },
    ],
  },
};

/* ─── Helper to get "other centres" excluding the current one ────────── */

export const allCentreCards = [
  { name: 'Petaling Jaya', slug: 'nursing-home-in-petaling-jaya', rating: GOOGLE_RATINGS.pj.rating, reviews: GOOGLE_RATINGS.pj.reviews, tag: 'Flagship Centre', img: '/images/pj-centre.jpg' },
  { name: 'Klang', slug: 'nursing-home-in-klang', rating: GOOGLE_RATINGS.klang.rating, reviews: GOOGLE_RATINGS.klang.reviews, tag: 'Original Centre', img: '/images/klang-centre.jpg' },
  { name: 'Kajang', slug: 'nursing-home-kajang', rating: GOOGLE_RATINGS.kajang.rating, reviews: GOOGLE_RATINGS.kajang.reviews, tag: 'Southern KV', img: '/images/kajang-centre.jpeg' },
  { name: 'Puchong', slug: 'nursing-home-in-puchong', rating: GOOGLE_RATINGS.puchong.rating, reviews: GOOGLE_RATINGS.puchong.reviews, tag: 'Modern Facility', img: '/images/puchong-centre.jpeg' },
  { name: 'Johor Bahru', slug: 'nursing-home-in-johor-bahru', rating: GOOGLE_RATINGS.jb.rating, reviews: GOOGLE_RATINGS.jb.reviews, tag: 'Southern Region', img: '/images/jb-centre.jpeg' },
];

export function getOtherCentres(excludeName: string) {
  return allCentreCards.filter((c) => c.name !== excludeName);
}
