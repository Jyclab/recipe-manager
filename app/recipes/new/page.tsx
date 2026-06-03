import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import RecipeForm from "@/components/RecipeForm";

export const metadata = { title: "Create Recipe – Recipe Manager" };

export default async function NewRecipePage() {
  const session = await auth();
  if (!session) redirect("/login");

  const categories = await db.query.categories.findMany({
    orderBy: (c, { asc }) => [asc(c.name)],
  });

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Create a New Recipe</h1>
      <RecipeForm categories={categories} />
    </div>
  );
}
