"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserWithMeta } from "@/types/user";
import { LucideIcon } from "lucide-react";

interface ConfirmActionDialogProps {
  user: UserWithMeta;
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
  handleClick: (user: UserWithMeta) => void;
}

export default function ConfirmActionDialog({
  user,
  icon: Icon,
  iconClassName,
  title,
  handleClick,
}: ConfirmActionDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={cn(buttonVariants({ variant: "outline" }))}>
          <Icon className={cn("w-5 h-5", iconClassName)} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>いいえ</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleClick(user)}>
            はい
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
