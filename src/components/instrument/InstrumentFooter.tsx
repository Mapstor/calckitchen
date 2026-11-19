import Link from "next/link";
import { LOGO_SVG } from "./svg";
import { ConsentLink } from "./ConsentBanner";

export default function InstrumentFooter() {
  return (
    <footer className="p-foot">
      <div className="p-wrap p-foot-in">
        <Link className="p-logo" href="/">
          <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
          CalcKitchen
        </Link>
        <nav className="p-foot-nav" aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy-policy">Privacy policy</Link>
          <Link href="/terms-of-use">Terms of use</Link>
          <ConsentLink />
        </nav>
        <p className="p-copy">© 2026 CalcKitchen</p>
      </div>
    </footer>
  );
}
