import type { ReactNode } from 'react';

export function renderSubtitleWithEmphasis(subtitle: string, emphasis: string): ReactNode {
  const safeSubtitle = subtitle || 'TBU';
  const safeEmphasis = emphasis.trim();
  const paragraphs = safeSubtitle.split(/\n\s*\n/);
  let emphasisUsed = false;

  const renderLine = (line: string) => {
    if (!safeEmphasis || emphasisUsed) return line;

    const lowerLine = line.toLowerCase();
    const lowerEmphasis = safeEmphasis.toLowerCase();
    const emphasisStartIndex = lowerLine.indexOf(lowerEmphasis);
    if (emphasisStartIndex < 0) return line;

    const emphasisEndIndex = emphasisStartIndex + safeEmphasis.length;
    const before = line.slice(0, emphasisStartIndex);
    const match = line.slice(emphasisStartIndex, emphasisEndIndex);
    const after = line.slice(emphasisEndIndex);
    emphasisUsed = true;

    return (
      <>
        {before}
        <span className="font-semibold">{match}</span>
        {after}
      </>
    );
  };

  return (
    <>
      {paragraphs.map((paragraph, paragraphIndex) => {
        const lines = paragraph.split('\n');
        return (
          <span
            key={`${paragraph}-${paragraphIndex}`}
            className={paragraphIndex === 0 ? 'block' : 'mt-4 block'}
          >
            {lines.map((line, lineIndex) => (
              <span key={`${line}-${lineIndex}`}>
                {renderLine(line)}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </span>
            ))}
          </span>
        );
      })}
    </>
  );
}
