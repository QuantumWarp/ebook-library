import { Button, Grid2, Typography } from "@mui/material";
import { BookTile } from "./BookTile";
import { getBooks, saveBook } from "../storage/book.storage";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../common/PageContainer";

export function LibraryPage() {
  const navigate = useNavigate();
  const books = useMemo(() => getBooks(), []);

  const createNewBook = () => {
    const newBook = {
      id: Date.now().toString(),
      image: "",
      title: "",
      description: "",
      author: "",
      chapters: [],
    };
    saveBook(newBook);
    navigate(`/book/${newBook.id}`);
  }

  return (
    <PageContainer>
      <Grid2 container display="flex" flexDirection="column" alignItems="center" spacing={8}>
        <Typography variant="h2">
          eBook Library
        </Typography>
        <Typography textAlign="center">
          This application lets you scan, edit, import and export your library of ebooks for personal use. You can only import and export files in the epub file format.
        </Typography>

        <Grid2 container spacing={2}>
          <Button variant="contained" sx={{ width: 100 }} onClick={createNewBook}>New</Button>
          <Button variant="contained" sx={{ width: 100 }}>Import</Button>
        </Grid2>

        <Grid2 container spacing={3} display="flex" flexDirection="column">
          {books.map(book => (
            <Grid2 size={12} key={book.id}>
              <BookTile
                key={book.id}
                book={book}
                onSelect={() => navigate(`/book/${book.id}`)}
              />
            </Grid2>
          ))}
        </Grid2>
      </Grid2>
    </PageContainer>
  );
}