import type { Totals } from '../lib/calc';
import { currency, signedCurrency } from '../lib/format';

type Props = {
  totals: Totals;
};

function netClasses(n: number): string {
  if (n > 0) return 'text-[var(--color-net-positive)]';
  if (n < 0) return 'text-[var(--color-net-negative)]';
  return 'opacity-70';
}

export default function TotalsRow({ totals }: Props) {
  const netClass = netClasses(totals.net);

  return (
    <div className="border-t-2 border-current/30 pt-3 mt-1">
      {/* Mobile */}
      <div className="grid grid-cols-3 gap-3 sm:hidden">
        <div className="flex flex-col gap-1">
          <span className="font-mono-caps opacity-60">Total Buy-in</span>
          <span className="px-3 text-base font-semibold tabular-nums leading-none">
            {currency(totals.buyIn)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono-caps opacity-60">Total Stack</span>
          <span className="px-3 text-base font-semibold tabular-nums leading-none">
            {currency(totals.stack)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono-caps opacity-60">Total Net</span>
          <span className={`px-3 text-base font-semibold tabular-nums leading-none ${netClass}`}>
            {signedCurrency(totals.net)}
          </span>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid sm:grid-cols-[2fr_1.4fr_1fr_1fr_auto] sm:items-center sm:gap-3">
        <div className="px-3 text-base font-semibold tabular-nums leading-none">Totals</div>
        <div className="px-3 text-right text-base font-semibold tabular-nums leading-none">
          {currency(totals.buyIn)}
        </div>
        <div className="px-3 text-right text-base font-semibold tabular-nums leading-none">
          {currency(totals.stack)}
        </div>
        <div className={`px-3 text-right text-base font-semibold tabular-nums leading-none ${netClass}`}>
          {signedCurrency(totals.net)}
        </div>
        <div />
      </div>
    </div>
  );
}
