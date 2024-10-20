type Chapter = {
  title: string;
  content: string;
}

export type Ebook = {
  title: string;
  author: string;
  chapters: Chapter[];
}