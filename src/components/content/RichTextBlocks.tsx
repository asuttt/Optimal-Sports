import {Fragment, type ReactNode} from 'react';
import {type PortableTextBlock, type PortableTextSpan} from '@/lib/sanity/privacyTermsPage';

interface RichTextBlocksProps {
  value: PortableTextBlock[];
  className?: string;
}

function getBlockText(block: PortableTextBlock) {
  return block.children?.map((child) => child.text ?? '').join('').trim() ?? '';
}

function renderSpan(span: PortableTextSpan, index: number) {
  const text = span.text ?? '';
  if (!text) return null;

  const content = span.marks?.includes('strong')
    ? <strong className="font-semibold text-foreground">{text}</strong>
    : text;

  return <Fragment key={span._key ?? `${text}-${index}`}>{content}</Fragment>;
}

function renderParagraph(block: PortableTextBlock, index: number) {
  const text = getBlockText(block);
  if (!text) return null;

  return (
    <p key={block._key ?? `paragraph-${index}`} className="text-[0.82rem] text-justify leading-[1.8] text-foreground/85 md:text-[0.95rem]">
      {block.children?.map(renderSpan)}
    </p>
  );
}

function isCompactParagraph(block: PortableTextBlock) {
  if (block.listItem === 'bullet') return false;
  const text = getBlockText(block);
  if (!text || text.length > 40) return false;

  const hasStrongMark = block.children?.some((child) => child.marks?.includes('strong'));
  return !hasStrongMark;
}

export default function RichTextBlocks({value, className}: RichTextBlocksProps) {
  const rendered: ReactNode[] = [];
  let bulletItems: PortableTextBlock[] = [];
  let compactParagraphs: Array<{block: PortableTextBlock; index: number}> = [];

  const flushBullets = (key: string) => {
    if (bulletItems.length === 0) return;

    rendered.push(
      <ul key={key} className="list-disc space-y-2 pl-6 text-foreground/85">
        {bulletItems.map((block, index) => (
          <li key={block._key ?? `bullet-${index}`} className="pl-1 text-[0.82rem] text-justify leading-[1.8] md:text-[0.95rem]">
            {block.children?.map(renderSpan)}
          </li>
        ))}
      </ul>
    );
    bulletItems = [];
  };

  const flushCompactParagraphs = (key: string) => {
    if (compactParagraphs.length === 0) return;

    if (compactParagraphs.length === 1) {
      const [{block, index}] = compactParagraphs;
      const paragraph = renderParagraph(block, index);
      if (paragraph) rendered.push(paragraph);
      compactParagraphs = [];
      return;
    }

    rendered.push(
      <div key={key} className="space-y-1">
        {compactParagraphs.map(({block, index}) => (
          <p key={block._key ?? `compact-${index}`} className="text-[0.82rem] text-justify leading-[1.3] text-foreground/85 md:text-[0.95rem]">
            {block.children?.map(renderSpan)}
          </p>
        ))}
      </div>
    );
    compactParagraphs = [];
  };

  value.forEach((block, index) => {
    if (block.listItem === 'bullet') {
      flushCompactParagraphs(`compact-${index}`);
      bulletItems.push(block);
      return;
    }

    flushBullets(`bullets-${index}`);
    if (isCompactParagraph(block)) {
      compactParagraphs.push({block, index});
      return;
    }

    flushCompactParagraphs(`compact-${index}`);
    const paragraph = renderParagraph(block, index);
    if (paragraph) rendered.push(paragraph);
  });

  flushBullets('bullets-end');
  flushCompactParagraphs('compact-end');

  return <div className={className}>{rendered}</div>;
}
