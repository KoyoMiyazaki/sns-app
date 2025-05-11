import { createClient } from "@supabase/supabase-js";
import { supabase } from "./supabase-client";

export async function uploadImage(file: File): Promise<string | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const token = session?.access_token;

  const authedSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    }
  );

  const { data, error } = await authedSupabase.storage
    .from("post-images")
    .upload(`public/${Date.now()}_${file.name}`, file);

  if (error) {
    console.error("Upload error", error);
    return null;
  }

  return authedSupabase.storage.from("post-images").getPublicUrl(data.path).data
    .publicUrl;
}
