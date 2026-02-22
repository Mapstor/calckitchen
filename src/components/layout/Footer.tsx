import Link from "next/link";

const calculatorLinks = [
  { name: "Air Fryer Converter", href: "/air-fryer-converter" },
  { name: "Meat Cooking Time", href: "/meat-cooking-time-calculator" },
  { name: "Turkey Calculator", href: "/turkey-cooking-calculator" },
  { name: "Recipe Scaler", href: "/recipe-scaler" },
  { name: "Cake Servings", href: "/cake-servings-calculator" },
  { name: "Pizza Dough", href: "/pizza-dough-calculator" },
];

const moreTools = [
  { name: "Microwave ↔ Oven", href: "/microwave-to-oven-converter" },
  { name: "Slow Cooker ↔ Oven", href: "/slow-cooker-to-oven-converter" },
  { name: "Convection Oven", href: "/convection-oven-converter" },
  { name: "Measurement Converter", href: "/cooking-measurement-converter" },
  { name: "Butter Converter", href: "/butter-converter" },
  { name: "Coffee Ratio", href: "/coffee-ratio-calculator" },
];

const siteLinks = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms of Use", href: "/terms-of-use" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🍳</span>
              <span className="font-serif text-xl font-semibold text-gray-900">
                CalcKitchen
              </span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Kitchen Math, Solved. Free calculators for cooking, baking, and
              meal planning.
            </p>
            <p className="text-xs text-gray-500">
              Built with data from USDA and FoodSafety.gov
            </p>
          </div>

          {/* Popular Calculators */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">
              Popular Calculators
            </h3>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-coral transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Tools */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">More Tools</h3>
            <ul className="space-y-2">
              {moreTools.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-coral transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Site</h3>
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-coral transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-100 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} CalcKitchen. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            All cooking times are estimates. Always use a food thermometer for
            safety.
          </p>
        </div>
      </div>
    </footer>
  );
}
