interface Direction {
  id: number;
  step: string;
  order: number;
}

interface DirectionsListProps {
  directions: Direction[];
}

export default function DirectionsList({ directions }: DirectionsListProps) {
  const sorted = [...directions].sort((a, b) => a.order - b.order);

  return (
    <ol className="space-y-4">
      {sorted.map((direction, index) => (
        <li key={direction.id} className="flex gap-4">
          <span className="flex-shrink-0 h-7 w-7 rounded-full bg-green-600 text-white text-sm font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <p className="pt-0.5">{direction.step}</p>
        </li>
      ))}
    </ol>
  );
}
