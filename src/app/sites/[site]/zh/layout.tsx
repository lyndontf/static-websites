// Everything under /zh is Chinese: say so, so screen readers and search engines read it in the right
// language (<html lang> is set once, in the root layout, and stays "en").
export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return (
    <div lang="zh-Hans" className="contents">
      {children}
    </div>
  );
}
