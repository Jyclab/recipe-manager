import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema";
import RecipeList from "@/components/RecipeList";
import Link from "next/link";

export const metadata = { title: "All Recipes – Recipe Manager" };

export default async function RecipesPage() {
  const allRecipes = await db.query.recipes.findMany({
    with: { user: true },
    orderBy: (r, { desc }) => [desc(r.createdAt)],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">All Recipes</h1>
        <Link
          href="/recipes/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm font-medium"
        >
          + New Recipe
        </Link>
      </div>
      <RecipeList recipes={allRecipes} />
    </div>
  );
}
