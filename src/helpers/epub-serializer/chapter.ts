import { Book } from "../book";

const serializer = new XMLSerializer();

export const serializeChapter = (chapter: Book["chapters"][0], content: string): string => {
  const xml = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null);
  const html = xml.documentElement;

  const xmlDeclaration = xml.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"');
  xml.prepend(xmlDeclaration);

  const head = xml.createElement("head");
  html.appendChild(head);

  const title = xml.createElement("meta");
  title.setAttribute("name", "chapter-title")
  title.textContent = chapter.title;
  head.appendChild(title);

  const body = xml.createElement("body");
  html.appendChild(body);

  body.innerHTML += content;

  console.log(serializer.serializeToString(xml))
  return serializer.serializeToString(xml);
}
