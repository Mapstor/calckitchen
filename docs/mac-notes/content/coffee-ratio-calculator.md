# Coffee Ratio Calculator — Coffee to Water Ratio by Brew Method

**Title Tag:** Coffee to Water Ratio Calculator — Every Brew Method | CalcKitchen
**Meta Description:** Calculate the perfect coffee-to-water ratio for pour over, French press, cold brew, espresso, AeroPress, and more. Based on SCA Golden Cup standards.
**URL:** /coffee-ratio-calculator

---

Great coffee comes down to one thing most people get wrong: the ratio of coffee to water. Too much water and you get a watery, under-extracted cup. Too much coffee and you're drinking bitter sludge. The difference between a good cup and a great cup is often just a few grams.

The Specialty Coffee Association (SCA) defines the "Golden Cup" standard as a ratio between 1:15 and 1:18 (coffee to water by weight) — roughly 55 grams of coffee per liter of water. But that's a starting point. Every brew method has its own ideal range because the grind size, contact time, and extraction mechanics all differ.

Our Coffee Ratio Calculator works in two directions: enter how much coffee you have and get the right amount of water, or enter how many cups you want and get the exact coffee dose. It covers 8 brew methods with strength adjustments, and outputs in both grams and common kitchen measurements.

---

## [CALCULATOR PLACEMENT]

**Calculator Spec:**

**Inputs:**
- Brew method dropdown: Pour Over (V60/Chemex), French Press, Cold Brew (concentrate), Drip / Auto, AeroPress, Espresso, Moka Pot, Turkish
- Strength preference: Light, Medium (default), Strong
- **Mode toggle — two calculation directions:**
  - **Mode A: "I have coffee"** → Input: coffee amount (grams or tablespoons) → Output: water amount
  - **Mode B: "I want cups"** → Input: number of cups (dropdown: 1–12 cups, with cup size selector: 6 oz, 8 oz, 10 oz, 12 oz) → Output: coffee amount needed + water amount
- Unit toggle: Metric (grams/ml) / Imperial (oz/tablespoons/cups)

**Outputs:**
- Coffee amount (grams + tablespoons equivalent)
- Water amount (grams/ml + cups/oz equivalent)
- Ratio displayed as "1:X" (e.g., 1:16)
- Brew-specific tips panel: grind size, water temperature, brew time, technique tips
- Visual dose bar (optional) — shows the ratio graphically

**Calculation logic:**
- Each method has a default ratio for Medium strength:
  - Pour Over: 1:16
  - French Press: 1:16
  - Cold Brew: 1:6.5 (concentrate)
  - Drip: 1:17
  - AeroPress: 1:11
  - Espresso: 1:2
  - Moka Pot: 1:8.5
  - Turkish: 1:11
- Light = default ratio + 1 (more water per gram coffee)
- Strong = default ratio - 1 (less water)
- Conversion constants: 1 tbsp coffee ≈ 6g; 1 standard cup = 8 oz = 237ml
- Mode B: water_ml = cups × cup_size_ml; coffee_g = water_ml / ratio

**SCA Golden Cup reference:** Display a small info badge/tooltip explaining the SCA 1:15–1:18 standard on all methods where the ratio falls within this range.

---

## The SCA Golden Cup Standard

The Specialty Coffee Association developed the Golden Cup standard through decades of sensory research. It defines the ideal brew as one that uses a coffee-to-water ratio of **1:15 to 1:18 by weight** (roughly 55g of coffee per 1 liter of water) and achieves a Total Dissolved Solids (TDS) of 1.15–1.35%, producing an extraction yield of 18–22%.

In practical terms, this means for most hot brewing methods — pour over, French press, drip — you want about 1 gram of coffee for every 15 to 18 grams of water. Where you land within that range depends on your taste preference:

- **1:15** — Strong, full-bodied, more intense flavor. Preferred by those who like a heavier cup.
- **1:16–1:17** — The sweet spot for most people. Balanced extraction, clear flavors.
- **1:18** — Lighter, more tea-like body. Preferred for delicate single-origin beans.

The Golden Cup standard applies to conventional hot brewing methods. Espresso, cold brew, Moka pots, and Turkish coffee all use very different ratios because their extraction mechanics (pressure, temperature, time) are fundamentally different.

---

## Coffee-to-Water Ratios by Brew Method

### Complete Ratio Reference Table

