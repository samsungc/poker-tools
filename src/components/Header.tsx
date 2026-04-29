import { NavLink } from 'react-router-dom';
import { NAV, SITE } from '../lib/site';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-[var(--color-header)] text-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3 sm:flex-nowrap sm:gap-5 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold tracking-tight">
          <span aria-hidden className="text-[var(--color-accent)]">
            ♠
          </span>
          <span>{SITE.name}</span>
        </NavLink>
        <nav className="order-3 -mx-1 flex flex-1 items-center gap-1 overflow-x-auto sm:order-2 sm:mx-0 sm:justify-center">
          {NAV.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full border-2 px-3.5 py-1 text-sm font-medium leading-none transition-colors ${
                  isActive
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-black'
                    : 'border-white/40 text-white/85 hover:border-white hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="order-2 ml-auto sm:order-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
