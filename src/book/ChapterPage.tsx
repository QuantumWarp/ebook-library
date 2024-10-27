import { Box, Card, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { Chapter } from "../models/chapter";
import { ChapterEditor } from "./ChapterEditor";
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { useRef, useState } from "react";
import { Editor } from "@tiptap/react";

type ChapterPageProps = {
  chapter: Chapter;
  updateChapter: (chapter: Chapter) => void;
  onScan: () => void;
  onDelete: () => void;
  onBack: () => void;
}

export function ChapterPage({ chapter, updateChapter, onScan, onDelete, onBack }: ChapterPageProps) {
  const editorRef = useRef<Editor>(null);
  const [editTitle, setEditTitle] = useState(false);

  return (
    <Grid2 container spacing={2} direction="column" width={800}>
      <Card>
        <Grid2 container p={2} justifyContent="space-between">
          <Box display="flex">
            <IconButton sx={{ mr: 2 }} onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>

            {!editTitle && (
              <Typography variant="h4">
                {chapter.title}
              </Typography>
            )}

            {editTitle && (
              <TextField
                sx={{ width: "400px" }}
                label="Title"
                value={chapter.title}
                onChange={e => updateChapter({ ...chapter, title: e.target.value })}
              />
            )}
          </Box>

          <Grid2 container spacing={2}>
            <IconButton onClick={() => updateChapter({ ...chapter, content: editorRef.current!.getHTML() })}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => setEditTitle(editTitle => !editTitle)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Grid2>
        </Grid2>
      </Card>

      <Card>
        <Box p={2}>
          <ChapterEditor editorRef={editorRef} chapter={chapter} onScannerClick={onScan} />
        </Box>
      </Card>
    </Grid2>
  );
}