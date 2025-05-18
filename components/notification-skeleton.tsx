import { Skeleton } from "./ui/skeleton";

export default function NotificationSkeleton() {
  return (
    <div className="flex items-center gap-2 px-2 py-4">
      <div className="w-3 h-3"></div>
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[150px]" />
      </div>
    </div>
  );
}
