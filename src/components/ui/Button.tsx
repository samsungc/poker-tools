import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#1A1A1A] border-black/80 dark:border-black/80',
  secondary:
    'bg-[var(--color-surface)] dark:bg-[var(--color-surface-dark)] text-[var(--color-text)] dark:text-[var(--color-text-dark)] border-[var(--color-border)] dark:border-[var(--color-border-dark)] hover:bg-black/5 dark:hover:bg-white/5',
  ghost:
    'bg-transparent border-transparent hover:bg-black/5 dark:hover:bg-white/10 text-current',
  danger:
    'bg-transparent border-[var(--color-net-negative)] text-[var(--color-net-negative)] hover:bg-[var(--color-net-negative)]/10',
};

export default function Button({
  variant = 'secondary',
  className = '',
  ...rest
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-medium leading-none transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${className}`}
      {...rest}
    />
  );
}
