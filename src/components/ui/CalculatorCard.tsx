import Link from "next/link";

interface CalculatorCardProps {
  href: string;
  emoji: string;
  title: string;
  description: string;
}

export default function CalculatorCard({
  href,
  emoji,
  title,
  description,
}: CalculatorCardProps) {
  return (
    <Link
      href={href}
      className="calculator-card p-6 flex flex-col items-start hover:scale-[1.02] transition-transform duration-200 group"
    >
      <span className="text-3xl mb-3">{emoji}</span>
      <h3 className="font-serif font-semibold text-lg text-gray-900 group-hover:text-coral transition-colors mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
    </Link>
  );
}
