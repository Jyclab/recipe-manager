import { db } from "@/lib/db";
import { categories, recipeCategories } from "@/lib/db/schema";
import { eq, count } from "drizzle-orm";
import Link from "next/link";

export const metadata = { title: "Categories – Recipe Manager" };

export default async function CategoriesPage() {
  const allCategories = await db.query.categories.findMany({
    with: { recipeCategories: true },
    orderBy: (c, { asc }) => [asc(c.name)],
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allCategories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
          >
            <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
            {category.description && (
              <p className="text-sm text-gray-600 mt-1">{category.description}</p>
            )}
            <p className="text-sm text-green-700 font-medium mt-3">
              {category.recipeCategories.length}{" "}
              {category.recipeCategories.length === 1 ? "recipe" : "recipes"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
