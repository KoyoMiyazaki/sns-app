import UserAuthForm from "@/app/(auth)/_components/user-auth-form";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "MySNSにログイン",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-4 w-[350px] md:w-[400px]">
      <h1 className="text-2xl font-bold">MySNSにログイン</h1>
      <Suspense>
        <UserAuthForm />
      </Suspense>
      <Link
        href={"/signup"}
        className="text-muted-foreground text-sm text-center underline underline-offset-4"
      >
        アカウントをお持ちでない場合は登録
      </Link>
    </div>
  );
}
