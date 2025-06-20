export interface User {
  id: string;
  username: string;
}

export interface UserWithMeta extends User {
  email: string;
  isBanned: boolean;
}
