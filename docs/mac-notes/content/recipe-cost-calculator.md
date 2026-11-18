# Recipe Cost Calculator — Price Per Serving

**Title Tag:** Recipe Cost Calculator — Cost Per Serving & Food Cost % | CalcKitchen
**Meta Description:** Calculate the true cost of any recipe. Enter ingredients and prices to get cost per serving, total recipe cost, and food cost percentage for food businesses.
**URL:** /recipe-cost-calculator

---

Most home cooks have no idea what their meals actually cost. You buy groceries in bulk, use a portion for one recipe and the rest for another, and by the end of the month, you've spent $800 with no real picture of where it went. Recipe costing fixes this. It breaks down exactly what each dish costs per serving — and the results are often surprising. That "expensive" salmon dinner might cost $4.50 per serving, while the "cheap" taco night costs $3.80 once you add up the avocados, sour cream, cheese, salsa, and tortillas.

For food business owners — restaurants, bakeries, caterers, meal prep services — recipe costing isn't optional, it's survival. Your food cost percentage (ingredient cost as a share of menu price) is the metric that determines whether you're profitable. The industry target is 28–35% for restaurants and 20–25% for bakeries. If you don't know your food cost to the penny, you're flying blind.

Our Recipe Cost Calculator handles both use cases. Enter your ingredients, their prices, and the quantities used, and get total recipe cost, cost per serving, and food cost percentage. It does the unit math (you bought a 5 lb bag but only used 2 cups) so you don't have to.

---

## [CALCULATOR PLACEMENT]

**Calculator Spec:**

**Inputs:**
- Recipe name (text, optional)
- Number of servings (numeric, 1–100)
- Ingredient rows (add/remove dynamically, minimum 1):
  - Ingredient name (text)
  - Amount used in recipe (numeric) + unit dropdown (g, kg, oz, lb, cup, tbsp, tsp, each, ml, L)
  - Package price (currency, $)
  - Package size (numeric) + unit dropdown (same unit options)
- Optional: Menu/selling price (currency, $ — enables food cost percentage output)
- Optional: Labor and overhead multiplier (for food businesses — default 1× / off)

**Outputs:**
- **Per ingredient:** Cost per unit, cost used in recipe
- **Recipe totals:** Total recipe cost, Cost per serving
- **Business metrics (if menu price entered):** Food cost percentage, Suggested price range at 28%, 30%, 33%, 35% food cost
- **Summary table:** All ingredients ranked by cost contribution (highest to lowest)
- **Visual:** Pie chart showing ingredient cost breakdown by percentage

**Calculation logic:**
```
cost_per_unit = package_price / package_size
ingredient_cost = amount_used × cost_per_unit
total_recipe_cost = Σ(all ingredient_costs)
cost_per_serving = total_recipe_cost / num_servings
food_cost_pct = (total_recipe_cost / menu_price) × 100
suggested_price = total_recipe_cost / target_food_cost_pct
```

**Unit conversion handling:** When the "amount used" unit differs from the "package size" unit (e.g., used 2 cups of flour from a 5 lb bag), the calculator converts internally using standard cooking conversions (1 cup all-purpose flour ≈ 120g, 1 lb = 453.6g, etc.). Display a note when conversion is applied.

**Save/recall feature:** Allow users to save ingredient prices in a local database (browser localStorage) so they don't have to re-enter common ingredient prices each time. Pre-populated common ingredient prices (US average) as optional starting values.

---

## How Recipe Costing Works

The fundamental formula is straightforward. You paid $3.49 for a 5 lb bag of flour. Your recipe uses 2 cups of flour (about 240g, or 0.53 lbs). The cost of flour in your recipe is:

$3.49 ÷ 5 lbs = $0.698 per lb × 0.53 lbs = **$0.37**

Repeat this for every ingredient, sum the results, and divide by servings. That's your cost per serving.

Where it gets tricky is unit math. You buy milk by the gallon, use it by the cup. You buy spices by the jar, use them by the teaspoon. You buy chicken by the pound, measure it by the breast. The calculator handles all of this, but understanding the math helps you spot when something looks off.

### Common Unit Conversions for Costing

