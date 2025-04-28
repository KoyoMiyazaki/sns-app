"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function UserAuthForm() {
  const pathname = usePathname();
  const buttonText =
    pathname === "/signup"
      ? "メールアドレスで作成"
      : "メールアドレスでログイン";

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Input id="password" type="password" placeholder="name@example.com" />
      </div>
      <Button className={cn(buttonVariants({ size: "lg" }))}>
        {buttonText}
      </Button>
    </>
  );
}
