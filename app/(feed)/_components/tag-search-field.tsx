"use client";

import React, { useState } from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Tag } from "@/types/tag";
import { useRouter } from "next/navigation";

interface TagSearchFieldProps {
  tags: Tag[];
}

export default function TagSearchField({ tags }: TagSearchFieldProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedTags.length === 0) return;

    const query = selectedTags
      .map((tag) => `tags=${encodeURIComponent(tag)}`)
      .join("&");

    router.push(`/feed?${query}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] md:w-[300px] justify-between"
          >
            {selectedTags.length > 0 ? selectedTags.join(",") : "タグを選択"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] md:w-[300px] p-0">
          <Command>
            <CommandInput placeholder="タグで検索" className="h-9" />
            <CommandList>
              <CommandEmpty>タグは見つかりませんでした</CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.id}
                    value={tag.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setSelectedTags((prev) =>
                        prev.includes(currentValue)
                          ? prev.filter((v) => currentValue !== v)
                          : [...prev, currentValue]
                      );
                    }}
                  >
                    {tag.name}
                    {selectedTags.includes(tag.name) && (
                      <Check className="ml-auto opacity-100" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button
        type="submit"
        className={cn(buttonVariants({ size: "sm" }), "cursor-pointer")}
      >
        <Search />
        検索
      </Button>
    </form>
  );
}
