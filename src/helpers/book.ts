export type Book = {
  id: string;
  rights: string;
  title: string;
  image: string;
  description: string;
  author: string;
  chapters: {
    id: string;
    title: string;
  }[]
}
