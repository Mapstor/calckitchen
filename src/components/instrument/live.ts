import { useSyncExternalStore } from "react";

// Tiny shared values: a calculator sets one, the hero instrument (dial, knob) follows it.
type Store = { v: number | null; subs: Set<() => void>; sub: (f: () => void) => () => void };
const stores = new Map<string, Store>();
const get = (key: string) => {
  let s = stores.get(key);
  if (!s) {
    const subs = new Set<() => void>();
    s = {
      v: null,
      subs,
      sub: (f) => {
        subs.add(f);
        return () => {
          subs.delete(f);
        };
      },
    };
    stores.set(key, s);
  }
  return s;
};

export function setLive(key: string, v: number) {
  const s = get(key);
  if (s.v === v) return;
  s.v = v;
  s.subs.forEach((f) => f());
}

export function useLive(key: string, initial: number) {
  const s = get(key);
  return useSyncExternalStore(
    s.sub,
    () => s.v ?? initial,
    () => initial,
  );
}
