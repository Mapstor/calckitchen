"use client";

import Knob from "./Knob";
import { setLive, useLive } from "./live";

export const setDial = (f: number) => setLive("oven", f);

export default function LiveKnob({ initial = 350 }: { initial?: number }) {
  const f = useLive("oven", initial);
  return <Knob tempF={f} label={`Oven dial turned to ${Math.round(f)}°F`} />;
}