| Ingredient | Package Unit | Recipe Unit | Conversion |
|-----------|-------------|-------------|------------|
| All-purpose flour | 5 lb bag | cups | 1 lb = 3.6 cups (17.6 cups per bag) |
| Granulated sugar | 4 lb bag | cups | 1 lb = 2.25 cups (9 cups per bag) |
| Butter | 1 lb (4 sticks) | tbsp | 1 stick = 8 tbsp (32 tbsp per lb) |
| Milk | 1 gallon | cups | 1 gallon = 16 cups |
| Olive oil | 500 ml bottle | tbsp | 1 tbsp = 15 ml (~33 tbsp per bottle) |
| Eggs | dozen | each | 12 per package |
| Rice | 2 lb bag | cups dry | 1 lb = 2.4 cups (4.8 cups per bag) |
| Chicken breast | per lb | per breast | 1 breast ≈ 6–8 oz |
| Salt | 26 oz container | tsp | 1 tsp = ~6g (~124 tsp per container) |
| Black pepper | 2 oz jar | tsp | 1 tsp = ~2.3g (~25 tsp per jar) |

---

## Food Cost Percentage: The Key Metric for Food Businesses

If you run a food business — restaurant, bakery, food truck, catering company, meal prep service — food cost percentage is the number that tells you whether your pricing makes sense.

**Food cost percentage** = (Total ingredient cost ÷ Menu/selling price) × 100

A $12 pasta dish that costs $3.60 in ingredients has a 30% food cost. That means 30 cents of every dollar goes to ingredients, leaving 70 cents for labor, rent, utilities, packaging, and profit.

### Industry Benchmarks

| Business Type | Target Food Cost % | Notes |
|--------------|-------------------|-------|
| Full-service restaurant | 28–35% | Higher for premium ingredients; 30% is the sweet spot |
| Fast casual | 25–32% | Lower check averages require tighter margins |
| Bakery / pastry | 20–25% | Flour, sugar, butter are cheap; labor is the real cost |
| Pizza shop | 25–30% | Dough is very cheap; cheese is the biggest cost driver |
| Catering | 30–35% | Higher volume compensates for slightly higher food cost |
| Food truck | 28–32% | Low overhead means you can tolerate slightly higher food cost |
| Meal prep / delivery | 35–45% | Packaging, delivery, and food loss push this higher |
| Coffee shop (beverages) | 12–18% | Milk is the biggest cost; coffee beans are surprisingly cheap per cup. Use our [Coffee Ratio Calculator](/coffee-ratio-calculator) to dial in the right dose per cup. |
| Bar (alcohol) | 18–24% | Liquor pours have the best margins; beer/wine 24–28% |

### How to Price a Menu Item

Start with your recipe cost and work backward:

**Menu price = Recipe cost ÷ Target food cost %**

If your chicken parmesan costs $4.20 in ingredients and you want a 30% food cost:

$4.20 ÷ 0.30 = **$14.00 menu price**

Most restaurants then round to a psychologically appealing price point ($13.95 or $14.50) and cross-check against competitor pricing and perceived value.

### The Real Cost Beyond Ingredients

Food cost percentage only captures raw ingredients. The total cost of putting a dish on someone's plate includes:

- **Waste and spoilage:** Budget an additional 3–8% above your raw ingredient cost for trim waste, prep waste, and spoiled inventory. Perishable-heavy menus (seafood, fresh produce) are at the high end.
- **Labor:** Prep time, cooking time, plating. A 30-minute-per-serving dish needs a very different price point than an assemble-and-serve dish.
- **Overhead:** Rent, utilities, equipment, insurance, licenses. Typically 20–30% of revenue for restaurants.
- **Packaging:** For takeout, delivery, and meal prep businesses, packaging can add $0.50–$2.00 per serving.

A rule of thumb for full-service restaurants: multiply your food cost by 3–3.5× to arrive at menu price. This roughly covers food (30%), labor (30%), overhead (25%), and profit (15%).

---

## How to Use the Calculator: 5 Worked Examples

### Example 1: Home Cook — Chicken Stir-Fry (4 Servings)

A weeknight dinner to understand real cost per plate.

| Ingredient | Amount Used | Package Price | Package Size | Ingredient Cost |
|-----------|------------|---------------|-------------|----------------|
| Chicken breast | 1.5 lbs | $8.99 | 3 lb pack | $4.50 |
| Jasmine rice | 2 cups dry | $4.49 | 5 lb bag | $0.94 |
| Broccoli | 2 cups | $2.49 | 1 lb bag | $1.56 |
| Soy sauce | 3 tbsp | $3.29 | 15 oz bottle | $0.33 |
| Sesame oil | 1 tbsp | $5.99 | 8.45 oz bottle | $0.36 |
| Garlic (3 cloves) | 3 cloves | $0.50 | 1 head (~10 cloves) | $0.15 |
| Ginger | 1 inch | $0.79 | 1 piece | $0.20 |
| Vegetable oil | 2 tbsp | $3.99 | 48 oz bottle | $0.08 |

| Metric | Value |
|--------|-------|
| **Total recipe cost** | **$8.12** |
| **Cost per serving** | **$2.03** |

