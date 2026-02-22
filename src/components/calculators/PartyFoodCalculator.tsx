"use client";

import { useState, useMemo, useCallback } from "react";
import {
  StatCard,
  InsightCard,
  ComparisonBarChart,
  MacroPieChart,
  ProgressRing,
  CHART_COLORS,
} from "@/components/charts";

type EventType = "casual" | "formal" | "bbq" | "cocktail" | "wedding" | "kids";
type MealType = "appetizers-only" | "buffet" | "plated" | "heavy-apps";

interface FoodItem {
  id: string;
  name: string;
  category: "protein" | "sides" | "appetizers" | "drinks" | "desserts";
  baseAmountPerPerson: number;
  unit: string;
}

const foodItems: FoodItem[] = [
  // Proteins
  { id: "chicken", name: "Chicken (boneless)", category: "protein", baseAmountPerPerson: 6, unit: "oz" },
  { id: "beef", name: "Beef/Steak", category: "protein", baseAmountPerPerson: 8, unit: "oz" },
  { id: "pork", name: "Pork", category: "protein", baseAmountPerPerson: 6, unit: "oz" },
  { id: "fish", name: "Fish", category: "protein", baseAmountPerPerson: 5, unit: "oz" },
  { id: "shrimp", name: "Shrimp", category: "protein", baseAmountPerPerson: 4, unit: "oz" },
  { id: "ribs", name: "Ribs (bone-in)", category: "protein", baseAmountPerPerson: 16, unit: "oz" },
  { id: "hotdogs", name: "Hot Dogs", category: "protein", baseAmountPerPerson: 2, unit: "pieces" },
  { id: "burgers", name: "Burger Patties", category: "protein", baseAmountPerPerson: 1.5, unit: "pieces" },

  // Sides
  { id: "potatoes", name: "Potatoes/Mashed", category: "sides", baseAmountPerPerson: 5, unit: "oz" },
  { id: "rice", name: "Rice (cooked)", category: "sides", baseAmountPerPerson: 4, unit: "oz" },
  { id: "pasta-salad", name: "Pasta Salad", category: "sides", baseAmountPerPerson: 4, unit: "oz" },
  { id: "green-salad", name: "Green Salad", category: "sides", baseAmountPerPerson: 2, unit: "oz" },
  { id: "coleslaw", name: "Coleslaw", category: "sides", baseAmountPerPerson: 3, unit: "oz" },
  { id: "corn", name: "Corn on the Cob", category: "sides", baseAmountPerPerson: 1, unit: "ear" },
  { id: "beans", name: "Baked Beans", category: "sides", baseAmountPerPerson: 4, unit: "oz" },
  { id: "bread", name: "Rolls/Bread", category: "sides", baseAmountPerPerson: 1.5, unit: "pieces" },

  // Appetizers
  { id: "chips", name: "Chips", category: "appetizers", baseAmountPerPerson: 2, unit: "oz" },
  { id: "dip", name: "Dip/Salsa", category: "appetizers", baseAmountPerPerson: 2, unit: "oz" },
  { id: "cheese", name: "Cheese Board", category: "appetizers", baseAmountPerPerson: 2, unit: "oz" },
  { id: "crackers", name: "Crackers", category: "appetizers", baseAmountPerPerson: 1, unit: "oz" },
  { id: "veggies", name: "Crudités/Veggie Tray", category: "appetizers", baseAmountPerPerson: 3, unit: "oz" },
  { id: "meatballs", name: "Meatballs", category: "appetizers", baseAmountPerPerson: 4, unit: "pieces" },
  { id: "wings", name: "Chicken Wings", category: "appetizers", baseAmountPerPerson: 4, unit: "pieces" },

  // Drinks
  { id: "soft-drinks", name: "Soft Drinks", category: "drinks", baseAmountPerPerson: 2, unit: "cans" },
  { id: "water", name: "Bottled Water", category: "drinks", baseAmountPerPerson: 1.5, unit: "bottles" },
  { id: "beer", name: "Beer", category: "drinks", baseAmountPerPerson: 2, unit: "bottles" },
  { id: "wine", name: "Wine", category: "drinks", baseAmountPerPerson: 0.5, unit: "bottles" },
  { id: "coffee", name: "Coffee", category: "drinks", baseAmountPerPerson: 1.5, unit: "cups" },

  // Desserts
  { id: "cake", name: "Cake", category: "desserts", baseAmountPerPerson: 1, unit: "slice" },
  { id: "cookies", name: "Cookies", category: "desserts", baseAmountPerPerson: 2, unit: "pieces" },
  { id: "pie", name: "Pie", category: "desserts", baseAmountPerPerson: 1, unit: "slice" },
  { id: "ice-cream", name: "Ice Cream", category: "desserts", baseAmountPerPerson: 4, unit: "oz" },
];

