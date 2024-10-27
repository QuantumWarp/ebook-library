import { Box, Button, Grid2 } from "@mui/material";
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { saveLastScan } from "../helpers/local-library";
import { RecognizeResult } from "tesseract.js";
import { useEffect } from "react";

type ScanSanitizerProps = {
  rawScan: RecognizeResult;
  onComplete: () => void;
}

export function ScanSanitizer({ rawScan, onComplete }: ScanSanitizerProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Nothing",
  })!;

  useEffect(() => {
    let paragraph = '<p>';
    let lineStart = 0;
    for (const line of rawScan.data.lines) {
      if (line.baseline.x0 > lineStart + 50 || line === line.paragraph.lines[0]) {
        if (paragraph !== '') paragraph += '</p>';
        paragraph += '<p>';
      }
      lineStart = line.baseline.x0;
      for (const word of line.words) {
        paragraph += word.text + ' ';
      }
    }
    paragraph += '</p>';
    editor.commands.setContent(paragraph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawScan]);

  return (
    <Grid2 container spacing={2} direction="column" p={2}>
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
              saveLastScan(editor.getHTML());
              onComplete();
            }}
          >
            Complete
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