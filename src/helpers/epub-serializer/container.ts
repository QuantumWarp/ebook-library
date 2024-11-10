const serializer = new XMLSerializer();

export const serializeContainer = (): string => {
  const xml = document.implementation.createDocument("urn:oasis:names:tc:opendocument:xmlns:container", "container", null);
  const container = xml.documentElement;
  container.setAttribute("version", "1.0");

  const xmlDeclaration = xml.createProcessingInstruction("xml", 'version="1.0"');
  xml.prepend(xmlDeclaration);

  const rootfiles = xml.createElementNS("urn:oasis:names:tc:opendocument:xmlns:container", "rootfiles");
  container.appendChild(rootfiles);

  const rootfile = xml.createElementNS("urn:oasis:names:tc:opendocument:xmlns:container", "rootfile");
  rootfile.setAttribute("full-path", "OEBPS/content.opf");
  rootfile.setAttribute("media-type", "application/oebps-package+xml");
  rootfiles.appendChild(rootfile);

  return serializer.serializeToString(xml);
}
