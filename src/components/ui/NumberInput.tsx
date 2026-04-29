import { useEffect, useRef, useState } from 'react';

type Props = {
  value: number;
  onCommit: (n: number) => void;
  prefix?: string;
  className?: string;
  ariaLabel?: string;
  min?: number;
};

export default function NumberInput({
  value,
  onCommit,
  prefix = '$',
  className = '',
  ariaLabel,
  min = 0,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(String(value));
  }, [value, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    const cleaned = draft.replace(/[^0-9.]/g, '');
    const parsed = Number(cleaned);
    const next = Number.isFinite(parsed) ? Math.max(min, parsed) : value;
    onCommit(next);
    setEditing(false);
  };

  const cancel = () => {
    setDraft(String(value));
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') cancel();
        }}
        inputMode="decimal"
        aria-label={ariaLabel}
        className={`w-24 rounded-md border-2 border-[var(--color-border)] dark:border-[var(--color-border-dark)] bg-white dark:bg-[var(--color-surface-dark)] px-3 py-1.5 text-right text-base font-medium tabular-nums leading-none ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      aria-label={ariaLabel}
      className={`inline-flex min-w-24 items-center justify-end rounded-md border-2 border-transparent px-3 py-1.5 text-base font-medium tabular-nums leading-none transition-colors hover:border-[var(--color-border)] hover:bg-black/5 dark:hover:border-[var(--color-border-dark)] dark:hover:bg-white/5 ${className}`}
    >
      {prefix}
      {value}
    </button>
  );
}
