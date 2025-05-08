export interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface PostWithCommentCount extends Post {
  _count: {
    comments: number;
  };
}
