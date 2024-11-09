import { RecognizeResult, Line, Word } from "tesseract.js";

type ParsingContext = {
  html: string;
  lastIndent: number;
}

export const parseTesseractResult = (result: RecognizeResult) => {
  const context = createInitialContext();
  for (const line of result.data.lines) {
    processLine(line, context);
  }
  return context.html;
}

const processLine = (line: Line, context: ParsingContext) => {
  const indent = line.bbox.x0;

  const isStartOfSentence = /^[^a-zA-Z0-9]*[A-Z]/.test(line.text);
  const isParagraph = indent > context.lastIndent + 10 && isStartOfSentence;
  if (isParagraph) {
    context.html += "</p><p>";
  } else {
    context.lastIndent = indent;
  }

  for (const word of line.words) {
    processWord(word, context);
  }

  if (line.text.endsWith("\n\n")) {
    context.html += "</p><p>";
  }
}

const processWord = (word: Word, context: ParsingContext) => {
  const isJoinedWord = word.text.endsWith("-");
  const wordText = isJoinedWord ? word.text.slice(0, word.text.length - 1) : word.text;
  context.html += wordText + (isJoinedWord ? "" : " ");
}

const createInitialContext = (): ParsingContext => {
  return {
    html: "",
    lastIndent: Infinity
  }
}