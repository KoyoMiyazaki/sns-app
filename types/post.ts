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
