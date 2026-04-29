type Props = {
  emoji: string;
  title: string;
  blurb: string;
  features: string[];
};

export default function ComingSoon({ emoji, title, blurb, features }: Props) {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center gap-5 px-6 py-16 text-center">
      <div className="text-5xl">{emoji}</div>
      <h1 className="text-3xl font-semibold tracking-tight leading-tight">{title}</h1>
      <p className="max-w-md text-base leading-snug text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">{blurb}</p>
      <ul className="mt-2 flex flex-col gap-1.5 text-sm text-[var(--color-muted)] dark:text-[var(--color-muted-dark)]">
        {features.map((f) => (
          <li key={f} className="before:mr-2 before:content-['✓']">
            {f}
          </li>
        ))}
      </ul>
      <p className="font-mono-caps mt-6 rounded-full border-2 border-current px-4 py-1 opacity-60">
        Coming soon
      </p>
    </section>
  );
}
