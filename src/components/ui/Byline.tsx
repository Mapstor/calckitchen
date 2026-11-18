import Image from "next/image";
import Link from "next/link";
import { AUTHOR } from "@/data/author";

// `updated` is the ISO date of a real content change on that page; leave it out when none is logged.
export function Byline({ updated }: { updated?: string }) {
  const date = updated
    ? new Date(`${updated}T12:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })
    : null;
  return (
    <div className="flex items-center gap-3 mb-5 text-sm text-gray-600">
      <Image src={AUTHOR.image} alt="" width={36} height={36} className="rounded-full shrink-0" />
      <p className="leading-snug">
        By{" "}
        <Link href={AUTHOR.href} rel="author" className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-2 hover:decoration-gray-600">
          {AUTHOR.name}, {AUTHOR.credential}
        </Link>
        <span className="text-gray-500">, {AUTHOR.school}</span>
        {date && (
          <>
            <span aria-hidden="true"> · </span>
            Updated <time dateTime={updated}>{date}</time>
          </>
        )}
      </p>
    </div>
  );
}
