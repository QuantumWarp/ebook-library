import { Book } from "../book";

const serializer = new XMLSerializer();

export const serializeNav = (book: Book): string => {
  const xml = document.implementation.createDocument("http://www.w3.org/1999/xhtml", "nav", null);
  const nav = xml.documentElement;
  nav.setAttributeNS("xmlns", "epub", "http://www.idpf.org/2007/ops");
  nav.setAttributeNS("epub", "type", "toc");

  const xmlDeclaration = xml.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"');
  xml.prepend(xmlDeclaration);

  const header = xml.createElement("h1");
  header.textContent = "Table of Contents";
  nav.appendChild(header);

  const list = xml.createElement("ol");
  nav.appendChild(list);

  for (const chapter of book.chapters) {
    const listEl = xml.createElement("li");
    list.appendChild(listEl);
    
    const link = xml.createElement("a");
    link.setAttribute("href", chapter.id + ".xhtml");
    link.textContent = chapter.title;
    listEl.appendChild(link);
  }

  return serializer.serializeToString(xml);
}
