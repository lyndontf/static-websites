// Where each site's privacy page lives. Used by the analytics notice bar (layout.tsx) and the shared footer (SiteShell -> Footer).
// Two sites keep their mobile app's policy at the old address on purpose (the app store listings link to lifecaresystems.com.my/privacy),
// so their WEBSITE notice is at /website-privacy-notice. A site with no entry shows the notice bar without a link.
export const PRIVACY_PATH: Record<string, string> = {
  centre: '/website-privacy-notice',
  'glc-hire': '/privacy',
  lcs: '/website-privacy-notice',
  maids: '/privacy-notice',
  gta: '/privacy',
  'project-deo': '/privacy',
  stroke: '/privacy',
  dementia: '/privacy',
};
