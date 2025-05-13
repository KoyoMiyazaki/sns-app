import { Like } from "@/lib/generated/prisma";
import { PostWithMeta } from "./post";

export interface LikeWithMeta extends Like {
  post: PostWithMeta;
}
