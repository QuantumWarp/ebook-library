import { Book } from "../helpers/book";
import { deleteChapterContent } from "./chapter.storage";

export const getBooks = (): Book[] => {
  const keys = Object.keys(localStorage);
  const bookIds = keys.filter((x) => x.startsWith("book-")).map((x) => x.replace("book-", ""));
  const books = bookIds.map((x) => getBook(x))
  return books.sort((a, b) => a.title.localeCompare(b.title));
}

export const getBook = (id: string): Book => {
  const result = localStorage.getItem(`book-${id}`);
  if (!result) throw new Error("Book not found");
  return JSON.parse(result!);
}

export const saveBook = (book: Book): void => {
  localStorage.setItem(`book-${book.id}`, JSON.stringify(book));
}

export const deleteBook = (book: Book): void => {
  for (const chapter in book.chapters) {
    deleteChapterContent(chapter);
  }
  localStorage.removeItem(`book-${book.id}`);
}
