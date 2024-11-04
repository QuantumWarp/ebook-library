import { Box, Grid2 } from "@mui/material";
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { ReactNode } from "react";
import { ContentEditorControls } from "./ContentEditorControls";

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
      <ContentEditorControls editor={editor}>
        {children}
      </ContentEditorControls>

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
          "&:hover": {
            borderColor: palette.grey[100],
          },
          "&:has(.ProseMirror-focused)": {
            borderColor: palette.primary.main,
            borderWidth: 2,
            py: 0,            
            px: "19px"
          },
          ".ProseMirror-focused": {
            outline: "none"
          }
        })}
        onClick={() => editor.chain().focus().run()}
      >
        <EditorContent editor={editor} />
      </Box>
    </Grid2>
  );
}
