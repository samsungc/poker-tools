import { useTheme } from '../lib/theme';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex items-center justify-center rounded-full p-2 text-lg text-white/80 transition-colors hover:bg-white/10 hover:text-white"
    >
      <span aria-hidden>{isDark ? '☾' : '☀'}</span>
    </button>
  );
}
