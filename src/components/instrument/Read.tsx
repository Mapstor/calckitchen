export default function Read({ v, u, c }: { v: string; u?: string; c: string }) {
  return (
    <li className="p-read">
      <span className="p-read-v">
        {v}
        {u && <span className="p-read-u">{u}</span>}
      </span>
      <span className="p-read-c">{c}</span>
    </li>
  );
}
