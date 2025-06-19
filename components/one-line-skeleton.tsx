import { Skeleton } from "./ui/skeleton";

export default function OneLineSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}
