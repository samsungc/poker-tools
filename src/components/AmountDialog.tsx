import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import Button from './ui/Button';

type Props = {
  open: boolean;
  title: string;
  label?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: (amount: number) => void;
};

export default function AmountDialog({
  open,
  title,
  label = 'Amount',
  confirmLabel = 'Add',
  onCancel,
  onConfirm,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) {
      setDraft('');
      setError(false);
      dlg.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    if (!open && dlg.open) dlg.close();
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = draft.trim().replace(/[^0-9.\-]/g, '');
    const n = Number(cleaned);
    if (!Number.isFinite(n) || n === 0) {
      setError(true);
      inputRef.current?.focus();
      return;
    }
    onConfirm(n);
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onCancel={onCancel}
      className="m-auto rounded-2xl border-2 border-current/20 bg-[var(--color-surface)] p-0 text-[var(--color-text)] shadow-2xl backdrop:bg-black/40 dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-dark)]"
    >
      <form onSubmit={submit} className="flex min-w-[280px] max-w-sm flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold leading-tight tracking-tight">{title}</h2>
        <label className="flex flex-col gap-2 text-sm">
          <span>{label}</span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-base text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              $
            </span>
            <input
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (error) setError(false);
              }}
              placeholder="0"
              className={`w-full rounded-md border-2 bg-white px-3 py-2 pl-7 text-base font-medium tabular-nums dark:bg-[var(--color-surface-dark)] ${
                error
                  ? 'border-[var(--color-net-negative)]'
                  : 'border-[var(--color-border)] dark:border-[var(--color-border-dark)]'
              }`}
            />
          </div>
          {error ? (
            <span className="text-xs text-[var(--color-net-negative)]">
              Enter a non-zero amount.
            </span>
          ) : (
            <span className="text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
              Use a negative number to undo a buy-in.
            </span>
          )}
        </label>
        <div className="mt-2 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {confirmLabel}
          </Button>
        </div>
      </form>
    </dialog>
  );
}
