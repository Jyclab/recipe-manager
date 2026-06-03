import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import RecipeList from "@/components/RecipeList";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = await db.query.categories.findFirst({
    where: eq(categories.slug, slug),
    with: {
      recipeCategories: {
        with: {
          recipe: {
            with: { user: true },
          },
        },
      },
    },
  });

  if (!category) notFound();

  const recipes = category.recipeCategories.map((rc) => rc.recipe);

  return (
    <div>
      <div className="mb-6">
        <Link href="/categories" className="text-sm text-gray-500 hover:text-gray-700">
          ← All Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">{category.name}</h1>
        {category.description && (
          <p className="text-gray-600 mt-1">{category.description}</p>
        )}
        <p className="text-sm text-gray-500 mt-2">
          {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
        </p>
      </div>

      <RecipeList recipes={recipes} />
    </div>
  );
}