const eventMultipliers: Record<EventType, { protein: number; appetizers: number; desserts: number; drinks: number }> = {
  casual: { protein: 1, appetizers: 1, desserts: 1, drinks: 1 },
  formal: { protein: 0.9, appetizers: 1.2, desserts: 1, drinks: 1.2 },
  bbq: { protein: 1.15, appetizers: 0.8, desserts: 0.9, drinks: 1.3 },
  cocktail: { protein: 0.5, appetizers: 1.5, desserts: 0.7, drinks: 1.5 },
  wedding: { protein: 0.85, appetizers: 1.3, desserts: 1.2, drinks: 1.3 },
  kids: { protein: 0.65, appetizers: 0.8, desserts: 1.3, drinks: 0.8 },
};

const durationMultipliers: Record<number, number> = {
  2: 1,
  3: 1.4,
  4: 1.8,
  5: 2.1,
  6: 2.4,
};

const mealTypeMultipliers: Record<MealType, number> = {
  "appetizers-only": 0.6,
  "heavy-apps": 0.8,
  "buffet": 1,
  "plated": 0.9,
};

export default function PartyFoodCalculator() {
  const [guestCount, setGuestCount] = useState<number>(20);
  const [eventType, setEventType] = useState<EventType>("casual");
  const [mealType, setMealType] = useState<MealType>("buffet");
  const [duration, setDuration] = useState<number>(3);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    "chicken", "potatoes", "green-salad", "bread", "chips", "soft-drinks", "cake"
  ]);
  const [showResults, setShowResults] = useState<boolean>(false);

  const resetResults = useCallback(() => setShowResults(false), []);

  const toggleItem = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
    resetResults();
  };

  const results = useMemo(() => {
    const eventMult = eventMultipliers[eventType];
    const durationMult = durationMultipliers[duration] || 1;
    const mealMult = mealTypeMultipliers[mealType];

    return selectedItems.map(itemId => {
      const item = foodItems.find(f => f.id === itemId);
      if (!item) return null;

      let categoryMult = 1;
      if (item.category === "protein") categoryMult = eventMult.protein;
      else if (item.category === "appetizers") categoryMult = eventMult.appetizers;
      else if (item.category === "desserts") categoryMult = eventMult.desserts;
      else if (item.category === "drinks") categoryMult = eventMult.drinks * durationMult;

      const totalAmount = item.baseAmountPerPerson * guestCount * categoryMult * mealMult;

      return {
        ...item,
        totalAmount: Math.ceil(totalAmount),
        perPerson: item.baseAmountPerPerson * categoryMult * mealMult,
      };
    }).filter(Boolean);
  }, [guestCount, eventType, mealType, duration, selectedItems]);

  const categories = ["protein", "sides", "appetizers", "drinks", "desserts"] as const;
  const categoryLabels = {
    protein: "Proteins",
    sides: "Side Dishes",
    appetizers: "Appetizers",
    drinks: "Beverages",
    desserts: "Desserts",
  };

  return (
    <div className="calculator-card p-6 md:p-8">
      <div className="space-y-6">
        {/* Guest Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Guests
          </label>
          <input
            type="number"
            value={guestCount}
            onChange={(e) => { setGuestCount(Number(e.target.value)); resetResults(); }}
            className="input-field w-32"
            min={1}
            max={500}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {[10, 20, 30, 50, 75, 100].map((count) => (
              <button
                key={count}
                onClick={() => { setGuestCount(count); resetResults(); }}
                className={`px-3 py-1 text-sm rounded-full transition-colors ${
                  guestCount === count
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Type
          </label>
          <select
            value={eventType}
            onChange={(e) => { setEventType(e.target.value as EventType); resetResults(); }}
            className="input-field w-full"
          >
            <option value="casual">Casual Party</option>
            <option value="formal">Formal Dinner</option>
            <option value="bbq">BBQ / Cookout</option>
            <option value="cocktail">Cocktail Party</option>
            <option value="wedding">Wedding Reception</option>
            <option value="kids">Kids Birthday Party</option>
          </select>
        </div>

        {/* Meal Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Meal Structure
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { value: "appetizers-only", label: "Apps Only" },
              { value: "heavy-apps", label: "Heavy Apps" },
              { value: "buffet", label: "Buffet" },
              { value: "plated", label: "Plated Dinner" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => { setMealType(option.value as MealType); resetResults(); }}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  mealType === option.value
                    ? "bg-coral text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Duration: {duration} hours
          </label>
          <input
            type="range"
            value={duration}
            onChange={(e) => { setDuration(Number(e.target.value)); resetResults(); }}
            className="w-full"
            min={2}
            max={6}
            step={1}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>2 hrs</span>
            <span>6 hrs</span>
          </div>
        </div>

        {/* Food Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Menu Items
          </label>

          {categories.map((category) => (
            <div key={category} className="mb-4">
              <p className="text-sm font-medium text-gray-600 mb-2">{categoryLabels[category]}</p>
              <div className="flex flex-wrap gap-2">
                {foodItems
                  .filter(item => item.category === category)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                        selectedItems.includes(item.id)
                          ? "bg-coral text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => setShowResults(true)}
          className="btn-primary w-full sm:w-auto"
        >
          Calculate
        </button>

        {/* Results */}
        {showResults && results.length > 0 && (
          <div className="results-panel space-y-6">
            <h3 className="font-serif text-lg font-semibold text-gray-900 mb-4">
              Party Planning Results
            </h3>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <StatCard
                label="Total Guests"
                value={guestCount}
                sublabel={eventType === "kids" ? "Kids party" : `${duration} hour event`}
                color="coral"
              />
              <StatCard
                label="Menu Items"
                value={selectedItems.length}
                sublabel={`${categories.filter(c => results.some(r => r?.category === c)).length} categories`}
                color="blue"
              />
              <StatCard
                label="Event Style"
                value={eventType.charAt(0).toUpperCase() + eventType.slice(1)}
                sublabel={mealType === "buffet" ? "Buffet" : mealType === "plated" ? "Plated" : "Apps"}
                color="green"
              />
              <StatCard
                label="Duration"
                value={`${duration}h`}
                sublabel={duration >= 4 ? "Extended event" : "Standard"}
                color="amber"
              />
            </div>

            {/* Food Distribution Chart */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Menu Breakdown by Category</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ComparisonBarChart
                  data={categories.map((category, idx) => {
                    const categoryResults = results.filter(r => r?.category === category);
                    const colors = [CHART_COLORS.protein, CHART_COLORS.secondary, CHART_COLORS.tertiary, CHART_COLORS.carbs, CHART_COLORS.quaternary];
                    return {
                      name: categoryLabels[category],
                      value: categoryResults.length,
                      fill: colors[idx % colors.length],
                    };
                  }).filter(d => d.value > 0)}
                  height={150}
                  unit=" items"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-sm text-gray-600 mb-2">Event Category Distribution:</p>
                  <div className="space-y-2">
                    {categories.map((category) => {
                      const categoryResults = results.filter(r => r?.category === category);
                      if (categoryResults.length === 0) return null;
                      const percentage = Math.round((categoryResults.length / selectedItems.length) * 100);
                      return (
                        <div key={category} className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-coral rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600 w-20">{categoryLabels[category]}</span>
                          <span className="text-xs font-medium text-gray-900 w-8">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Shopping List */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-coral/10 px-4 py-3 border-b border-gray-200">
                <h4 className="font-medium text-gray-900">Shopping List for {guestCount} Guests</h4>
              </div>
              <div className="p-4 space-y-6">
                {categories.map((category) => {
                  const categoryResults = results.filter(r => r?.category === category);
                  if (categoryResults.length === 0) return null;

                  return (
                    <div key={category}>
                      <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full ${
                          category === "protein" ? "bg-red-500" :
                          category === "sides" ? "bg-green-500" :
                          category === "appetizers" ? "bg-amber-500" :
                          category === "drinks" ? "bg-blue-500" : "bg-purple-500"
                        }`}></span>
                        {categoryLabels[category]}
                      </h4>
                      <div className="bg-gray-50 rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-2 px-3 font-medium text-gray-600">Item</th>
                              <th className="text-right py-2 px-3 font-medium text-gray-600">Per Person</th>
                              <th className="text-right py-2 px-3 font-medium text-gray-600">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categoryResults.map((item) => item && (
                              <tr key={item.id} className="border-b border-gray-100 last:border-0">
                                <td className="py-2 px-3 text-gray-700">{item.name}</td>
                                <td className="py-2 px-3 text-right text-gray-500">
                                  {item.perPerson.toFixed(1)} {item.unit}
                                </td>
                                <td className="py-2 px-3 text-right font-semibold text-coral">
                                  {item.totalAmount} {item.unit}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Planning Timeline */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-medium text-gray-900 mb-3">Party Planning Timeline</h4>
              <div className="space-y-3">
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-16 text-xs font-medium text-blue-800 bg-blue-100 rounded px-2 py-1">
                    1 week
                  </span>
                  <p className="text-sm text-gray-700">Finalize guest count and menu. Order any specialty items.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-16 text-xs font-medium text-blue-800 bg-blue-100 rounded px-2 py-1">
                    3 days
                  </span>
                  <p className="text-sm text-gray-700">Shop for non-perishables, drinks, and dry goods.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-16 text-xs font-medium text-blue-800 bg-blue-100 rounded px-2 py-1">
                    1 day
                  </span>
                  <p className="text-sm text-gray-700">Buy fresh produce, meats, and dairy. Prep what you can.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="flex-shrink-0 w-16 text-xs font-medium text-blue-800 bg-blue-100 rounded px-2 py-1">
                    Day of
                  </span>
                  <p className="text-sm text-gray-700">Final cooking and setup. Chill drinks 2+ hours before.</p>
                </div>
              </div>
            </div>

            {/* Serving Equipment Estimate */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Estimated Serving Equipment</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{Math.ceil(guestCount * 1.5)}</p>
                  <p className="text-gray-600">Plates</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{Math.ceil(guestCount * 2)}</p>
                  <p className="text-gray-600">Napkins</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{Math.ceil(guestCount * 2.5)}</p>
                  <p className="text-gray-600">Cups</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">{Math.ceil(guestCount / 10)}</p>
                  <p className="text-gray-600">Ice Bags (10lb)</p>
                </div>
              </div>
            </div>

            {/* Tips & Insights */}
            <div className="grid gap-3 md:grid-cols-2">
              <InsightCard type="tip" title="Quantity Buffer">
                <ul className="text-sm space-y-1">
                  <li>• Plan 10-15% extra for unexpected guests</li>
                  <li>• Heavy eaters: add 20% more protein</li>
                  <li>• Hot weather: increase drinks by 50%</li>
                </ul>
              </InsightCard>

              <InsightCard type="info" title={`${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event Tips`}>
                <p className="text-sm">
                  {eventType === "casual" && "Casual events are more flexible. Focus on variety over quantity per item."}
                  {eventType === "formal" && "Formal dinners need elegant presentation. Plan for appetizer courses."}
                  {eventType === "bbq" && "BBQs need more protein and drinks. Have backup indoor plans for weather."}
                  {eventType === "cocktail" && "Plan 8-12 appetizer pieces per person over 3+ hours."}
                  {eventType === "wedding" && "Wedding receptions: coordinate with venue for serving equipment."}
                  {eventType === "kids" && "Kids eat less main food but more desserts. Plan simple, familiar items."}
                </p>
              </InsightCard>

              {mealType === "buffet" && (
                <InsightCard type="warning" title="Buffet Considerations">
                  <p className="text-sm">
                    Guests take 20% more at buffets. Keep hot foods above 140°F and cold foods below 40°F.
                    Replenish dishes regularly rather than leaving large quantities out.
                  </p>
                </InsightCard>
              )}

              {duration >= 4 && (
                <InsightCard type="warning" title="Extended Event">
                  <p className="text-sm">
                    For {duration}-hour events, plan for multiple refreshment rounds. Drinks consumption
                    increases significantly. Consider having a snack station available throughout.
                  </p>
                </InsightCard>
              )}
            </div>

            {/* Print/Copy Shopping List */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => {
                  const text = categories.map(category => {
                    const categoryResults = results.filter(r => r?.category === category);
                    if (categoryResults.length === 0) return "";
                    return `${categoryLabels[category]}:\n${categoryResults.map(item =>
                      item ? `  ${item.totalAmount} ${item.unit} - ${item.name}` : ""
                    ).join("\n")}`;
                  }).filter(Boolean).join("\n\n");
                  navigator.clipboard.writeText(`Party Shopping List (${guestCount} guests)\n\n${text}`);
                }}
                className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span>📋</span> Copy Shopping List
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
              >
                <span>🖨️</span> Print List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
