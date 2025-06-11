import UserAuthForm from "@/app/(auth)/_components/user-auth-form";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "アカウントの作成",
};

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">アカウントの作成</h1>
      <Suspense>
        <UserAuthForm />
      </Suspense>
      <Link
        href={"/login"}
        className="text-muted-foreground text-sm text-center underline underline-offset-4"
      >
        アカウントをお持ちの場合はログイン
      </Link>
    </div>
  );
}
