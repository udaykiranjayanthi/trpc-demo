export type Blog = {
  id: string;
  title: string;
  subTitle: string;
  body: string;
  createdAt: string;
  author: string;
};

export type BlogFormData = {
  title: string;
  subTitle: string;
  body: string;
  author: string;
};

export type Comment = {
  id: string;
  blogId: string;
  text: string;
  createdAt: string;
};
