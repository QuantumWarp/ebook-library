import { Book } from "../models/book";
import { BookPage } from "./BookPage";
import { useState } from "react";
import { Chapter } from "../models/chapter";
import { ChapterPage } from "./ChapterPage";
import { Box } from "@mui/material";

type BookEditorControllerProps = {
  initialBook: Book;
  onScan: () => void;
  onBack: () => void;
}

export function BookEditorController({ initialBook, onScan, onBack }: BookEditorControllerProps) {
  const [book, setBook] = useState<Book>(initialBook);
  const [chapter, setChapter] = useState<Chapter>();

  const replaceChapter = (updated: Chapter) => {
    if (!chapter) return;
    const index = book.chapters.indexOf(chapter);
    book.chapters.splice(index, 1, updated);
    setBook(book);
  };

  const deleteChapter = () => {
    if (!chapter) return;
    const index = book.chapters.indexOf(chapter);
    book.chapters.splice(index, 1);
    setBook(book);
    setChapter(undefined);
  };

  return (
    <Box display="flex">
      {!chapter && (
        <BookPage
          book={book}
          updateBook={setBook}
          onChapterSelect={setChapter}
          onBack={onBack}
        />
      )}
      
      {chapter && (
        <ChapterPage
          chapter={chapter}
          updateChapter={replaceChapter}
          onScan={onScan}
          onDelete={deleteChapter}
          onBack={() => setChapter(undefined)}
        />
      )}
    </Box>
  );
}