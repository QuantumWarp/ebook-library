import { Box, Button, ButtonGroup, Grid2 } from "@mui/material";
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode } from "react";

type ContentEditorProps = {
  children: ReactNode;
  editorRef: React.MutableRefObject<Editor | null>;
  initialContent?: string;
  onUpdate?: () => void;
}

export function ContentEditor({ editorRef, initialContent, children, onUpdate }: ContentEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || "",
  })!;
  if (onUpdate) editor.on("update", onUpdate);
  editorRef.current = editor;

  return (
    <Grid2 container spacing={2} direction="column">
      <Box display="flex" justifyContent="space-between">
        <ButtonGroup>
          <Button
            variant={editor.isActive('bold') ? "contained" : "outlined"}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </Button>
          <Button
            variant={editor.isActive('italic') ? "contained" : "outlined"}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </Button>
        </ButtonGroup>

        <Box>
          {children}
        </Box>
      </Box>

      <Box
        border="1px solid"
        borderColor="text.light"
        borderRadius={2}
        minHeight={500}
        boxSizing="border-box"
        sx={({ palette }) => ({
          cursor: "text",
          py: "1px",
          px: "20px",
          borderColor: palette.grey[800],
          '&:hover': {
            borderColor: palette.grey[100],
          },
          "&:has(.ProseMirror-focused)": {
            borderColor: palette.primary.main,
            borderWidth: 2,
            py: 0,
            px: "19px"
          }
        })}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </Box>
    </Grid2>
  );
}
