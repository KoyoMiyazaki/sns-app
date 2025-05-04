import { Skeleton } from "./ui/skeleton";

export default function PostSkeleton() {
  return (
    <div className="space-y-2 border p-4 rounded-md">
      <Skeleton className="h-4 w-[100px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[150px]" />
    </div>
  );
}
