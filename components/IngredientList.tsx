interface Ingredient {
  id: number;
  name: string;
  amount: string | null;
  unit: string | null;
  order: number;
}

interface IngredientListProps {
  ingredients: Ingredient[];
}

export default function IngredientList({ ingredients }: IngredientListProps) {
  const sorted = [...ingredients].sort((a, b) => a.order - b.order);

  return (
    <ul className="space-y-2">
      {sorted.map((ingredient) => (
        <li key={ingredient.id} className="flex items-start gap-2">
          <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
          <span>
            {ingredient.amount && (
              <span className="font-medium">{ingredient.amount} </span>
            )}
            {ingredient.unit && (
              <span className="font-medium">{ingredient.unit} </span>
            )}
            {ingredient.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