This is cheaper than virtually any restaurant or takeout equivalent, which would charge $12–15 for the same dish.

### Example 2: Food Business — Bakery Chocolate Chip Cookies (48 Cookies)

A baker pricing cookies for a farmers market at $2.50 each.

| Ingredient | Amount Used | Package Price | Package Size | Ingredient Cost |
|-----------|------------|---------------|-------------|----------------|
| All-purpose flour | 3 cups (360g) | $3.49 | 5 lbs (2268g) | $0.55 |
| Butter | 1 cup (2 sticks) | $5.49 | 1 lb (4 sticks) | $2.75 |
| Granulated sugar | 3/4 cup | $4.29 | 4 lbs | $0.23 |
| Brown sugar | 3/4 cup | $3.79 | 2 lbs | $0.32 |
| Eggs | 2 large | $3.99 | dozen | $0.67 |
| Chocolate chips | 2 cups (12 oz) | $3.49 | 12 oz bag | $3.49 |
| Vanilla extract | 1 tsp | $8.99 | 4 oz bottle | $0.37 |
| Baking soda | 1 tsp | $1.29 | 16 oz box | $0.01 |
| Salt | 1 tsp | $1.49 | 26 oz | $0.01 |

| Metric | Value |
|--------|-------|
| **Total recipe cost** | **$8.40** |
| **Cost per cookie** | **$0.18** |
| **Selling price per cookie** | **$2.50** |
| **Food cost %** | **7%** |

A 7% food cost is extremely healthy for a bakery. Even at $1.50 per cookie, the food cost would be only 12%. The real cost here is labor — the time to mix, portion, bake, cool, and package.

### Example 3: Restaurant — Pasta Carbonara (1 Serving, Plated)

Costing a single restaurant portion for menu pricing.

| Ingredient | Amount Used | Package Price | Package Size | Ingredient Cost |
|-----------|------------|---------------|-------------|----------------|
| Spaghetti | 4 oz dry | $1.89 | 16 oz box | $0.47 |
| Guanciale | 3 oz | $12.99 | 12 oz pack | $3.25 |
| Eggs (yolks only, 3) | 3 yolks | $3.99 | dozen | $1.00 |
| Pecorino Romano | 1 oz grated | $8.99 | 8 oz wedge | $1.12 |
| Black pepper | 1/2 tsp | $6.99 | 2 oz jar | $0.14 |

| Metric | Value |
|--------|-------|
| **Total plate cost** | **$5.98** |
| **Target food cost: 30%** | **Menu price: $19.93 → price at $19.95** |
| **Target food cost: 33%** | **Menu price: $18.12 → price at $17.95** |
| **Actual food cost at $18.95** | **31.6%** |

The guanciale alone is 54% of the ingredient cost. If you substitute pancetta (~$7.99/12 oz), the plate cost drops to $4.32 and a $16.95 price point hits 25.5% food cost.

### Example 4: Meal Prep — Weekly Prep for One (5 Lunches)

A budget-conscious meal prepper calculating their weekly lunch cost.

| Ingredient | Amount Used | Package Price | Package Size | Ingredient Cost |
|-----------|------------|---------------|-------------|----------------|
| Chicken thighs (boneless) | 2.5 lbs | $6.99 | 3 lb pack | $5.83 |
| Brown rice | 2.5 cups dry | $3.29 | 2 lb bag | $1.06 |
| Broccoli | 1.5 lbs | $2.49 | 1 lb bag | $3.74 |
| Sweet potatoes | 2 lbs | $1.49 | per lb | $2.98 |
| Olive oil | 2 tbsp | $7.99 | 500 ml | $0.48 |
| Seasonings (garlic powder, paprika, cumin) | 3 tsp total | ~$3.50 avg/jar | ~50 tsp per jar | $0.21 |
| Meal prep containers (5) | 5 | $8.99 | 15-pack | $3.00 |

| Metric | Value |
|--------|-------|
| **Total weekly cost** | **$17.30** |
| **Cost per lunch** | **$3.46** |

Compare that to buying lunch: even a modest $10 lunch five days a week costs $50. Meal prepping saves about $32 per week — over $1,600 per year.

### Example 5: Caterer — Wedding Appetizer Spread (50 Guests)

Costing the appetizer course of a wedding catering job quoting $35/person.

