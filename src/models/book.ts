import { Chapter } from "./chapter";

export type Book = {
  id: string;
  image: string;
  title: string;
  description: string;
  author: string;
  chapters: Chapter[];
}