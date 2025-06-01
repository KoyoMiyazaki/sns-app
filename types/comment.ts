import { User } from "./user";

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  createdAt: string;
}

export interface CommentWithMeta extends Comment {
  replies: Comment[];
}
