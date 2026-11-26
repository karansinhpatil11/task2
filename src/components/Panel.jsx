import { card, muted } from './ui.js';

export default function Panel({ icon, title, body, children }) {
  return (
    <section className={`${card} px-6 py-14 flex flex-col items-center text-center gap-3`}>
      {icon}
      <h2 className="text-xl font-bold">{title}</h2>
      <p className={`max-w-md text-sm leading-relaxed ${muted}`}>{body}</p>
      <div className="flex flex-wrap justify-center gap-3 mt-2">{children}</div>
    </section>
  );
}
