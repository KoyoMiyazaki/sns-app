export interface Post {
  id: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface PostWithCommentCount extends Post {
  _count: {
    comments: number;
  };
}
