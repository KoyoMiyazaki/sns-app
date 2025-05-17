import { Tag } from "./tag";

export interface PostTagWithTag {
  postId: string;
  tagId: string;
  tag: Tag;
}
