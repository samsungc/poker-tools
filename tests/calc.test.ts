import { describe, expect, it } from 'vitest';
import { net, totals } from '../src/lib/calc';
import { currency, signedCurrency } from '../src/lib/format';

describe('calc.net', () => {
  it('returns stack - buyIn', () => {
    expect(net({ buyIn: 100, stack: 180 })).toBe(80);
  });

  it('handles loss', () => {
    expect(net({ buyIn: 200, stack: 60 })).toBe(-140);
  });

  it('handles zero stack', () => {
    expect(net({ buyIn: 100, stack: 0 })).toBe(-100);
  });

  it('handles zero buy-in (player added but didn\'t buy in yet)', () => {
    expect(net({ buyIn: 0, stack: 0 })).toBe(0);
  });
});

describe('calc.totals', () => {
  it('returns zeros for empty list', () => {
    expect(totals([])).toEqual({ buyIn: 0, stack: 0, net: 0 });
  });

  it('sums buy-ins, stacks, and net for the mockup scenario', () => {
    const players = [
      { id: 'a', name: 'samson', buyIn: 200, stack: 180 },
      { id: 'b', name: 'daniel', buyIn: 100, stack: 60 },
      { id: 'c', name: 'maya', buyIn: 300, stack: 220 },
    ];
    const t = totals(players);
    expect(t.buyIn).toBe(600);
    expect(t.stack).toBe(460);
    expect(t.net).toBe(-140);
  });

  it('balanced game has zero net total', () => {
    const players = [
      { id: 'a', name: 'a', buyIn: 100, stack: 50 },
      { id: 'b', name: 'b', buyIn: 100, stack: 150 },
    ];
    expect(totals(players).net).toBe(0);
  });
});

describe('format.currency', () => {
  it('formats integers without decimals', () => {
    expect(currency(100)).toBe('$100');
    expect(currency(0)).toBe('$0');
  });

  it('formats negatives with leading minus', () => {
    expect(currency(-50)).toBe('-$50');
  });

  it('preserves cents when present', () => {
    expect(currency(12.5)).toBe('$12.50');
    expect(currency(99.99)).toBe('$99.99');
  });

  it('rounds to 2 decimals', () => {
    expect(currency(1.005)).toBe('$1.01');
  });
});

describe('format.signedCurrency', () => {
  it('shows + for positives', () => {
    expect(signedCurrency(100)).toBe('+$100');
  });

  it('shows - for negatives', () => {
    expect(signedCurrency(-50)).toBe('-$50');
  });

  it('shows $0 for zero with no sign', () => {
    expect(signedCurrency(0)).toBe('$0');
  });
});
