import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PublicPageHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
  subtitleClassName?: string;
  subtitleWidth?: 'constrained' | 'full';
}

export default function PublicPageHeader({
  title,
  subtitle,
  action,
  className,
  subtitleClassName,
  subtitleWidth = 'constrained',
}: PublicPageHeaderProps) {
  const hasAction = Boolean(action);

  return (
    <section className={cn('public-page-header', hasAction ? 'public-page-header--has-action' : '', className)}>
      <div className="public-page-header-row">
        <h1 className="page-title">{title}</h1>
      </div>
      {action ? <div className="public-page-header-action">{action}</div> : null}
      {subtitle ? (
        <div
          className={cn(
            'public-page-subtitle',
            subtitleWidth === 'full' ? 'public-page-subtitle--full' : '',
            subtitleClassName
          )}
        >
          {subtitle}
        </div>
      ) : null}
    </section>
  );
}
