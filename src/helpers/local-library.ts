import { Book } from "../models/book";
import { Summary } from "../models/summary";

export const getSummaries = (): Summary[] => {
  const result = localStorage.getItem("summaries");
  const summaries: Summary[] = result ? JSON.parse(result) : [];
  return summaries.sort((a, b) => a.title.localeCompare(b.title));
}

export const updateSummaries = async (book: Book) => {
  const summaries = getSummaries();

  const index = summaries.findIndex(summary => summary.id === book.id);

  if (index !== -1) {
    summaries.splice(index, 1);
  }

  summaries.push({
    id: book.id,
    image: book.image,
    title: book.title,
    description: book.description,
    author: book.author,
  });

  localStorage.setItem("summaries", JSON.stringify(summaries));
}

export const getBook = (id: string): Book => {
  const result = localStorage.getItem(`book-${id}`);
  return JSON.parse(result!);
}

export const saveBook = (book: Book): void => {
  localStorage.setItem(`book-${book.id}`, JSON.stringify(book));
  updateSummaries(book);
}

export const deleteBook = (id: string): void => {
  localStorage.removeItem(`book-${id}`);
  const summaries = getSummaries();
  const index = summaries.findIndex(summary => summary.id === id);
  summaries.splice(index, 1);
  localStorage.setItem("summaries", JSON.stringify(summaries));
}

export const saveLastScan = (content: string) => {
  localStorage.setItem("last-scan", content);
}

export const getLastScan = () => {
  return localStorage.getItem("last-scan");
}
