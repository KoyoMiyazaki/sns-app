import { Metadata } from "next";
import ProfileClient from "../_components/profile-client";

export const metadata: Metadata = {
  title: "プロフィール",
};

export default function ProfilePage() {
  return <ProfileClient />;
}
