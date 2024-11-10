import { v4 as uuidv4 } from "uuid";
import { Book } from "../book";

const parser = new DOMParser();

export const deserializeOepbs = (xmlString: string): { book: Book, filenames: string[] } => {
  const xml = parser.parseFromString(xmlString, "application/xml");

  const book: Book = {
    id: uuidv4(),
    rights: xml.querySelector("rights")?.textContent || "",
    title: xml.querySelector("title")?.textContent || "",
    author: xml.querySelector("creator")?.textContent || "",
    description: xml.querySelector("description")?.textContent || "",
    image: "",
    chapters: []
  };

  const filenames = deserializeFilenames(xml);

  return { book, filenames };
}

const deserializeFilenames = (xml: XMLDocument): string[] => {
  const manifest = xml.querySelectorAll("manifest item");
  const manifestItems = Array.from(manifest).map((x) => ({
    id: x.id,
    filename: x.getAttribute("href")
  })).filter((x) => x.filename && x.id !== "nav");

  const elements = xml.querySelectorAll("spine itemref");
  const itemIds = Array.from(elements).map((x) => x.getAttribute("idref"));
  const filenames = itemIds
    .map((x) => manifestItems.find((y) => x === y.id)?.filename as string)
    .filter((x) => Boolean(x));

  return filenames;
}
