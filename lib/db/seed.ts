import "dotenv/config";
import { db } from "./index";
import { categories } from "./schema";

async function seed() {
  console.log("Seeding database...");

  await db
    .insert(categories)
    .values([
      { name: "Breakfast", slug: "breakfast", description: "Morning meals" },
      { name: "Lunch", slug: "lunch", description: "Midday meals" },
      { name: "Dinner", slug: "dinner", description: "Evening meals" },
      { name: "Dessert", slug: "dessert", description: "Sweet treats" },
      {
        name: "Vegetarian",
        slug: "vegetarian",
        description: "Plant-based recipes",
      },
      {
        name: "Quick & Easy",
        slug: "quick-easy",
        description: "Under 30 minutes",
      },
    ])
    .onConflictDoNothing();

  console.log("Categories seeded successfully!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
