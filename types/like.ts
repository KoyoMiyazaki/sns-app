import { PostWithMetaAndTags } from "./post";

export interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: string;
}

export interface LikeWithMeta extends Like {
  post: PostWithMetaAndTags;
}
