export type Player = {
  id: string;
  name: string;
  buyIn: number;
  stack: number;
};

export type Totals = {
  buyIn: number;
  stack: number;
  net: number;
};

export function net(player: Pick<Player, 'buyIn' | 'stack'>): number {
  return player.stack - player.buyIn;
}

export function totals(players: Player[]): Totals {
  let buyIn = 0;
  let stack = 0;
  for (const p of players) {
    buyIn += p.buyIn;
    stack += p.stack;
  }
  return { buyIn, stack, net: stack - buyIn };
}
