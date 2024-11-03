import { Box, Button } from "@mui/material";
import { Editor } from '@tiptap/react'
import { RecognizeResult } from "tesseract.js";
import { useEffect, useRef } from "react";
import { saveLastScan } from "../storage/scan.storage";
import { ContentEditor } from "../common/ContentEditor";

type ScanSanitizerProps = {
  rawScan: RecognizeResult;
  onComplete: () => void;
}

export function ScanSanitizer({ rawScan, onComplete }: ScanSanitizerProps) {
  const editorRef = useRef<Editor>(null);

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
    editorRef.current!.commands.setContent(paragraph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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