| Item | Amount | Package Price | Total Cost |
|------|--------|---------------|------------|
| Shrimp cocktail (5 per person) | 250 shrimp (15 lbs) | $8.99/lb | $134.85 |
| Cheese board (2 oz per person) | 6.25 lbs cheese | $7.99/lb avg | $49.94 |
| Crackers & bread | 5 lbs assorted | $4.29/box × 8 | $34.32 |
| Bruschetta (3 per person) | 150 pieces (8 baguettes) | $3.49/baguette | $27.92 |
| Toppings (tomatoes, basil, garlic, olive oil) | Various | — | $18.50 |
| Fruit display (3 pieces per person) | 15 lbs fruit | $2.99/lb avg | $44.85 |
| Cocktail napkins, picks, plates | 50 guests | — | $25.00 |

| Metric | Value |
|--------|-------|
| **Total appetizer cost** | **$335.38** |
| **Cost per guest** | **$6.71** |
| **Revenue (apps portion, ~30% of $35)** | **$10.50/guest** |
| **Food cost % (apps only)** | **63.9%** |

A 64% food cost on appetizers is high. The caterer needs the main course and dessert to have lower food costs (target 25–30%) to bring the overall food cost for the event to 35%. Shrimp cocktail is the biggest cost driver — switching to a less premium appetizer would dramatically change the math.

---

## Recipe Costing Tips

**Cost your top 10 recipes first.** You don't need to cost every recipe you've ever made. Start with your most-cooked meals (or best-selling menu items). These have the highest impact on your budget or profits.

**Update prices quarterly.** Ingredient prices fluctuate, especially for proteins, dairy, and produce. A recipe that cost $3 per serving six months ago might cost $3.80 today. For food businesses, re-costing your top sellers every quarter prevents margin erosion.

**Don't forget the "invisible" ingredients.** Salt, pepper, oil, butter, garlic — these appear in almost every recipe and their costs are easy to ignore because each dish uses a tiny amount. But across hundreds of servings, they add up. A restaurant using 2 gallons of olive oil a week at $40/gallon is spending $4,000+ per year on oil alone.

**Buy in the unit you use.** If you always use chicken breast, compare prices per pound of breast, not per pound of whole chicken. The "cheaper" whole chicken requires labor to break down and yields bones and trim you may not use.

**Watch for yield loss.** A 1 lb raw chicken breast yields about 12 oz cooked. A head of lettuce with outer leaves removed yields about 75% of its purchase weight. Your recipe cost should account for the amount you actually use, not what you buy.

---

## Frequently Asked Questions

**What's a good food cost percentage for a restaurant?**
The industry standard for a full-service restaurant is 28–35%, with 30% being the most commonly cited target. This means for every $1 in revenue, $0.30 goes to ingredients. Fast-casual restaurants aim for 25–32%. Bakeries and coffee shops typically run lower (15–25%) because their raw ingredients (flour, sugar, coffee beans) are inexpensive relative to their selling prices.

**How do I calculate cost per serving for a recipe?**
Add up the cost of every ingredient used in the recipe (not the whole package — just the portion you used). Then divide by the number of servings. For example, if all ingredients total $16 and the recipe makes 8 servings, your cost per serving is $2.00.

**Should I include the cost of seasonings and pantry staples?**
Yes, especially for food businesses where accuracy matters. For home cooking, it's optional — spices, oil, salt, and pepper typically add $0.10–0.30 per recipe, which is small enough to round. But for a restaurant making 100+ servings per day, even $0.05 per plate adds up to $1,800+ per year.

**How do I handle ingredients I buy in bulk but use across multiple recipes?**
Calculate the cost per base unit (per gram, per ounce, per cup) and only charge the amount your recipe actually uses. If you buy a 25 lb bag of flour for $12, that's $0.48 per pound or $0.03 per ounce. A recipe using 8 oz of flour costs $0.24 in flour.

**What's the difference between food cost and plate cost?**
Food cost is raw ingredients only. Plate cost includes everything needed to serve the dish: ingredients, garnish, disposables (takeout containers, utensils), and sometimes a labor allocation. For a full picture of profitability, use plate cost.

**How can I lower my food cost percentage?**
The most effective strategies: reduce portion sizes slightly (even half an ounce less protein per plate adds up), substitute cheaper ingredients where quality isn't affected (e.g., regular olive oil instead of extra virgin for cooking), minimize waste through better prep and inventory management, and negotiate better prices with suppliers by buying in volume.

---

## Related Calculators

- **[Recipe Scaler](/recipe-scaler)** — Scaling a recipe up or down? Adjust all ingredient quantities at once, then re-cost.
- **[Recipe Macro Calculator](/recipe-macro-calculator)** — Get the nutritional breakdown alongside your cost breakdown.
- **[Party Food Calculator](/party-food-calculator)** — Planning a large event? Calculate quantities first, then cost the whole spread.
- **[Cooking Measurement Converter](/cooking-measurement-converter)** — Need to convert between cups, grams, ounces, and pounds? Essential for accurate costing.
