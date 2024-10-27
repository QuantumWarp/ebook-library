import { Box, Button, Card, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { Book } from "../models/book";
import { Chapter } from "../models/chapter";
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Save as SaveIcon
} from "@mui/icons-material";
import { saveBook } from "../helpers/local-library";

type BookPageProps = {
  book: Book;
  updateBook: (book: Book) => void;
  onChapterSelect: (chapter: Chapter) => void;
  onBack: () => void;
}

export function BookPage({ book, updateBook, onChapterSelect, onBack }: BookPageProps) {
  return (
    <Grid2 container spacing={2} direction="column" width={800}>
      <Card>
        <Grid2 container p={2} justifyContent="space-between">
          <Box display="flex">
            <IconButton sx={{ mr: 2 }} onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h4">
              {book.title ? book.title : "Untitled"}
            </Typography>
          </Box>

          <Grid2 container spacing={2}>
            <IconButton onClick={() => saveBook(book)}>
              <SaveIcon />
            </IconButton>

            <IconButton onClick={() => updateBook({ ...book, image: "" })}>
              <DownloadIcon />
            </IconButton>

            <IconButton onClick={() => updateBook({ ...book, image: "" })}>
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </Card>

      <Card>
        <Grid2 container spacing={2} p={2}>
          <Grid2 size={5}>
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
                    updateBook({ ...book, image: reader.result as string });
                  }
                }}
              />
            </Button>
          </Grid2>

          <Grid2 container size={7} spacing={2} direction="column">
            <TextField
              fullWidth
              label="Title"
              value={book.title}
              onChange={(e) => updateBook({ ...book, title: e.target.value })}
            />

            <TextField
              fullWidth
              label="Author"
              value={book.author}
              onChange={(e) => updateBook({ ...book, author: e.target.value })}
            />

            <TextField
              fullWidth
              label="Description"
              value={book.description}
              onChange={(e) => updateBook({ ...book, description: e.target.value })}
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
              <Grid2 key={index + "-" + chapter.title} size={4} display="flex" justifyContent="center">
                <Button
                  fullWidth
                  onClick={() => onChapterSelect(chapter)}
                >
                  {index + 1}. {chapter.title}
                </Button>
              </Grid2>
            ))}
          </Grid2>

          <Button
            onClick={() => updateBook({ ...book, chapters: [...book.chapters, { title: `Chapter ${book.chapters.length + 1}`, content: "" }] })}
          >
            Add Chapter
          </Button>
        </Grid2>
      </Card>
    </Grid2>
  );
}