import { Box, Button, Card, Grid2, IconButton, TextField, Tooltip, Typography } from "@mui/material";
import { Book } from "../helpers/book";
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { deleteBook, saveBook } from "../storage/book.storage";
import { useEffect, useState } from "react";
import { ConfirmationDialog } from "../common/ConfirmationDialog";
import { exportEpub } from "../helpers/file-saver";
import { useLoaderData, useNavigate } from "react-router-dom";
import { defaultSaveDebounce } from "../helpers/constants";
import { PageContainer } from "../common/PageContainer";

export function BookPage() {
  const data = useLoaderData() as { book: Book };
  const navigate = useNavigate();

  const [book, setBook] = useState(data.book);
  const [deleteOpen, setDeleteOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => saveBook(book), defaultSaveDebounce);
    return () => clearTimeout(timer);
  }, [book]);

  return (
    <PageContainer>
      <Grid2 container spacing={2} direction="column">
        <Card>
          <Grid2 container p={2} justifyContent="space-between">
            <Box display="flex">
              <IconButton sx={{ mr: 2 }} onClick={() => { saveBook(book); navigate("/"); }}>
                <ArrowBackIcon />
              </IconButton>

              <Typography variant="h4">
                {book.title ? book.title : "Untitled"}
              </Typography>
            </Box>

            <Grid2 container spacing={2}>
              <Tooltip title="Download ePub">
                <IconButton onClick={() => exportEpub(book)}>
                  <DownloadIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete">
                <IconButton color="error" onClick={() => setDeleteOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>

              <ConfirmationDialog
                open={deleteOpen}
                title="Delete Book"
                action="Delete"
                onClose={() => setDeleteOpen(false)}
                onConfirm={() => {
                  deleteBook(book);
                  navigate("/");
                }}
              >
                Are you sure you want to delete this Book?
              </ConfirmationDialog>
            </Grid2>
          </Grid2>
        </Card>

        <Card>
          <Grid2 container spacing={2} p={2}>
            <Grid2 size={{ xs: 12, md: 5 }}>
              <Button
                component="label"
                sx={{ width: "100%", p: 0, overflow: "hidden", borderRadius: 2, height: "450px", border: book.image ? "none" : "1px solid lightgray" }}
              >
                {!book.image && "Choose Cover"}
                {book.image && (
                  <img
                    style={{width: "100%", height: "100%", objectFit: "cover" }}
                    src={book.image}
                  />
                )}
                <input
                  style={{ display: "none" }}
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0];
                    if (!selectedFile) return;
                    const blobFile = new Blob([selectedFile], { type: selectedFile.type });
                    const reader = new FileReader();
                    reader.readAsDataURL(blobFile);
                    reader.onload = () => {
                      setBook({ ...book, image: reader.result as string });
                    }
                  }}
                />
              </Button>
            </Grid2>

            <Grid2 container  size={{ xs: 12, md: 7 }} spacing={2} direction="column">
              <TextField
                fullWidth
                label="Title"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
              />

              <TextField
                fullWidth
                label="Author"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
              />

              <TextField
                fullWidth
                label="Description"
                value={book.description}
                onChange={(e) => setBook({ ...book, description: e.target.value })}
                multiline
                minRows={8}
              />
            </Grid2>
          </Grid2>
        </Card>

        <Card>
          <Grid2 container spacing={2} p={2} direction="column">
            <Typography variant="h5">
              Chapters
            </Typography>

            <Grid2 container spacing={1} p={2}>
              {book.chapters.map((chapter, index) => (
                <Grid2 key={index + "-" + chapter.title} size={{ xs: 12, md: 4 }} display="flex" justifyContent="center">
                  <Button
                    fullWidth
                    onClick={() => { saveBook(book); navigate(`/book/${book.id}/chapter/${chapter.id}`) }}
                  >
                    {index + 1}. {chapter.title}
                  </Button>
                </Grid2>
              ))}
            </Grid2>

            <Button
              onClick={() => setBook({
                ...book,
                chapters: [
                  ...book.chapters,
                  {
                    title: `Chapter ${book.chapters.length + 1}`,
                    id: Date.now().toString()
                  }
                ]
              })}
            >
              Add Chapter
            </Button>
          </Grid2>
        </Card>
      </Grid2>
    </PageContainer>
  );
}