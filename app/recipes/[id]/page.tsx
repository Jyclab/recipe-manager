import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import IngredientList from "@/components/IngredientList";
import DirectionsList from "@/components/DirectionsList";
import CategoryBadge from "@/components/CategoryBadge";
import Link from "next/link";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const recipeId = Number(id);

  if (isNaN(recipeId)) notFound();

  const recipe = await db.query.recipes.findFirst({
    where: eq(recipes.id, recipeId),
    with: {
      user: true,
      ingredients: true,
      directions: true,
      recipeCategories: { with: { category: true } },
    },
  });

  if (!recipe) notFound();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link href="/recipes" className="text-sm text-gray-500 hover:text-gray-700">
          ← Back to Recipes
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{recipe.title}</h1>
        {recipe.description && (
          <p className="text-gray-600 mt-2">{recipe.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-gray-500">
          {recipe.user && <span>By <strong>{recipe.user.name}</strong></span>}
          {recipe.prepTime !== null && <span>Prep: {recipe.prepTime} min</span>}
          {recipe.cookTime !== null && <span>Cook: {recipe.cookTime} min</span>}
          {recipe.servings !== null && <span>Serves: {recipe.servings}</span>}
        </div>

        {recipe.recipeCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.recipeCategories.map(({ category }) => (
              <CategoryBadge key={category.id} name={category.name} slug={category.slug} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-2">
        <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
        <IngredientList ingredients={recipe.ingredients} />
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Directions</h2>
        <DirectionsList directions={recipe.directions} />
      </div>
    </div>
  );
}
