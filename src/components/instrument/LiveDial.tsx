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
  /** shown before the value, e.g. "$" */
  prefix?: string;
  /** decimals in the readout */
  decimals?: number;
  /** aria-label; the value and suffix are appended */
  label: string;
};

export default function LiveDial({ liveKey, value, suffix, prefix = "", decimals, label, ...rest }: Props) {
  const v = useLive(liveKey, value);
  const shown = `${prefix}${decimals === undefined ? v : v.toFixed(decimals)}`;
  return <Dial {...rest} value={v} readout={shown} readoutUnit={suffix} label={`${label} ${shown}${suffix}`} />;
}
