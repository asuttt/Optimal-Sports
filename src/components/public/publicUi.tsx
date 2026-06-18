import {X} from 'lucide-react';
import {cn} from '@/lib/utils';

export const publicActionButtonClassName =
  'public-cta-button inline-flex items-center justify-center rounded-lg px-5 py-3 text-base font-semibold no-underline';

export const publicCloseButtonClassName =
  'inline-flex h-9 w-9 appearance-none items-center justify-center rounded-none border-0 bg-transparent opacity-70 shadow-none transition-opacity hover:bg-transparent hover:opacity-100 focus:outline-none focus:ring-0 focus:ring-offset-0 disabled:pointer-events-none';

interface PublicActionButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

export function PublicActionButton({
  href,
  children,
  className,
  style,
  target,
  rel,
}: PublicActionButtonProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={cn(publicActionButtonClassName, 'bg-primary text-primary-foreground hover:bg-primary/90', className)}
      style={style}
    >
      {children}
    </a>
  );
}

interface PublicCloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

export function PublicCloseButton({
  onClick,
  className,
  ariaLabel = 'Close',
}: PublicCloseButtonProps) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={cn(publicCloseButtonClassName, className)}
    >
      <X className="h-4 w-4" />
    </button>
  );
}
