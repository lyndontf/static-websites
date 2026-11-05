'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { ContentBlock } from '@/lib/supabase';
import { useSiteLang } from '@/lib/useSiteLang';
import MaidsPlugBox from '@/components/MaidsPlugs';

const JobListingsEmbed = dynamic(() => import('./JobListingsEmbed'), { ssr: false });

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '');
}

export default function ContentRenderer({
  blocks: blocksEn,
  blocksZh,
}: {
  blocks: ContentBlock[];
  // Optional Chinese translation. Falls back to `blocksEn` whenever this page
  // has no translation yet, so toggling language never blanks the page.
  blocksZh?: ContentBlock[] | null;
}) {
  const lang = useSiteLang();
  const blocks = lang === 'zh' && blocksZh && blocksZh.length > 0 ? blocksZh : blocksEn;

  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="text-base leading-[1.8] text-[#334046] [&_strong]:text-[#173039] [&_strong]:font-semibold [&_table]:w-full [&_table]:border-collapse [&_table]:my-2 [&_table]:mb-6 [&_table]:text-sm [&_th]:p-3 [&_td]:p-3 [&_th]:border [&_td]:border [&_th]:border-[#e4eaed] [&_td]:border-[#e4eaed] [&_th]:text-left [&_td]:text-left [&_th]:bg-[#eaf3f6] [&_th]:font-bold [&_th]:text-[#173039]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading': {
            const Tag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
            const classes: Record<number, string> = {
              1: 'text-3xl font-extrabold text-[#173039] tracking-[-0.02em] mb-4 mt-10',
              2: 'text-[26px] font-extrabold text-[#173039] tracking-[-0.02em] mb-4 mt-10',
              3: 'text-xl font-extrabold text-[#173039] mb-3 mt-7',
              4: 'text-lg font-bold text-[#173039] mb-2 mt-5',
              5: 'text-base font-bold text-[#173039] mb-2 mt-4',
              6: 'text-base font-bold text-[#173039] mb-2 mt-4',
            };
            return (
              <Tag key={i} className={classes[block.level || 2] || classes[2]}>
                {block.content}
              </Tag>
            );
          }

          case 'paragraph':
            return (
              <p
                key={i}
                className="mb-[18px]"
                dangerouslySetInnerHTML={{ __html: block.content || '' }}
              />
            );

          case 'image':
            return (
              <figure key={i} className="my-6">
                {block.src && (
                  <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                    <Image
                      src={block.src}
                      alt={block.alt || ''}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                )}
                {block.caption && (
                  <figcaption className="text-center text-sm text-[#7a8a92] mt-2">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'list': {
            const ListTag = block.ordered ? 'ol' : 'ul';
            return (
              <ListTag
                key={i}
                className={`mb-5 pl-6 space-y-2.5 ${
                  block.ordered ? 'list-decimal' : 'list-disc'
                }`}
              >
                {(block.items || []).map((item, j) => (
                  <li
                    key={j}
                    className="leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ListTag>
            );
          }

          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-[#2c88a2] pl-4 py-2 my-6 italic text-[#5b6b73] bg-[#eaf3f6]/60 rounded-r-lg"
              >
                <p>{block.content}</p>
              </blockquote>
            );

          case 'cta':
            return (
              <div key={i} className="my-8 text-center">
                <a
                  href={block.url || '#'}
                  className="inline-block bg-[#2c88a2] text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#0b4a5e] transition-colors"
                >
                  {block.label || block.content || 'Learn More'}
                </a>
              </div>
            );

          case 'divider':
            return <hr key={i} className="my-8 border-[#e4eaed]" />;

          case 'html':
            return (
              <div
                key={i}
                className="my-4"
                dangerouslySetInnerHTML={{ __html: block.content || '' }}
              />
            );

          case 'job_listings':
            return <JobListingsEmbed key={i} />;

          // Maids in Malaysia: a signed plug box, and expandable FAQ questions (all answers are in the HTML)
          case 'maids_plug':
            return <MaidsPlugBox key={i} plugKey={block.key || ''} code={block.code || ''} />;

          case 'maids_faq':
            return (
              <div key={i} className="my-6 divide-y divide-[#D5E0EB] rounded-xl border border-[#D5E0EB] bg-white">
                {(block.faq || []).map((q, j) => (
                  <details key={j} className="group px-4 py-1 sm:px-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 py-4 text-lg font-extrabold text-[#0F2A43]">
                      <span>{q.question}</span>
                      <span aria-hidden="true" className="text-2xl font-normal text-[#1F5FA8] group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <div className="pb-4">
                      <ContentRenderer blocks={q.blocks} />
                    </div>
                  </details>
                ))}
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
