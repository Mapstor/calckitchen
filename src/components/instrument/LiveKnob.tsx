"use client";

import Knob from "./Knob";
import { setLive, useLive } from "./live";

export const setDial = (f: number) => setLive("oven", f);

export default function LiveKnob() {
  const f = useLive("oven", 350);
  return <Knob tempF={f} label={`Oven dial turned to ${Math.round(f)}°F`} />;
}
