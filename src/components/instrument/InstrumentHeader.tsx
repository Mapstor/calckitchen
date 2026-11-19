import Link from "next/link";
import { NAV } from "@/data/site-nav";
import { LOGO_SVG } from "./svg";

export default function InstrumentHeader() {
  return (
    <div className="p-top">
      <div className="p-wrap">
        <header className="p-head">
          <Link className="p-logo" href="/">
            <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
            CalcKitchen
          </Link>
          <nav className="p-nav" aria-label="Main">
            {NAV.map((group) => (
              <details className="p-menu" key={group.name}>
                <summary>{group.name}</summary>
                <ul className="p-menu-l">
                  {group.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href}>{l.name}</Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </nav>
        </header>
      </div>
    </div>
  );
}
