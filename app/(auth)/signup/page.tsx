import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "アカウントの作成",
};

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">アカウントの作成</h1>
      <div className="flex flex-col gap-4">
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
          メールアドレスで作成
        </Button>
        <Link
          href={"/login"}
          className="text-muted-foreground text-sm text-center underline underline-offset-4"
        >
          アカウントをお持ちの場合はログイン
        </Link>
      </div>
    </div>
  );
}
