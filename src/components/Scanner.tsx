import { createWorker, RecognizeResult } from 'tesseract.js';
import { useState } from 'react';
import { exportEpub } from '../helpers/file-saver';
import { FloatingMenu, BubbleMenu, useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

type ScannerProps = {
  imageBlob: string;
}

export function Scanner({ imageBlob }: ScannerProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "Nothing",
  })

  const scan = async () => {
    const worker = await createWorker('eng');
    const result = await worker.recognize(imageBlob);
    const extracted = await exractContent(result);
    editor?.commands.setContent(extracted);
    console.log(extracted)
    await worker.terminate();
  }

  const exractContent = async (result: RecognizeResult) => {
    let paragraph = '<p>';
    for (const line of result.data.lines) {
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
        Scan
      </button>

      <button onClick={exportEpub}>
        Export
      </button>
    </div>
  )
}