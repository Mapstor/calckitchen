// The source register, research/data-sources.csv, read at build time for /about.
// Server-only: it reads the file from disk while the page is prerendered.
import { readFileSync } from "node:fs";
import path from "node:path";
import { ALL_TOOLS } from "@/data/site-nav";

export type RegistryRow = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  retrieved: string;
  usedFor: string;
  pages: { name: string; href: string }[];
  everyPage: boolean;
};

/** RFC 4180 CSV: quoted fields may hold commas, doubled quotes and line breaks. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((f) => f !== "")) rows.push(row);
      row = [];
    } else field += ch;
  }
  row.push(field);
  if (row.some((f) => f !== "")) rows.push(row);
  return rows;
}

export function readRegistry(): RegistryRow[] {
  const text = readFileSync(path.join(process.cwd(), "research", "data-sources.csv"), "utf8");
  const [head, ...body] = parseCsv(text);
  const col = (name: string) => {
    const i = head.indexOf(name);
    if (i < 0) throw new Error(`research/data-sources.csv has no ${name} column`);
    return i;
  };
  const c = { id: col("id"), title: col("title"), publisher: col("publisher"), url: col("url"), retrieved: col("retrieved"), usedFor: col("used_for") };
  return body.map((r) => {
    const usedFor = r[c.usedFor] ?? "";
    const paths = new Set(usedFor.match(/\/[a-z0-9-]+/g) ?? []);
    return {
      id: r[c.id],
      // drop working notes such as "(FDC IDs in research/sources/...)" from the public title
      title: r[c.title].replace(/\s*\([^)]*research\/[^)]*\)/g, "").trim(),
      publisher: r[c.publisher],
      url: r[c.url],
      retrieved: r[c.retrieved],
      usedFor,
      pages: ALL_TOOLS.filter((t) => paths.has(t.href)),
      everyPage: /every page/.test(usedFor),
    };
  });
}

/** Publisher groups for the source list on /about, in display order. A publisher that matches none lands in "Other publishers". */
export const SOURCE_GROUPS: { name: string; match: RegExp }[] = [
  { name: "Government agencies", match: /USDA|U\.S\.|FoodSafety\.gov|National Institute of Standards|European Union/ },
  { name: "University Extension", match: /University/ },
  { name: "Appliance manuals and help pages", match: /GE Appliances|Frigidaire|Hotpoint|Crock-Pot/ },
  { name: "Bakers, food producers and test kitchens", match: /King Arthur|Wilton|Land O'Lakes|America's Test Kitchen|Beef Checkoff/ },
  { name: "Coffee associations", match: /Coffee Association/ },
  { name: "Consumer testing", match: /Which\?/ },
];

export function groupRegistry(rows: RegistryRow[]): { name: string; rows: RegistryRow[] }[] {
  const names = [...SOURCE_GROUPS.map((g) => g.name), "Other publishers"];
  const byName = new Map(names.map((n) => [n, [] as RegistryRow[]]));
  for (const r of rows) {
    const g = SOURCE_GROUPS.find((x) => x.match.test(r.publisher));
    byName.get(g ? g.name : "Other publishers")!.push(r);
  }
  return names.map((name) => ({ name, rows: byName.get(name)! })).filter((g) => g.rows.length > 0);
}
