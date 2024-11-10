import { createHashRouter } from "react-router-dom";
import { LibraryPage } from "./library/LibraryPage";
import { BookPage } from "./book/BookPage";
import { ChapterPage } from "./book/ChapterPage";
import { ScannerPage } from "./scanner/ScannerPage";
import { getBook } from "./storage/book.storage";

export const router = createHashRouter([
  {
    path: "/",
    element: <LibraryPage />,
  },
  {
    path: "/book/:bookId",
    loader: ({ params }) => ({ book: getBook(params.bookId || "")}),
    element: <BookPage />,
  },
  {
    path: "/book/:bookId/chapter/:chapterId",
    loader: ({ params }) => ({ book: getBook(params.bookId || "")}),
    element: <ChapterPage />,
  },
  {
    path: "/scanner",
    element: <ScannerPage />,
  },
]);
