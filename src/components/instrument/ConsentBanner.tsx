"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Analytics consent for visitors in the EU, EEA, UK and Switzerland (owner, 2026-11-19: "yes for eu").
// Google Analytics there starts with analytics_storage denied (Consent Mode v2 region defaults in the root layout,
// regions decided by Google from the IP); this bar lets the visitor allow or decline, and "Cookie settings" in the
// footer reopens it. The bar is shown when the browser's time zone is European (no IP lookup of our own); a visitor
// elsewhere can still open it from the footer. Raptive's CMP replaces all of this if the site joins Raptive.

export const CONSENT_KEY = "ck-consent";
export const CONSENT_OPEN = "ck-consent-open";

const EU_ZONES = ["Atlantic/Canary", "Atlantic/Madeira", "Atlantic/Azores", "Atlantic/Reykjavik", "Arctic/Longyearbyen", "Africa/Ceuta", "Asia/Nicosia", "Asia/Famagusta"];

type Gtag = (...args: unknown[]) => void;

function setConsent(granted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, granted ? "granted" : "denied");
  } catch {
    // storage blocked: the choice holds for this page view only
  }
  const g = (window as unknown as { gtag?: Gtag }).gtag;
  if (g) g("consent", "update", { analytics_storage: granted ? "granted" : "denied" });
  if (!granted) {
    // a "no" after a "yes": remove the analytics cookies already set (_ga, _ga_<ID>) on this host and its parent domain
    const host = location.hostname;
    const parent = host.split(".").slice(-2).join(".");
    for (const c of document.cookie.split(";")) {
      const name = c.split("=")[0].trim();
      if (!name.startsWith("_ga")) continue;
      for (const d of ["", `; domain=${host}`, `; domain=.${parent}`]) document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`;
    }
  }
}

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(CONSENT_KEY);
    } catch {
      saved = null;
    }
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    const european = tz.startsWith("Europe/") || EU_ZONES.includes(tz);
    // show on the first visit from a European time zone; a stored choice ends it
    const t = window.setTimeout(() => setOpen(european && saved === null), 0);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener(CONSENT_OPEN, reopen);
    };
  }, []);

  if (!open) return null;
  return (
    <div className="p-consent" role="region" aria-label="Analytics cookies">
      <div className="p-wrap p-consent-in">
        <p className="p-consent-t">
          May we count your visit with Google Analytics? It sets cookies so we can see which calculators get used.{" "}
          <Link href="/privacy-policy">Privacy policy</Link>
        </p>
        <div className="p-consent-b">
          <button
            type="button"
            className="p-opt"
            onClick={() => {
              setConsent(false);
              setOpen(false);
            }}
          >
            No thanks
          </button>
          <button
            type="button"
            className="p-opt p-on"
            onClick={() => {
              setConsent(true);
              setOpen(false);
            }}
          >
            Allow
          </button>
        </div>
      </div>
    </div>
  );
}

/** footer button that reopens the consent bar */
export function ConsentLink() {
  return (
    <button type="button" className="p-consent-link" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN))}>
      Cookie settings
    </button>
  );
}
