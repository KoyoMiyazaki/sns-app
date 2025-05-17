import { PostTagWithTag } from "./post-tag";
import { User } from "./user";

export interface Post {
  id: string;
  userId: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
}

export interface PostWithMeta extends Post {
  _count: {
    comments: number;
  };
  user: User;
}

export interface PostWithMetaAndTags extends PostWithMeta {
  tags: PostTagWithTag[];
}
