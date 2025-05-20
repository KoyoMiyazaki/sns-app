import { createClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const headerStore = await headers();
  const token = headerStore.get("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json(
      { message: "トークンがありません" },
      { status: 401 }
    );
  }

  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data: userData, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !userData?.user) {
    return NextResponse.json(
      { message: "認証に失敗しました" },
      { status: 401 }
    );
  }

  if (!userData?.user.user_metadata.isAdmin) {
    return NextResponse.json(
      { message: "許可されていません" },
      { status: 403 }
    );
  }

  const { data: users, error: err } =
    await supabaseAdmin.auth.admin.listUsers();
  if (err) {
    return Response.json(
      { message: "取得に失敗しました", err },
      { status: 500 }
    );
  }

  const simplifiedUsers = users.users.map((user) => ({
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username ?? "",
  }));

  return NextResponse.json(simplifiedUsers);
}
