import { Link } from 'react-router-dom';
import SeoHead from '../components/SeoHead';

export default function NotFound() {
  return (
    <>
      <SeoHead
        title="Page Not Found"
        description="That page doesn't exist on PokerTools."
        path="/404"
      />
      <section className="flex flex-col items-center gap-4 py-16 text-center">
        <div className="text-5xl text-[var(--color-accent)]">♠</div>
        <h1 className="text-3xl font-semibold tracking-tight">Folded</h1>
        <p className="text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">That page doesn't exist.</p>
        <Link to="/" className="text-sm font-medium underline decoration-[var(--color-accent)] decoration-2 underline-offset-4">
          Back to the Session Tracker
        </Link>
      </section>
    </>
  );
}
