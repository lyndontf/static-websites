// Shared Chinese translations for UI chrome repeated verbatim across the
// hardcoded location/service pages (hero CTAs, section eyebrows, stat
// labels). Page-specific copy (hero subtitle, feature grids, FAQs, "about"
// narrative) lives inline in each page file instead, since it isn't reused
// word-for-word across pages the way this chrome is.
export const zhCommon = {
  bookFreeTour: '预约参观',
  learnMore: '了解更多',
  viewCentreDetails: '查看中心详情',
  bedCapacity: '床位容量',
  nursingCare: '护理服务',
  call: '致电',
  ourApproach: '我们的方针',
  ourServices: '我们的服务',
  ourCentre: '我们的中心',
  faq: '常见问题',
  googleRating: 'Google 评分',
  reviews: (n: string | number) => `${n} 则评价`,
};
