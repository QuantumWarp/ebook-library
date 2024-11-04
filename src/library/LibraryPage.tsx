import { v4 as uuidv4 } from "uuid";
import { Button, Grid2, Typography } from "@mui/material";
import { BookTile } from "./BookTile";
import { getBooks, saveBook } from "../storage/book.storage";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../common/PageContainer";
import { deserialize } from "../helpers/epub";
import JSZip from "jszip";
import { personalRights } from "../helpers/epub-serializer/oebps";

export function LibraryPage() {
  const navigate = useNavigate();
  const books = useMemo(() => getBooks(), []);

  const createNewBook = () => {
    const newBook = {
      id: uuidv4(),
      rights: personalRights,
      image: "",
      title: "",
      description: "",
      author: "",
      chapters: [],
    };
    saveBook(newBook);
    navigate(`/book/${newBook.id}`);
  };

  const importBook = async (file: File) => {
    const zipData = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(zipData);
    const newBook = await deserialize(zip);
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
          <Button component="label" variant="contained" sx={{ width: 100 }}>
            Import
            <input
              style={{ display: "none" }}
              accept="epub/*"
              type="file"
              onChange={(event) => {
                const selectedFile = event.target.files?.[0];
                if (!selectedFile) return;
                importBook(selectedFile);
              }}
            />
          </Button>
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