import { RecognizeResult } from "tesseract.js";

export const parseTesseractResult = (result: RecognizeResult) => {
  let paragraph = '<p>';
  let lineStart = 0;
  console.log(result)
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
