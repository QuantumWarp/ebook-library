import JSZip from "jszip";
import { Book } from "./book";
import { serializeContainer } from "./epub-parser/container";
import { serializeOepbs } from "./epub-parser/oebps";
import { serializeChapter } from "./epub-parser/chapter";
import { getChapterContent } from "../storage/chapter.storage";
import { serializeNav } from "./epub-parser/nav";

// See https://www.w3.org/TR/epub-33/ for more information
export const serialize = (book: Book): JSZip => {
  const zip = new JSZip();
  
  zip.file("mimetype", "application/epub+zip");
  zip.file("META-INF/container.xml", serializeContainer());
  zip.file("OEBPS/content.opf", serializeOepbs(book));
  zip.file("OEBPS/nav.html", serializeNav(book));

  for (const chapter of book.chapters) {
    const content = getChapterContent(chapter.id);
    zip.file(`OEBPS/${chapter.id}.xhtml`, serializeChapter(chapter, content));
  }

  return zip;
}
