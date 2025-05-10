import { Like } from "@/lib/generated/prisma";
import { Post } from "./post";

export interface LikeWithPost extends Like {
  post: Post;
}
