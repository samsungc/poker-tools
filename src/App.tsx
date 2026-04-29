import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Header from './components/Header';

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1 px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-5xl rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-sm sm:p-8 dark:border-[var(--color-border-dark)] dark:bg-[var(--color-surface-dark)]">
          <Outlet />
        </div>
      </main>
      <Analytics />
    </div>
  );
}
