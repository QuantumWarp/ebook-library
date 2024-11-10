import { Box, Button, Card, Grid2, IconButton, TextField } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Book } from "../helpers/book";
import { saveBook } from "../storage/book.storage";
import { deleteChapterContent, getChapterContent, saveChapterContent } from "../storage/chapter.storage";
import { defaultSaveDebounce } from "../helpers/constants";
import { PageContainer } from "../common/PageContainer";
import { ContentEditor } from "../common/ContentEditor";
import { getLastScan } from "../storage/scan.storage";
import { ConfirmationDialog } from "../common/ConfirmationDialog";

export function ChapterPage() {
  const data = useLoaderData() as { book: Book };
  const { chapterId } = useParams() as { chapterId: string };
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  const initialContent = useMemo(() => getChapterContent(chapterId), [chapterId]);

  const [dirty, setDirty] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [book, setBook] = useState(data.book);
  const chapter = book.chapters.find((x) => x.id === chapterId)!;

  const updateChapterName = (title: string) => {
    const updatedChapters = book.chapters.map((ch) =>
      ch.id === chapterId ? { ...ch, title } : ch
    );
    setBook({ ...book, chapters: updatedChapters });
  };

  useEffect(() => {
    const timer = setTimeout(() => saveBook(book), defaultSaveDebounce);
    return () => clearTimeout(timer);
  }, [book]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveChapterContent(chapterId, editorRef.current!.getHTML());
      setDirty(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [chapterId, dirty]);

  return (
    <PageContainer>
      <Grid2 container spacing={2} direction="column">
        <Card>
          <Grid2 container p={2}>
            <Box display="flex" alignItems="center" flex={1}>
              <IconButton onClick={() => {
                saveBook(book);
                saveChapterContent(chapterId, editorRef.current!.getHTML());
                navigate(`/book/${book.id}`)
              }}>
                <ArrowBackIcon />
              </IconButton>

              <TextField
                sx={{ flex: 1, maxWidth: "500px", mx: 2 }}
                label="Title"
                value={chapter.title}
                onChange={e => updateChapterName(e.target.value)}
              />
            </Box>

            <Grid2 container alignItems="center">
              <IconButton
                color="error"
                onClick={() => setDeleteDialog(true)}
              >
                <DeleteIcon />
              </IconButton>

              <ConfirmationDialog
                open={deleteDialog}
                title="Delete Chapter"
                action="Delete"
                onClose={() => setDeleteDialog(false)}
                onConfirm={() => {
                  deleteChapterContent(chapter.id);
                  const updatedChapters = book.chapters.filter((x) => x.id !== chapterId);
                  saveBook({ ...book, chapters: updatedChapters });
                  navigate("/book/" + book.id);
                }}
              >
                Are you sure you want to delete this Chapter?
              </ConfirmationDialog>
            </Grid2>
          </Grid2>
        </Card>

        <Card>
          <Box p={2}>
            <ContentEditor
              editorRef={editorRef}
              initialContent={initialContent}
              onUpdate={() => setDirty(true)}
            >
              <Button
                onClick={() => {
                  const lastScan = getLastScan();
                  if (!lastScan) return;
                  editorRef.current!.commands.insertContent(lastScan);
                }}
              >
                Paste Last Scan
              </Button>

              <Button onClick={() => {
                saveBook(book);
                saveChapterContent(chapterId, editorRef.current!.getHTML());
                navigate("/scanner");
              }}>
                Scanner
              </Button>
            </ContentEditor>
          </Box>
        </Card>
      </Grid2>
    </PageContainer>
  );
}