import { PostWithMetaAndTags } from "@/types/post";
import { Heart, MessageCircleMore } from "lucide-react";
import { usePathname } from "next/navigation";
import TagsControl from "./tags-control";
import Image from "next/image";

interface PostCardProps {
  post: PostWithMetaAndTags;
  totalComments?: number;
  isLiked?: boolean;
}

export default function PostCard({
  post,
  totalComments,
  isLiked,
}: PostCardProps) {
  const pathname = usePathname();
  const isFeedPage = pathname === "/feed";

  return (
    <div className="relative space-y-2 border p-4 rounded-md">
      {isLiked && (
        <Heart className="absolute top-4 right-4 text-red-500 fill-red-500 w-4 h-4" />
      )}
      <p className="font-bold">{post.user.username}</p>
      <p>{post.content}</p>
      {post.imageUrl && (
        <Image
          width={500}
          height={300}
          src={post.imageUrl}
          alt="投稿画像"
          className="rounded-md max-h-64 object-cover"
        />
      )}
      {post.tags.length > 0 && <TagsControl tags={post.tags} />}
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
