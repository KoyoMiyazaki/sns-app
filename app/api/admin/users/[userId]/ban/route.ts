import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;
  const { isBanned } = await req.json();

  if (typeof isBanned !== "boolean") {
    return NextResponse.json({ message: "不正な入力です" }, { status: 400 });
  }

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    user_metadata: { isBanned },
  });

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
