import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>投稿一覧</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>ここに投稿一覧</div>
      </CardContent>
    </Card>
  );
}