| Brew Method | Ratio Range | Default (Medium) | Grind Size | Water Temp | Brew Time |
|------------|------------|-------------------|-----------|------------|-----------|
| Pour Over (V60, Chemex) | 1:15 – 1:17 | 1:16 | Medium-fine | 195–205°F (90–96°C) | 3–4 min |
| French Press | 1:15 – 1:17 | 1:16 | Coarse | 195–205°F (90–96°C) | 4 min |
| Cold Brew (concentrate) | 1:5 – 1:8 | 1:6.5 | Extra coarse | Cold / room temp | 12–24 hrs |
| Drip / Auto | 1:15 – 1:18 | 1:17 | Medium | Auto (~200°F) | 5–6 min |
| AeroPress | 1:6 – 1:15 | 1:11 | Fine to medium | 175–205°F (80–96°C) | 1–2 min |
| Espresso | 1:1.5 – 1:2.5 | 1:2 | Very fine | 195–205°F (90–96°C) | 25–30 sec |
| Moka Pot | 1:7 – 1:10 | 1:8.5 | Fine | Boiling (stovetop) | 4–5 min |
| Turkish | 1:10 – 1:12 | 1:11 | Extra fine (powder) | Boiling | 2–3 min |

### Quick-Measure Reference

Not everyone has a kitchen scale. Here's how the ratios translate to common measurements:

| Measure | Coffee Weight |
|---------|--------------|
| 1 tablespoon | ~6 g |
| 1 standard scoop (2 tbsp) | ~10–12 g |
| 1 standard mug (8 oz / 237 ml) | 15–18 g coffee (pour over) |
| 1 travel mug (12 oz / 355 ml) | 22–27 g coffee (pour over) |

---

## Method-by-Method Brewing Guides

### 1. Pour Over (V60, Chemex, Kalita Wave)

**Default ratio: 1:16** — 1 gram of coffee per 16 grams of water.

Pour over gives you the most control over extraction. The SCA Golden Cup standard was essentially designed around this method. Start with 1:16 and adjust from there — go to 1:15 for a stronger cup or 1:17 for lighter.

For a single cup (250 ml / ~8.5 oz), use 15.6g of coffee — round to 16g. For a Chemex carafe (750 ml / ~25 oz), use 47g.

The key variable beyond ratio is pour speed. A total brew time of 3–4 minutes is the target for a V60. If it drains too fast, your grind is too coarse. Too slow, too fine. Chemex filters are thicker, so expect slightly longer brew times (4–5 min) and grind slightly coarser.

### 2. French Press

**Default ratio: 1:16** — same as pour over, different extraction.

French press uses immersion brewing — the grounds sit in water for the entire brew time. Use a coarse grind (like sea salt) to prevent over-extraction and keep sediment manageable. Steep for exactly 4 minutes, then press and pour immediately. Leaving coffee in the press continues extraction and turns it bitter.

For a standard 34 oz (1 liter) French press, use 62.5g of coffee (~10 tablespoons). For a small 12 oz press, use 22g (~3.5 tablespoons).

A common French press mistake is grinding too fine. If your coffee is muddy and bitter, coarsen your grind before changing the ratio.

### 3. Cold Brew (Concentrate)

**Default ratio: 1:6.5** — this produces a concentrate you dilute before drinking.

Cold brew uses a much higher coffee-to-water ratio because cold water extracts less efficiently than hot water. The result is a concentrated syrup that you typically dilute 1:1 with water, milk, or ice before drinking.

For a large batch (1 liter of water), use 154g of coffee (~25 tablespoons). Steep in the fridge for 16–24 hours, then strain through a fine mesh or cheesecloth.

If you prefer ready-to-drink cold brew (no dilution), use a ratio of 1:12 to 1:15 instead. Steep the same amount of time.

### 4. Drip / Auto Coffee Maker

**Default ratio: 1:17** — slightly more water than pour over because auto-drip tends to over-extract slightly.

Auto-drip machines don't give you control over pour speed or water distribution, so the ratio compensates. Use medium grind (like table salt). The SCA certifies certain home brewers that meet Golden Cup standards — these machines hit the right water temperature (195–205°F) and spray evenly.

For a standard 12-cup coffee maker (60 oz / 1.77 liters), use 104g of coffee (~17 tablespoons). Most machines define a "cup" as 5–6 oz, not 8 oz — so a "12-cup" pot makes about 60 oz.

### 5. AeroPress

**Default ratio: 1:11** — concentrated but not as intense as espresso.

The AeroPress is the most versatile brewer because you can adjust ratio, grind, temperature, and time dramatically. The "standard" method uses a lower ratio (more concentrated), which you can drink as-is or add hot water to make an Americano-style cup.

For one AeroPress cup: use 17g of coffee with 187ml of water (~6.3 oz). Fine to medium grind, 175–205°F water (cooler for lighter roasts), steep 1–2 minutes, press for 20–30 seconds. James Hoffmann's inverted method uses 11g coffee, 200ml water (1:18) — shows how wide the AeroPress range is.

### 6. Espresso

**Default ratio: 1:2** — 1 gram of coffee yields 2 grams of liquid espresso.

