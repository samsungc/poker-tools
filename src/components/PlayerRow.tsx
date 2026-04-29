import { useEffect, useRef, useState } from 'react';
import type { Player } from '../lib/calc';
import { net } from '../lib/calc';
import { signedCurrency } from '../lib/format';
import NumberInput from './ui/NumberInput';

type Props = {
  player: Player;
  onRename: (id: string, name: string) => void;
  onSetBuyIn: (id: string, n: number) => void;
  onSetStack: (id: string, n: number) => void;
  onAddRebuy: (id: string) => void;
  onRemove: (id: string) => void;
};

function netClasses(n: number): string {
  if (n > 0) return 'text-[var(--color-net-positive)]';
  if (n < 0) return 'text-[var(--color-net-negative)]';
  return 'opacity-70';
}

function NameField({
  player,
  onRename,
}: Pick<Props, 'player' | 'onRename'>) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(player.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!editing) setDraft(player.name);
  }, [player.name, editing]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [editing]);

  const commit = () => {
    onRename(player.id, draft);
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
          if (e.key === 'Escape') {
            setDraft(player.name);
            setEditing(false);
          }
        }}
        aria-label={`Rename ${player.name}`}
        className="w-full rounded-md border-2 border-[var(--color-border)] bg-white px-3 py-1 text-base font-medium leading-none dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-dark)]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      aria-label={`Rename ${player.name}`}
      className="rounded-md border-2 border-transparent px-3 py-1 text-left text-base font-medium leading-none transition-colors hover:border-[var(--color-border)] hover:bg-black/5 dark:hover:border-[var(--color-border-dark)] dark:hover:bg-white/5"
    >
      {player.name}
    </button>
  );
}

function RebuyButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title="Add a buy-in for this player"
      className="font-mono-caps rounded-full border-2 border-current/30 px-2 py-0.5 text-current/70 transition-colors hover:border-current hover:bg-black/5 hover:text-current dark:hover:bg-white/10"
    >
      + Buy-in
    </button>
  );
}

function RemoveButton({ onClick, name }: { onClick: () => void; name: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Remove ${name}`}
      className="rounded-full p-1 text-base font-medium leading-none opacity-50 transition-opacity hover:opacity-100"
    >
      ×
    </button>
  );
}

export default function PlayerRow(props: Props) {
  const {
    player,
    onSetBuyIn,
    onSetStack,
    onAddRebuy,
    onRemove,
  } = props;
  const n = net(player);
  const netClass = netClasses(n);
  const rebuyLabel = `Add buy-in for ${player.name}`;

  return (
    <div className="border-b border-dashed border-current/15 py-3 last:border-b-0">
      {/* Mobile layout */}
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex items-center justify-between gap-2">
          <NameField player={player} onRename={props.onRename} />
          <RemoveButton onClick={() => onRemove(player.id)} name={player.name} />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono-caps opacity-60">Buy-in</span>
            <NumberInput
              value={player.buyIn}
              onCommit={(v) => onSetBuyIn(player.id, v)}
              ariaLabel={`Buy-in for ${player.name}`}
            />
            <RebuyButton
              onClick={() => onAddRebuy(player.id)}
              label={rebuyLabel}
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono-caps opacity-60">Stack</span>
            <NumberInput
              value={player.stack}
              onCommit={(v) => onSetStack(player.id, v)}
              ariaLabel={`Stack for ${player.name}`}
            />
          </div>
          <div className="flex flex-col items-start gap-1">
            <span className="font-mono-caps opacity-60">Net</span>
            <span className={`px-3 py-1 text-base font-medium leading-none ${netClass}`}>
              {signedCurrency(n)}
            </span>
          </div>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:grid sm:grid-cols-[2fr_1.4fr_1fr_1fr_auto] sm:items-center sm:gap-3">
        <NameField player={player} onRename={props.onRename} />
        <div className="flex items-center justify-end gap-2">
          <NumberInput
            value={player.buyIn}
            onCommit={(v) => onSetBuyIn(player.id, v)}
            ariaLabel={`Buy-in for ${player.name}`}
          />
          <RebuyButton
            onClick={() => onAddRebuy(player.id)}
            label={rebuyLabel}
          />
        </div>
        <div className="flex justify-end">
          <NumberInput
            value={player.stack}
            onCommit={(v) => onSetStack(player.id, v)}
            ariaLabel={`Stack for ${player.name}`}
          />
        </div>
        <div className={`text-right text-base font-medium leading-none ${netClass}`}>
          {signedCurrency(n)}
        </div>
        <RemoveButton onClick={() => onRemove(player.id)} name={player.name} />
      </div>
    </div>
  );
}
