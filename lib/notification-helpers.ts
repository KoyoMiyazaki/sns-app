export function getNotificationLabel(type: string): string {
  switch (type) {
    case "like":
      return "いいね";
    case "comment":
      return "コメント";
    default:
      return "通知";
  }
}
