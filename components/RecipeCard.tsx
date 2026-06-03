import Link from "next/link";

interface RecipeCardProps {
  recipe: {
    id: number;
    title: string;
    description: string | null;
    prepTime: number | null;
    cookTime: number | null;
    user: {
      name: string;
    } | null;
  };
}

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <Link href={`/recipes/${recipe.id}`}>
      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {recipe.title}
        </h3>
        {recipe.description && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {recipe.description}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          {recipe.prepTime !== null && (
            <span>Prep: {recipe.prepTime} min</span>
          )}
          {recipe.cookTime !== null && (
            <span>Cook: {recipe.cookTime} min</span>
          )}
          {recipe.user && <span>By {recipe.user.name}</span>}
        </div>
      </div>
    </Link>
  );
}
