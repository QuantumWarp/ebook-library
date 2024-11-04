import { Box, Button } from "@mui/material";
import { Editor } from '@tiptap/react'
import { RecognizeResult } from "tesseract.js";
import { useEffect, useRef } from "react";
import { saveLastScan } from "../storage/scan.storage";
import { ContentEditor } from "../common/ContentEditor";
import { parseTesseractResult } from "../helpers/ocr";

type ScanSanitizerProps = {
  rawScan: RecognizeResult;
  onComplete: () => void;
}

export function ScanSanitizer({ rawScan, onComplete }: ScanSanitizerProps) {
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    const html = parseTesseractResult(rawScan);
    editorRef.current!.commands.setContent(html);
  }, [rawScan]);

  return (
    <Box p={2}>
      <ContentEditor editorRef={editorRef}>
        <Button
          onClick={() => {
            saveLastScan(editorRef.current!.getHTML());
            onComplete();
          }}
        >
            Complete
        </Button>
      </ContentEditor>
    </Box>
  );
}