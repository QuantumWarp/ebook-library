import { createWorker, RecognizeResult } from 'tesseract.js';
import { exportEpub } from '../helpers/file-saver';
import { FloatingMenu, BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react';

type ScannerProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export function Scanner({ canvasRef }: ScannerProps) {
  const [isScanning, setIsScanning] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit],
    content: "Nothing",
  })

  const getCanvasBlob = async () => {
    const canvas = canvasRef.current!;
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

  const scan = async () => {
    setIsScanning(true);
    const worker = await createWorker('eng');
    const imageBlob = await getCanvasBlob();
    const result = await worker.recognize(imageBlob);
    const extracted = await exractContent(result);
    editor?.commands.setContent(extracted);
    console.log(result)
    console.log(extracted)
    await worker.terminate();
    setIsScanning(false);
  }

  const exractContent = async (result: RecognizeResult) => {
    let paragraph = '<p>';
    let lineStart = 0;
    for (const line of result.data.lines) {
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
    return paragraph;
  }

  return (
    <div>
      Scanner


      <EditorContent editor={editor} />
      <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
      <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>

      <button onClick={scan}>
        {isScanning ? 'Scanning...' : 'Scan'}
      </button>

      <button onClick={exportEpub}>
        Export
      </button>
    </div>
  )
}