Espresso ratios are expressed differently from other methods. A "1:2" espresso uses 18g of ground coffee to produce 36g of liquid espresso in about 25–30 seconds. This isn't about water volume in the tank — it's about what comes out.

Standard doses: 18g in, 36g out (double shot). A ristretto is 1:1.5 (18g in, 27g out — shorter, more concentrated). A lungo is 1:3 (18g in, 54g out — longer, more volume). Dialing in espresso is primarily about grind adjustment, not ratio — if the shot runs too fast, grind finer.

### 7. Moka Pot (Stovetop Espresso)

**Default ratio: 1:8.5** — stronger than drip but not true espresso.

Moka pots have fixed baskets, so the ratio is somewhat determined by the pot size. Fill the basket completely (don't tamp, just level off) and fill water to just below the valve. A standard 3-cup Moka pot uses about 15–17g of coffee and 130–150ml of water.

Use fine grind (finer than drip, coarser than espresso) and medium-low heat. Remove from heat as soon as coffee starts sputtering — the last few spurts are over-extracted and bitter.

| Moka Pot Size | Coffee | Water | Output |
|--------------|--------|-------|--------|
| 1-cup | 7–8g | 60 ml | ~40 ml |
| 3-cup | 15–17g | 150 ml | ~100 ml |
| 6-cup | 30–35g | 300 ml | ~200 ml |
| 9-cup | 45–50g | 450 ml | ~300 ml |

### 8. Turkish Coffee (Ibrik/Cezve)

**Default ratio: 1:11** — finely powdered coffee simmered directly in water.

Turkish coffee uses the finest grind possible — a powder finer than espresso, almost like flour. The grounds are not filtered out; they settle to the bottom of the cup.

For one Turkish cup (~3 oz / 85ml), use 7–8g of coffee. Add sugar during brewing (not after) if desired — traditional preparation levels are sade (no sugar), az (little), orta (medium), or çok (sweet). Bring to a foaming boil 2–3 times, removing from heat each time the foam rises. Pour slowly to preserve the foam on top.

---

## How to Use the Calculator: 6 Worked Examples

### Example 1: Pour Over — Single Cup Morning Brew

You want one 10 oz cup of pour over coffee, medium strength.

**Input:** Mode B (I want cups), 1 cup, 10 oz cup size, Pour Over, Medium
**Ratio:** 1:16
**Calculation:** 10 oz = 296 ml water → 296 ÷ 16 = 18.5g coffee

| | Grams | Kitchen Measure |
|---|------|----------------|
| Coffee | 18.5g | ~3 tablespoons |
| Water | 296g (296 ml) | ~10 oz |

**Brew tip:** Heat water to 200°F, bloom with 40g water for 30 seconds, then pour in slow circles.

### Example 2: French Press — Weekend Brunch for 4

You want to fill a 34 oz French press for 4 people, strong.

**Input:** Mode B, 4 cups, 8 oz cup size, French Press, Strong
**Ratio:** 1:15 (strong = default 16 minus 1)
**Calculation:** 4 × 237ml = 948ml water → 948 ÷ 15 = 63.2g coffee

| | Grams | Kitchen Measure |
|---|------|----------------|
| Coffee | 63g | ~10.5 tablespoons |
| Water | 948g (948 ml) | ~32 oz (fills 34 oz press) |

**Brew tip:** Pour all water at once, stir gently, steep exactly 4 minutes, press and pour immediately.

### Example 3: Cold Brew — Make a Week's Supply

You have a 1-liter jar and want cold brew concentrate.

**Input:** Mode B, target 1 liter of water, Cold Brew, Medium
**Ratio:** 1:6.5 (concentrate)
**Calculation:** 1000ml ÷ 6.5 = 153.8g coffee

| | Grams | Kitchen Measure |
|---|------|----------------|
| Coffee | 154g | ~25.5 tablespoons (~1 cup) |
| Water | 1000g (1 L) | ~34 oz |

**Output note:** This makes concentrate. Dilute 1:1 with water or milk before drinking. Yields approximately 8 servings of diluted cold brew.

### Example 4: Espresso — Dialing In a Double Shot

You're pulling a standard double shot.

**Input:** Mode A (I have coffee), 18g coffee, Espresso, Medium
**Ratio:** 1:2
**Calculation:** 18g × 2 = 36g liquid output

| | Amount |
|---|-------|
| Coffee (dose) | 18g |
| Espresso output | 36g (~1.2 oz liquid) |
| Target time | 25–30 seconds |

**Brew tip:** If the shot takes less than 20 seconds, grind finer. More than 35 seconds, grind coarser. Adjust grind, not dose.

### Example 5: Drip Coffee Maker — Office Pot of 12 "Cups"

Your office machine says "12 cups" — you want medium-strength drip.

**Input:** Mode B, 12 cups, 5 oz cup size (machines use 5 oz per "cup"), Drip, Medium
**Ratio:** 1:17
**Calculation:** 12 × 148ml = 1775ml water → 1775 ÷ 17 = 104.4g coffee

| | Grams | Kitchen Measure |
|---|------|----------------|
| Coffee | 104g | ~17 tablespoons (~1 cup + 1 tbsp) |
| Water | 1775 ml | 60 oz (fill to "12" on machine) |

**Important note:** Coffee maker "cups" are 5–6 oz, not 8 oz. A "12-cup" machine makes about 60 oz — enough for about 7 real mugs.

### Example 6: Moka Pot — Morning Cortado

You have a 3-cup Moka pot and want to make two cortados (espresso + equal part steamed milk).

**Input:** Mode A, 16g coffee, Moka Pot, Strong
**Ratio:** 1:8 (strong)
**Calculation:** 16g × 8 = 128ml water → produces ~85ml coffee

| | Amount |
|---|-------|
| Coffee | 16g (fill basket, level off) |
| Water | Fill to just below the valve (~130 ml) |
| Output | ~85 ml strong coffee |
| Per cortado | ~42 ml coffee + 42 ml milk |

---

## Tips for Better Coffee at Home

**Use a scale, not a scoop.** Coffee beans vary in density — a tablespoon of light-roast beans weighs different from dark-roast beans. A $15 kitchen scale is the single best coffee upgrade you can make. Weigh to the gram.

**Water quality matters more than you think.** If your tap water tastes bad, your coffee will taste bad. Filtered water is the baseline. The SCA recommends water with 150 ppm total dissolved solids and a neutral pH — you don't need to test, but if your coffee tastes flat with perfect ratio and technique, water is likely the culprit.

**Grind right before brewing.** Pre-ground coffee goes stale within minutes of grinding because the increased surface area accelerates oxidation. A burr grinder (even a manual one for $30–40) produces consistent particle size and dramatically improves flavor.

**Water temperature: 195–205°F for hot methods.** Too hot and you extract bitter compounds. Too cool and you under-extract (sour, weak). If you don't have a temperature-controlled kettle, boil water and let it sit 30–45 seconds.

**Freshness window: 1–4 weeks off roast.** Coffee is a perishable product. Peak flavor is typically 7–14 days after roast. After 4–6 weeks, it's noticeably stale. Buy from local roasters with roast dates on the bag.

---

## Frequently Asked Questions

**What's the best coffee-to-water ratio for beginners?**
Start with 1:16 for any hot brew method — that's the middle of the SCA Golden Cup range and works for pour over, French press, and drip. Use 16g of coffee per 256ml (about 8.5 oz) of water. From there, adjust: more coffee (1:15) if it tastes weak, less coffee (1:17) if it tastes harsh or bitter.

**Why is the cold brew ratio so different from hot coffee?**
Cold water extracts flavor compounds much more slowly than hot water. To compensate, cold brew uses 2–3× more coffee per unit of water. The result is a concentrate that gets diluted before drinking. If you drank cold brew concentrate straight, it would be intensely strong and quite caffeinated.

**How many tablespoons of coffee per cup?**
For an 8 oz cup of drip coffee at medium strength (1:17), you need about 14g of coffee — roughly 2.5 tablespoons. The old "2 tablespoons per 6 oz cup" guideline is reasonably close to the SCA standard. For a stronger cup, use 3 tablespoons per 8 oz.

**Can I use the same ratio for light and dark roasts?**
You can, but you might want to adjust. Dark roasts are more soluble (extract easier) and have a fuller body, so the same ratio can taste stronger compared to a light roast. Many people use a slightly higher ratio (more water, like 1:17) for dark roasts and a lower ratio (1:15) for light roasts.

**What does "1:2 ratio" mean for espresso?**
Espresso ratios work differently. 1:2 means you put in 18g of ground coffee and get out 36g of liquid espresso. It's about dose-in vs. beverage-out, not the total water in the machine's tank. The machine pushes 6–9 bars of pressure through the puck, and only a portion of the water makes it through.

**How much coffee do I need for a large group?**
For a crowd, figure 8 oz per person and use the drip ratio (1:17). For 20 people: 20 × 237ml = 4,740ml water ÷ 17 = 279g coffee. That's about 10 oz of coffee beans. A standard 12 oz bag makes roughly 15–16 mugs.

---

## Related Calculators

- **[Cooking Measurement Converter](/cooking-measurement-converter)** — Convert between grams, ounces, cups, tablespoons, and more.
- **[Party Food Calculator](/party-food-calculator)** — Planning coffee for a party? Calculate drinks alongside all your food.
- **[Recipe Scaler](/recipe-scaler)** — Scale any recipe up or down by servings or multiplier.
