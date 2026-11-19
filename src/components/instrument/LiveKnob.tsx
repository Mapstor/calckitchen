"use client";

import { useSyncExternalStore } from "react";
import Knob from "./Knob";

// Shared dial setting: the converter writes it, the hero dial turns to it.
let dialF = 350;
const subs = new Set<() => void>();

export function setDial(f: number) {
  if (f === dialF) return;
  dialF = f;
  subs.forEach((s) => s());
}

const subscribe = (s: () => void) => {
  subs.add(s);
  return () => {
    subs.delete(s);
  };
};

export default function LiveKnob() {
  const f = useSyncExternalStore(
    subscribe,
    () => dialF,
    () => 350,
  );
  return <Knob tempF={f} label={`Oven dial turned to ${Math.round(f)}°F`} />;
}
