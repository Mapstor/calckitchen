import Link from "next/link";
import type { ReactNode } from "react";
import { AUTHOR } from "@/data/author";

export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

export function fmtDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function Byline({ updated }: { updated: string }) {
  return (
    <p className="p-by">
      By{" "}
      <Link href={AUTHOR.href} rel="author">
        {AUTHOR.name}, {AUTHOR.credential}
      </Link>
      , {AUTHOR.school} ·{" "}
      <span className="p-nb">
        Updated <time dateTime={updated}>{fmtDate(updated)}</time>
      </span>
    </p>
  );
}

export function Hero({
  visual,
  crumb,
  h1,
  answer,
  sub,
  updated,
  long,
  children,
}: {
  visual: ReactNode;
  crumb: ReactNode;
  h1: string;
  answer: ReactNode;
  sub?: ReactNode;
  updated: string;
  /** answer runs to three lines: smaller type, looser lines */
  long?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className="p-hero">
      <div className="p-wrap">
        <div className="p-hgrid">
          {visual}
          <div className="p-htext">
            <nav className="p-crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link> / {crumb}
            </nav>
            <h1 className="p-h1">{h1}</h1>
            <p className={long ? "p-answer p-answer-long" : "p-answer"}>{answer}</p>
            {sub && <p className="p-sub">{sub}</p>}
            <Byline updated={updated} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export type MoreLink = { href: string; title: string };

export function Main({ more, children }: { more: MoreLink[]; children: ReactNode }) {
  return (
    <div className="p-wrap">
      <div className="p-main">
        <div className="p-content">{children}</div>
        <aside className="p-rail" aria-label="More calculators">
          <div className="p-rail-in">
            <nav className="p-rel" aria-label="More calculators">
              <h2 className="p-rel-h">More calculators</h2>
              <ul className="p-rel-l">
                {more.map((m) => (
                  <li key={m.href}>
                    <Link href={m.href}>{m.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function Sec({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <>
      <div className="p-ruler" />
      <section id={id}>
        <h2 className="p-h2">{title}</h2>
        {children}
      </section>
    </>
  );
}

export function Table({ label, head, rows, hi }: { label: string; head: ReactNode[]; rows: ReactNode[][]; hi?: number }) {
  return (
    <div className="p-tbox" role="region" aria-label={label} tabIndex={0}>
      <table className="p-table">
        <thead>
          <tr>
            {head.map((h, i) => (
              <th scope="col" key={i}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i === hi ? "p-tr-hi" : undefined}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type QA = { question: string; answer: string };

export function Faq({ faqs }: { faqs: QA[] }) {
  return (
    <Sec title="Frequently asked questions">
      {faqs.map((f) => (
        <div key={f.question}>
          <h3 className="p-faq-q">{f.question}</h3>
          <p className="p-p">{f.answer}</p>
        </div>
      ))}
    </Sec>
  );
}

export type Source = { href: string; title: string; by: string };

export function Sources({ items }: { items: Source[] }) {
  return (
    <section className="p-src">
      <h2 className="p-src-h">Sources</h2>
      <ul className="p-src-l">
        {items.map((s) => (
          <li key={s.href}>
            <a href={s.href} {...ext}>
              {s.title}
            </a>
            , {s.by}
          </li>
        ))}
      </ul>
    </section>
  );
}
