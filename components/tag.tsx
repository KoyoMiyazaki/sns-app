import { TagIcon } from "lucide-react";

interface TagProps {
  name: string;
}

export default function Tag({ name }: TagProps) {
  return (
    <div className="flex gap-1 items-center border border-muted-foreground rounded-sm p-1 text-accent-foreground">
      <TagIcon className="w-4 h-4" />
      <span className="text-sm">{name}</span>
    </div>
  );
}
