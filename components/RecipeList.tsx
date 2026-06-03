import RecipeCard from "./RecipeCard";

interface Recipe {
  id: number;
  title: string;
  description: string | null;
  prepTime: number | null;
  cookTime: number | null;
  user: { name: string } | null;
}

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return (
      <p className="text-gray-500 text-center py-8">
        No recipes yet. Be the first to add one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
