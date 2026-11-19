"use client";

import Dial from "./Dial";
import { useLive } from "./live";

type Props = {
  liveKey: string;
  min: number;
  max: number;
  major: number;
  minor: number;
  value: number;
  marks?: number[];
  unit?: string;
  /** readout shows the value followed by this, e.g. "°F" */
  suffix: string;
  /** aria-label; the value and suffix are appended */
  label: string;
};

export default function LiveDial({ liveKey, value, suffix, label, ...rest }: Props) {
  const v = useLive(liveKey, value);
  return <Dial {...rest} value={v} readout={String(v)} readoutUnit={suffix} label={`${label} ${v}${suffix}`} />;
}
