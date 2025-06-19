"use client";

import { Tag as TagType } from "@/types/tag";
import { useEffect, useState } from "react";
import DeleteTagButton from "./delete-tag-button";

export default function AdminTagsClient() {
  const [tags, setTags] = useState<TagType[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch("/api/tags");
      const data = await res.json();
      setTags(data);
    };

    fetchTags();
  }, []);

  return (
    <div className="flex flex-col gap-8 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">タグ管理</h1>
      <div className="flex flex-col divide-y border-y">
        {tags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between px-2 py-4 hover:bg-blue-50"
          >
            <p className="font-bold">{tag.name}</p>
            <DeleteTagButton tagId={tag.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
