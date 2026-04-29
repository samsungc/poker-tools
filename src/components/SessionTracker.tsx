import { useMemo, useState } from 'react';
import { totals } from '../lib/calc';
import { useSession } from '../lib/store';
import Button from './ui/Button';
import EmptyState from './EmptyState';
import PlayerRow from './PlayerRow';
import TotalsRow from './TotalsRow';
import ResetDialog from './ResetDialog';
import AmountDialog from './AmountDialog';

export default function SessionTracker() {
  const players = useSession((s) => s.players);
  const addPlayer = useSession((s) => s.addPlayer);
  const removePlayer = useSession((s) => s.removePlayer);
  const rename = useSession((s) => s.rename);
  const setBuyIn = useSession((s) => s.setBuyIn);
  const addRebuy = useSession((s) => s.addRebuy);
  const setStack = useSession((s) => s.setStack);
  const reset = useSession((s) => s.reset);

  const [resetOpen, setResetOpen] = useState(false);
  const [rebuyTargetId, setRebuyTargetId] = useState<string | null>(null);

  const t = useMemo(() => totals(players), [players]);
  const isEmpty = players.length === 0;
  const rebuyTarget = rebuyTargetId
    ? players.find((p) => p.id === rebuyTargetId) ?? null
    : null;

  const handleReset = () => {
    reset();
    setResetOpen(false);
  };

  const handleConfirmRebuy = (amount: number) => {
    if (rebuyTargetId) addRebuy(rebuyTargetId, amount);
    setRebuyTargetId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          Poker Session Tracker
        </h1>
        <div className="flex gap-2">
          <Button variant="primary" onClick={() => addPlayer()}>
            + Add Player
          </Button>
          <Button
            variant="secondary"
            onClick={() => setResetOpen(true)}
            disabled={isEmpty}
          >
            ↻ Reset
          </Button>
        </div>
      </div>

      {isEmpty ? (
        <EmptyState onAdd={() => addPlayer()} />
      ) : (
        <div className="flex flex-col">
          <div className="font-mono-caps mb-1 hidden grid-cols-[2fr_1.4fr_1fr_1fr_auto] gap-3 px-3 pb-2 opacity-60 sm:grid">
            <span>Name</span>
            <span className="text-right">Buy-in</span>
            <span className="text-right">Stack</span>
            <span className="text-right">Net</span>
            <span aria-hidden />
          </div>
          {players.map((p) => (
            <PlayerRow
              key={p.id}
              player={p}
              onRename={rename}
              onSetBuyIn={setBuyIn}
              onSetStack={setStack}
              onAddRebuy={setRebuyTargetId}
              onRemove={removePlayer}
            />
          ))}
          <TotalsRow totals={t} />
        </div>
      )}

      <p className="mt-2 text-center text-xs text-[var(--color-muted)] dark:text-[var(--color-muted-dark)] sm:text-left">
        Net = Stack − Buy-in. Click any number to edit. <span className="font-mono-caps">+ Buy-in</span> prompts for an amount.
      </p>

      <section
        aria-label="About this tool"
        className="border-t border-[var(--color-border)] pt-5 dark:border-[var(--color-border-dark)]"
      >
        <h2 className="mb-1.5 text-sm font-semibold">About the Poker Session Tracker</h2>
        <p className="text-xs leading-relaxed text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
          Track every player's buy-ins, rebuys, and final stack for your home poker game.
          Net profit and loss update live as you enter numbers — no account, no app download,
          and no sign-up needed. Your session data stays in your browser.
        </p>
      </section>

      <ResetDialog
        open={resetOpen}
        onCancel={() => setResetOpen(false)}
        onConfirm={handleReset}
      />
      <AmountDialog
        open={rebuyTarget !== null}
        title={rebuyTarget ? `Add buy-in for ${rebuyTarget.name}` : 'Add buy-in'}
        label="Buy-in amount"
        confirmLabel="Add"
        onCancel={() => setRebuyTargetId(null)}
        onConfirm={handleConfirmRebuy}
      />
    </div>
  );
}
