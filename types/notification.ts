import { User } from "./user";

export interface Notification {
  id: string;
  type: string;
  read: boolean;
  userId: string;
  postId?: string;
  actorId: string;
  createdAt: string;
}

export interface NotificationWithMeta extends Notification {
  actor: User;
}
