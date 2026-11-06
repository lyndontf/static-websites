// "Where do you want to start?" as clickable cards (Home). The wording is the signed list: each item's bold lead is the
// card title, the rest is the text, and the item's link becomes the whole card's link.

type Card = { title: string; body: string; href: string };

function parse(html: string): Card {
  const href = /href="([^"]+)"/i.exec(html)?.[1] || '#';
  const m = /^\s*<strong>(.*?)<\/strong>\s*([\s\S]*)$/i.exec(html);
  const title = (m ? m[1] : '').replace(/<[^>]+>/g, '');
  const rest = (m ? m[2] : html).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return { title, body: rest, href };
}

export default function MaidsCards({ items }: { items: string[] }) {
  const cards = items.map(parse);
  return (
    <ul className="startcards" role="list">
      {cards.map((c) => (
        <li key={c.href + c.title}>
          <a className="startcard" href={c.href}>
            <span className="startcard__title">{c.title}</span>
            <span className="startcard__body">{c.body}</span>
            <span className="startcard__go" aria-hidden="true">
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
