"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { recipes, ingredients, directions, recipeCategories } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.string().optional(),
  unit: z.string().optional(),
});

const RecipeSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  prepTime: z.coerce.number().min(0).optional(),
  cookTime: z.coerce.number().min(0).optional(),
  servings: z.coerce.number().min(1).optional(),
  ingredients: z
    .array(IngredientSchema)
    .min(1, "At least one ingredient is required"),
  directions: z
    .array(z.string().min(1, "Step cannot be empty"))
    .min(1, "At least one direction is required"),
  categoryIds: z.array(z.number()),
});

export type CreateRecipeInput = z.infer<typeof RecipeSchema>;

export async function createRecipe(data: CreateRecipeInput) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a recipe" };
  }

  const result = RecipeSchema.safeParse(data);
  if (!result.success) {
    return { error: result.error.errors[0].message };
  }

  const {
    title,
    description,
    prepTime,
    cookTime,
    servings,
    ingredients: ingredientList,
    directions: directionList,
    categoryIds,
  } = result.data;

  try {
    const [recipe] = await db
      .insert(recipes)
      .values({
        title,
        description,
        prepTime,
        cookTime,
        servings,
        userId: session.user.id,
      })
      .returning();

    if (ingredientList.length > 0) {
      await db.insert(ingredients).values(
        ingredientList.map((ing, index) => ({
          recipeId: recipe.id,
          name: ing.name,
          amount: ing.amount ?? null,
          unit: ing.unit ?? null,
          order: index + 1,
        }))
      );
    }

    if (directionList.length > 0) {
      await db.insert(directions).values(
        directionList.map((step, index) => ({
          recipeId: recipe.id,
          step,
          order: index + 1,
        }))
      );
    }

    if (categoryIds.length > 0) {
      await db.insert(recipeCategories).values(
        categoryIds.map((categoryId) => ({
          recipeId: recipe.id,
          categoryId,
        }))
      );
    }

    revalidatePath("/recipes");
    revalidatePath("/dashboard");

    return { success: true, recipeId: recipe.id };
  } catch (error) {
    console.error("Failed to create recipe:", error);
    return { error: "Failed to create recipe. Please try again." };
  }
}
