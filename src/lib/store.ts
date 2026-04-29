import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Player } from './calc';

type SessionState = {
  players: Player[];
  hasHydrated: boolean;
  addPlayer: (name?: string) => void;
  removePlayer: (id: string) => void;
  rename: (id: string, name: string) => void;
  setBuyIn: (id: string, amount: number) => void;
  addRebuy: (id: string, amount: number) => void;
  setStack: (id: string, amount: number) => void;
  reset: () => void;
};

function newId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      players: [],
      hasHydrated: false,

      addPlayer: (name) =>
        set((s) => ({
          players: [
            ...s.players,
            {
              id: newId(),
              name: name?.trim() || `Player ${s.players.length + 1}`,
              buyIn: 0,
              stack: 0,
            },
          ],
        })),

      removePlayer: (id) =>
        set((s) => ({ players: s.players.filter((p) => p.id !== id) })),

      rename: (id, name) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, name: name.trim() || p.name } : p,
          ),
        })),

      setBuyIn: (id, amount) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, buyIn: Math.max(0, amount) } : p,
          ),
        })),

      addRebuy: (id, amount) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, buyIn: Math.max(0, p.buyIn + amount) } : p,
          ),
        })),

      setStack: (id, amount) =>
        set((s) => ({
          players: s.players.map((p) =>
            p.id === id ? { ...p, stack: Math.max(0, amount) } : p,
          ),
        })),

      reset: () => set({ players: [] }),
    }),
    {
      name: 'pokertools.session',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ players: s.players }),
      onRehydrateStorage: () => (state) => {
        if (state) state.hasHydrated = true;
      },
    },
  ),
);
