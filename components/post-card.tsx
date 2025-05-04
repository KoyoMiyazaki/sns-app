interface Post {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="space-y-2 border p-4 rounded-md">
      <p className="font-bold">{post.username}</p>
      <p>{post.content}</p>
      <p className="text-sm text-muted-foreground">
        {new Date(post.createdAt).toLocaleString()}
      </p>
    </div>
  );
}
