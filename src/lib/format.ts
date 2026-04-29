export function currency(amount: number): string {
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(amount);
  const rounded = Math.round((abs + Number.EPSILON) * 100) / 100;
  const str = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2);
  return `${sign}$${str}`;
}

export function signedCurrency(amount: number): string {
  if (amount === 0) return '$0';
  const sign = amount > 0 ? '+' : '';
  return sign + currency(amount);
}
