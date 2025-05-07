import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LikesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>いいね一覧</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div>ここにいいね一覧</div>
      </CardContent>
    </Card>
  );
}
