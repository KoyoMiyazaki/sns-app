import { Post } from "@/types/post";
import { MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";

interface PostCardProps {
  post: Post;
  totalComments?: number;
}

export default function PostCard({ post, totalComments }: PostCardProps) {
  const pathname = usePathname();
  const isFeedPage = pathname === "/feed";

  return (
    <div className="space-y-2 border p-4 rounded-md">
      <p className="font-bold">{post.username}</p>
      <p>{post.content}</p>
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {new Date(post.createdAt).toLocaleString()}
        </p>
        {isFeedPage && (
          <div className="flex items-center gap-1">
            <MessageCircleMore className="w-4 h-4" />
            <span className="text-xs">{totalComments}</span>
          </div>
        )}
      </div>
    </div>
  );
}
