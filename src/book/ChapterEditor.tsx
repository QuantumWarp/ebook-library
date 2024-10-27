import { Box, Button, Grid2 } from "@mui/material";
import { Chapter } from "../models/chapter";
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { getLastScan } from "../helpers/local-library";

type ChapterEditorProps = {
  editorRef: React.MutableRefObject<Editor | null>;
  chapter: Chapter;
  onScannerClick: () => void;
}

export function ChapterEditor({ editorRef, chapter, onScannerClick }: ChapterEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: chapter.content,
  })!;
  editorRef.current = editor;

  return (
    <Grid2 container spacing={2} direction="column">
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Button
            sx={{ backgroundColor: editor.isActive('bold') ? 'lightgrey' : '' }}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </Button>
          <Button
            sx={{ backgroundColor: editor.isActive('italic') ? 'lightgrey' : '' }}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </Button>
        </Box>

        <Box>
          <Button
            onClick={() => {
              const lastScan = getLastScan();
              if (!lastScan) return;
              editor.commands.insertContent(lastScan);
            }}
          >
            Paste Last Scan
          </Button>

          <Button onClick={onScannerClick}>
            Scanner
          </Button>
        </Box>
      </Box>

      <Box
        border="1px solid lightgrey"
        borderRadius={2}
        minHeight={500}
        px={2}
        sx={{ cursor: "text" }}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </Box>
    </Grid2>
  );
}