import JSZip from "jszip";
import { Book } from "./book";
import { serializeContainer } from "./epub-serializer/container";
import { serializeOepbs } from "./epub-serializer/oebps";
import { serializeChapter } from "./epub-serializer/chapter";
import { getChapterContent, saveChapterContent } from "../storage/chapter.storage";
import { serializeNav } from "./epub-serializer/nav";
import { deserializeOepbs } from "./epub-deserializer/oebps";
import { deserializeChapter } from "./epub-deserializer/chapter";
import { serializeImage } from "./epub-serializer/image";
import { deserializeImage } from "./epub-deserializer/image";

// See https://www.w3.org/TR/epub-33/ for more information
export const serialize = async (book: Book): Promise<JSZip> => {
  const zip = new JSZip();
  
  zip.file("mimetype", "application/epub+zip");
  zip.file("META-INF/container.xml", serializeContainer());
  zip.file("OEBPS/content.opf", serializeOepbs(book));
  zip.file("OEBPS/nav.html", serializeNav(book));
  
  const imageBlob = await serializeImage(book.image);
  if (imageBlob) zip.file("images/cover.png", imageBlob);

  for (const chapter of book.chapters) {
    const content = getChapterContent(chapter.id);
    zip.file(`OEBPS/${chapter.id}.xhtml`, serializeChapter(chapter, content));
  }

  return zip;
}

export const deserialize = async (zip: JSZip): Promise<Book> => {
  const mimetype = await zip.file("mimetype")?.async("string");
  if (mimetype !== "application/epub+zip") throw new Error("Invalid EPUB mimetype");

  const contentFile = await zip.file("OEBPS/content.opf")!.async("string");
  const { book, filenames } = deserializeOepbs(contentFile);
  book.image = await deserializeImage(zip, contentFile);

  for (const chapterFilename of filenames) {
    const chapterFile = await zip.file(`OEBPS/${chapterFilename}`)!.async("string");
    const index = filenames.indexOf(chapterFilename);
    const { content, title } = deserializeChapter(chapterFile, index);
    const chapter = { id: chapterFilename.replace(/\.[^/.]+$/, ""), title };
    book.chapters.push(chapter);
    saveChapterContent(chapter.id, content);
  }

  return book;
}
