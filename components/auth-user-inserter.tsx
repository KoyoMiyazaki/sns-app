"use client";

import { supabase } from "@/lib/supabase-client";
import { useEffect } from "react";

export default function AuthUserInserter() {
  useEffect(() => {
    const insertUserIfNeeded = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          username: user.user_metadata.username,
        }),
      });
    };

    insertUserIfNeeded();
  }, []);

  return null;
}
