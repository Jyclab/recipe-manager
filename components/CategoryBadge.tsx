interface CategoryBadgeProps {
  name: string;
  slug?: string;
}

export default function CategoryBadge({ name, slug }: CategoryBadgeProps) {
  return (
    <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
      {name}
    </span>
  );
}
