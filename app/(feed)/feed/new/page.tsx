import { Metadata } from "next";
import PostForm from "./_components/post-form";

export const metadata: Metadata = {
  title: "新規投稿",
};

export default function NewPostPage() {
  return <PostForm />;
}
