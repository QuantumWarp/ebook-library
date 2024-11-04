import { Book } from "../book";

const serializer = new XMLSerializer();

export const personalRights = "Personal";

export const serializeOepbs = (book: Book): string => {
  const xml = document.implementation.createDocument("http://www.idpf.org/2007/opf", "package", null);
  const packageEl = xml.documentElement;
  packageEl.setAttribute("unique-identifier", book.id);
  packageEl.setAttribute("version", "3.0");

  const xmlDeclaration = xml.createProcessingInstruction("xml", 'version="1.0" encoding="UTF-8"');
  xml.prepend(xmlDeclaration);

  const metadata = serializeMetadata(xml, book);
  packageEl.appendChild(metadata);

  const manifest = serializeManifest(xml, book);
  packageEl.appendChild(manifest);

  const spine = serializeSpine(xml, book);
  packageEl.appendChild(spine);

  return serializer.serializeToString(xml);
}

const serializeMetadata = (xml: XMLDocument, book: Book): HTMLElement => {
  const metadata = xml.createElement("metadata");
  metadata.setAttributeNS("xmlns", "dc", "http://purl.org/dc/elements/1.1/");
  metadata.setAttributeNS("xmlns", "opf", "http://www.idpf.org/2007/opf");

  const identifier = xml.createElementNS("dc", "identifier");
  identifier.textContent = book.id;
  metadata.appendChild(identifier);

  const rights = xml.createElementNS("dc", "rights");
  rights.textContent = personalRights;
  metadata.appendChild(rights);

  const title = xml.createElementNS("dc", "title");
  title.textContent = book.title;
  metadata.appendChild(title);
  
  const creator = xml.createElementNS("dc", "creator");
  creator.textContent = book.author;
  metadata.appendChild(creator);
  
  const language = xml.createElementNS("dc", "language");
  language.textContent = "en";
  metadata.appendChild(language);
  
  const description = xml.createElementNS("dc", "description");
  description.textContent = book.description;
  metadata.appendChild(description);

  return metadata;
}

const serializeManifest = (xml: XMLDocument, book: Book): HTMLElement => {
  const manifest = xml.createElement("manifest");

  const navItem = xml.createElement("item");
  navItem.id = "nav";
  navItem.setAttribute("href", "nav.html");
  navItem.setAttribute("media-type", "application/xhtml+xml");
  navItem.setAttribute("properties", "nav");
  manifest.appendChild(navItem);

  for (const chapter of book.chapters) {
    const item = xml.createElement("item");
    item.id = chapter.id;
    item.setAttribute("href", chapter.id + ".xhtml");
    item.setAttribute("media-type", "application/xhtml+xml");
    manifest.appendChild(item);
  }

  const image = xml.createElement("item");
  image.id = "cover";
  image.setAttribute("href", "./images/cover.png");
  image.setAttribute("properties", "cover-image");
  image.setAttribute("media-type", "image/png");
  manifest.appendChild(image);

  return manifest;
}

const serializeSpine = (xml: XMLDocument, book: Book): HTMLElement => {
  const spine = xml.createElement("spine");

  for (const chapter of book.chapters) {
    const item = xml.createElement("itemref");
    item.setAttribute("idref", chapter.id);
    spine.appendChild(item);
  }

  return spine;
}
