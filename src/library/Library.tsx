import { Button, Grid2, Typography } from "@mui/material";
import { Book } from "../models/book";
import { BookTile } from "./BookTile";
import { getBook, getSummaries } from "../helpers/local-library";
import { useMemo } from "react";

type LibraryProps = {
  setBook: (book: Book) => void
}

export function Library({ setBook }: LibraryProps) {
  const summaries = useMemo(() => getSummaries(), []);

  const setNewBook = () => {
    setBook({
      id: Date.now().toString(),
      image: "",
      title: "",
      description: "",
      author: "",
      chapters: [],
    });
  }

  return (
    <Grid2 container display="flex" flexDirection="column" alignItems="center" maxWidth={1000} spacing={8}>
      <Typography variant="h2">
        eBook Library
      </Typography>
      <Typography textAlign="center">
        This application lets you scan, edit, import and export your library of ebooks for personal use. You can only import and export files in the epub file format.
      </Typography>

      <Grid2 container spacing={2}>
        <Button variant="contained" sx={{ width: 100 }} onClick={setNewBook}>New</Button>
        <Button variant="contained" sx={{ width: 100 }}>Import</Button>
      </Grid2>

      <Grid2 container spacing={3} display="flex" flexDirection="column">
        {summaries.map(summary => (
          <Grid2 size={12} key={summary.id}>
            <BookTile
              key={summary.id}
              summary={summary}
              onSelect={() => setBook(getBook(summary.id))}
            />
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}