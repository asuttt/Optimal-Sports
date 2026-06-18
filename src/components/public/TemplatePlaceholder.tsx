import { cn } from '@/lib/utils';

interface TemplatePlaceholderProps {
  eyebrow?: string;
  title: string;
  description: string;
  className?: string;
}

export function TemplatePlaceholder({
  eyebrow = 'Template Placeholder',
  title,
  description,
  className,
}: TemplatePlaceholderProps) {
  return (
    <div
      className={cn(
        'relative flex h-full min-h-[220px] flex-col justify-end overflow-hidden rounded-2xl border border-dashed border-border bg-gradient-to-br from-card via-card to-background p-5 shadow-sm',
        className
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(56,56,56,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,56,56,0.08) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      <div className="relative space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">{eyebrow}</p>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="max-w-md text-sm leading-relaxed text-foreground/75">{description}</p>
      </div>
    </div>
  );
}
