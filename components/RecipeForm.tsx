"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRecipe } from "@/lib/actions/createRecipe";

interface Category {
  id: number;
  name: string;
}

interface RecipeFormProps {
  categories: Category[];
}

interface Ingredient {
  name: string;
  amount: string;
  unit: string;
}

export default function RecipeForm({ categories }: RecipeFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { name: "", amount: "", unit: "" },
  ]);
  const [steps, setSteps] = useState<string[]>([""])
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const addIngredient = () =>
    setIngredients([...ingredients, { name: "", amount: "", unit: "" }]);

  const removeIngredient = (index: number) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addStep = () => setSteps([...steps, ""]);
  const removeStep = (index: number) =>
    setSteps(steps.filter((_, i) => i !== index));
  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  const toggleCategory = (id: number) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const result = await createRecipe({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      prepTime: Number(formData.get("prepTime")) || undefined,
      cookTime: Number(formData.get("cookTime")) || undefined,
      servings: Number(formData.get("servings")) || undefined,
      ingredients: ingredients.filter((i) => i.name.trim() !== ""),
      directions: steps.filter((s) => s.trim() !== ""),
      categoryIds: selectedCategories,
    });

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else if (result.success && result.recipeId) {
      router.push(`/recipes/${result.recipeId}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Basic Info</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            name="title"
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="e.g. Spaghetti Carbonara"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Brief description of the recipe..."
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prep Time (min)
            </label>
            <input
              name="prepTime"
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cook Time (min)
            </label>
            <input
              name="cookTime"
              type="number"
              min="0"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Servings
            </label>
            <input
              name="servings"
              type="number"
              min="1"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => toggleCategory(cat.id)}
                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Ingredients */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Ingredients <span className="text-red-500">*</span>
        </h2>
        {ingredients.map((ing, index) => (
          <div key={index} className="flex gap-2 items-start">
            <input
              className="w-20 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Amount"
              value={ing.amount}
              onChange={(e) => updateIngredient(index, "amount", e.target.value)}
            />
            <input
              className="w-20 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Unit"
              value={ing.unit}
              onChange={(e) => updateIngredient(index, "unit", e.target.value)}
            />
            <input
              className="flex-1 border border-gray-300 rounded px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ingredient name"
              value={ing.name}
              onChange={(e) => updateIngredient(index, "name", e.target.value)}
            />
            {ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="text-red-500 hover:text-red-700 px-2 py-2 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addIngredient}
          className="text-sm text-green-700 hover:text-green-900 font-medium"
        >
          + Add Ingredient
        </button>
      </section>

      {/* Directions */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Directions <span className="text-red-500">*</span>
        </h2>
        {steps.map((step, index) => (
          <div key={index} className="flex gap-2 items-start">
            <span className="flex-shrink-0 h-7 w-7 rounded-full bg-gray-200 text-gray-700 text-sm font-bold flex items-center justify-center mt-2">
              {index + 1}
            </span>
            <textarea
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              rows={2}
              placeholder={`Step ${index + 1}...`}
              value={step}
              onChange={(e) => updateStep(index, e.target.value)}
            />
            {steps.length > 1 && (
              <button
                type="button"
                onClick={() => removeStep(index)}
                className="text-red-500 hover:text-red-700 px-2 py-2 text-sm"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="text-sm text-green-700 hover:text-green-900 font-medium"
        >
          + Add Step
        </button>
      </section>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Creating Recipe..." : "Create Recipe"}
      </button>
    </form>
  );
}
