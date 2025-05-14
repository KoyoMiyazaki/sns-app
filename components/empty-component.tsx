import { Ghost } from "lucide-react";

interface EmptyComponentProps {
  objectName: string;
}

export default function EmptyComponent({ objectName }: EmptyComponentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-muted-foreground">
      <Ghost className="w-10 h-10" />
      <p className="text-sm">{objectName}はありません</p>
    </div>
  );
}
