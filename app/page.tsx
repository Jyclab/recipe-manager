import Link from "next/link";

export default function HomePage() {
  return (
    <div className="text-center py-16 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900">
        Welcome to Recipe Manager
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        Discover and share your favorite recipes. Browse recipes from our
        community or sign up to start sharing your own culinary creations.
      </p>
      <div className="flex justify-center gap-4 pt-4">
        <Link
          href="/recipes"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
        >
          Browse Recipes
        </Link>
        <Link
          href="/signup"
          className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
        >
          Share a Recipe
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto pt-12 text-left">
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <div className="text-2xl mb-2">🔍</div>
          <h3 className="font-semibold text-gray-800 mb-1">Browse Recipes</h3>
          <p className="text-sm text-gray-600">
            Explore community recipes filtered by category.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <div className="text-2xl mb-2">✍️</div>
          <h3 className="font-semibold text-gray-800 mb-1">Create Recipes</h3>
          <p className="text-sm text-gray-600">
            Sign up and share your own recipes with the world.
          </p>
        </div>
        <div className="bg-white p-5 rounded-lg border border-gray-200">
          <div className="text-2xl mb-2">🏷️</div>
          <h3 className="font-semibold text-gray-800 mb-1">Browse Categories</h3>
          <p className="text-sm text-gray-600">
            Find recipes by meal type — breakfast, dinner, dessert, and more.
          </p>
        </div>
      </div>
    </div>
  );
}
