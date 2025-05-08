"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "./profile-card";
import PostsCard from "./posts-card";
import LikesCard from "./likes-card";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { User as SupabaseUser } from "@supabase/supabase-js";

export default function ProfileClient() {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <Tabs defaultValue="profile" className="w-full max-w-[400px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="profile">プロフィール</TabsTrigger>
        <TabsTrigger value="posts">投稿一覧</TabsTrigger>
        <TabsTrigger value="likes">いいね一覧</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        {user && <ProfileCard user={user} />}
      </TabsContent>
      <TabsContent value="posts">
        {user && <PostsCard user={user} />}
      </TabsContent>
      <TabsContent value="likes">
        <LikesCard />
      </TabsContent>
    </Tabs>
  );
}
