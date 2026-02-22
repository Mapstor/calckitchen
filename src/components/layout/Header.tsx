"use client";

import Link from "next/link";
import { useState } from "react";

const categories = [
  {
    name: "Appliance Converters",
    emoji: "🔥",
    links: [
      { name: "Air Fryer Converter", href: "/air-fryer-converter" },
      { name: "Microwave ↔ Oven", href: "/microwave-to-oven-converter" },
      { name: "Slow Cooker ↔ Oven", href: "/slow-cooker-to-oven-converter" },
      { name: "Convection Oven", href: "/convection-oven-converter" },
      { name: "Oven Temperature", href: "/oven-temperature-converter" },
    ],
  },
  {
    name: "Cooking Time",
    emoji: "🥩",
    links: [
      { name: "Meat Cooking Time", href: "/meat-cooking-time-calculator" },
      { name: "Turkey Calculator", href: "/turkey-cooking-calculator" },
      { name: "Meat Temperature Chart", href: "/meat-temperature-chart" },
    ],
  },
  {
    name: "Baking",
    emoji: "🍰",
    links: [
      { name: "Cake Servings", href: "/cake-servings-calculator" },
      { name: "Cake Pan Converter", href: "/cake-pan-converter" },
      { name: "Pizza Dough", href: "/pizza-dough-calculator" },
      { name: "Sourdough", href: "/sourdough-calculator" },
      { name: "Baker's Percentage", href: "/bakers-percentage-calculator" },
    ],
  },
  {
    name: "Recipe Tools",
    emoji: "🍽️",
    links: [
      { name: "Recipe Scaler", href: "/recipe-scaler" },
      { name: "Recipe Cost", href: "/recipe-cost-calculator" },
      { name: "Recipe Macros", href: "/recipe-macro-calculator" },
      { name: "Party Food", href: "/party-food-calculator" },
      { name: "Measurement Converter", href: "/cooking-measurement-converter" },
      { name: "Butter Converter", href: "/butter-converter" },
      { name: "Coffee Ratio", href: "/coffee-ratio-calculator" },
    ],
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🍳</span>
            <span className="font-serif text-xl font-semibold text-gray-900">
              CalcKitchen
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(category.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-coral rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1">
                  <span>{category.emoji}</span>
                  <span>{category.name}</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown */}
                {activeDropdown === category.name && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                    {category.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-coral transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {categories.map((category) => (
              <div key={category.name} className="mb-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-2">
                  <span>{category.emoji}</span>
                  {category.name}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-gray-700 hover:text-coral py-1"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
