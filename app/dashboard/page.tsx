import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { recipes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

export const metadata = { title: "Dashboard – Recipe Manager" };

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userRecipes = await db.query.recipes.findMany({
    where: eq(recipes.userId, session.user.id),
    orderBy: (r, { desc }) => [desc(r.createdAt)],
  });

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, <strong>{session.user.name}</strong>
        </p>
        <p className="text-sm text-gray-500 mt-1">{session.user.email}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-4xl font-bold text-green-600">{userRecipes.length}</p>
          <p className="text-gray-600 mt-1">
            {userRecipes.length === 1 ? "Recipe Created" : "Recipes Created"}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex items-center justify-center">
          <Link
            href="/recipes/new"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            + Create New Recipe
          </Link>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Recipes</h2>

        {userRecipes.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center text-gray-500">
            You haven&apos;t created any recipes yet.{" "}
            <Link href="/recipes/new" className="text-green-700 font-medium hover:underline">
              Create your first one!
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {userRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white border border-gray-200 rounded-lg p-4 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{recipe.title}</h3>
                  {recipe.description && (
                    <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
                      {recipe.description}
                    </p>
                  )}
                </div>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="text-sm text-green-700 font-medium hover:underline ml-4 flex-shrink-0"
                >
                  View →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
