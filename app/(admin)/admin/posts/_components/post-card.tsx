import { PostWithMetaAndTags } from "@/types/post";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface PostCardProps {
  post: PostWithMetaAndTags;
  totalComments?: number;
}

export default function PostCard({ post, totalComments }: PostCardProps) {
  const pathname = usePathname();
  const isFeedPage = pathname === "/feed";

  return (
    <div className="relative space-y-2 border p-4 rounded-md">
      <p className="font-bold text-sm">{post.user.username}</p>
      <p className="text-sm">{post.content}</p>
      {post.imageUrl && (
        <Image
          width={500}
          height={300}
          src={post.imageUrl}
          alt="投稿画像"
          className="rounded-md max-h-64 object-cover"
        />
      )}
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
