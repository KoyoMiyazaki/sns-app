import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <h1 className="text-4xl md:text-5xl font-bold">ようこそ！MySNSへ</h1>
      <p className="text-muted-foreground text-center">
        このSNSで、世界中の人とつながりましょう。
      </p>
      <div className="flex flex-col gap-2">
        <Link
          href={"/signup"}
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          サインアップ
        </Link>
        <Link href={"/login"} className={cn(buttonVariants({ size: "lg" }))}>
          ログイン
        </Link>
      </div>
    </>
  );
}
