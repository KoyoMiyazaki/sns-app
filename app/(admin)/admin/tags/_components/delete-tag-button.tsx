"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import { toast } from "sonner";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { useRouter } from "next/navigation";

interface DeleteTagButtonProps {
  tagId: string;
}

export default function DeleteTagButton({ tagId }: DeleteTagButtonProps) {
  const router = useRouter();

  const handleDeleteTag = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch(`/api/admin/tags/${tagId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (res.ok) {
        toast.success("タグを削除しました", { style: successStyle });
        router.push("/admin/tags");
      } else {
        toast.error("タグを削除できませんでした", { style: errorStyle });
      }
    } catch (error) {
      console.error("タグ削除エラー", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(
            buttonVariants({ variant: "destructive" }),
            "cursor-pointer"
          )}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>タグを削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消せません
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>いいえ</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteTag}>はい</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
