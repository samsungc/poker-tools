import Button from './ui/Button';

type Props = {
  onAdd: () => void;
};

export default function EmptyState({ onAdd }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-current/20 px-6 py-16 text-center">
      <div className="text-5xl" aria-hidden>
        🃏
      </div>
      <h2 className="text-xl font-semibold leading-tight tracking-tight">No players yet</h2>
      <p className="max-w-sm text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
        Add everyone at the table to start tracking buy-ins and cashouts.
      </p>
      <Button variant="primary" onClick={onAdd} className="mt-2">
        + Add your first player
      </Button>
    </div>
  );
}
