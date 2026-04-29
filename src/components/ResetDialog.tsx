import { useEffect, useRef } from 'react';
import Button from './ui/Button';

type Props = {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ResetDialog({ open, onCancel, onConfirm }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    if (open && !dlg.open) dlg.showModal();
    if (!open && dlg.open) dlg.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onCancel}
      onCancel={onCancel}
      className="m-auto rounded-2xl border-2 border-current/20 bg-[var(--color-surface)] p-0 text-[var(--color-text)] shadow-2xl backdrop:bg-black/40 dark:bg-[var(--color-surface-dark)] dark:text-[var(--color-text-dark)]"
    >
      <div className="flex min-w-[280px] max-w-sm flex-col gap-4 p-6">
        <h2 className="text-lg font-semibold tracking-tight leading-tight">Reset session?</h2>
        <p className="text-sm opacity-80">
          This clears every player and their buy-ins. Can't be undone.
        </p>
        <div className="mt-2 flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Reset
          </Button>
        </div>
      </div>
    </dialog>
  );
}
