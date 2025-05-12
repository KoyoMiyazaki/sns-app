import { User } from "./user";

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface CommentWithMeta extends Comment {
  user: User;
}
