"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase-client";
import { errorStyle, successStyle } from "@/lib/toast-style";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { useState } from "react";
import { toast } from "sonner";

interface ProfileCardProps {
  user: SupabaseUser;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const [username, setUsername] = useState<string>(
    user.user_metadata.username ?? ""
  );

  const handleSave = async () => {
    const { error } = await supabase.auth.updateUser({
      data: {
        username,
      },
    });

    if (error) {
      toast.error("ユーザー情報の更新に失敗しました", {
        style: errorStyle,
      });
    } else {
      toast.success("ユーザー情報を更新しました", {
        style: successStyle,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>プロフィール</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="username">ユーザー名</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSave}>
          保存
        </Button>
      </CardFooter>
    </Card>
  );
}
