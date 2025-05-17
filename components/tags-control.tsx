import { PostTagWithTag } from "@/types/post-tag";
import Tag from "./tag";

interface TagsControlProps {
  tags: PostTagWithTag[];
}

export default function TagsControl({ tags }: TagsControlProps) {
  return (
    <div className="flex gap-2">
      {tags.map((tagRelation) => (
        <Tag key={tagRelation.tagId} name={tagRelation.tag.name} />
      ))}
    </div>
  );
}
