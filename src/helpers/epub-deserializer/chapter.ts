const parser = new DOMParser();

export const deserializeChapter = (xmlString: string, index: number): { content: string, title: string } => {
  const xml = parser.parseFromString(xmlString, "application/xml");

  return {
    content: xml.querySelector("body")?.innerHTML || "",
    title: xml.querySelector("head meta[name=chapter-title]")?.textContent || `Chapter ${index}`,
  };
}
