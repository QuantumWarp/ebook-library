import JSZip from "jszip";
import { Ebook } from "./ebook";

// See https://www.w3.org/TR/epub-33/ for more information
export const exportEpub = (ebook: Ebook) => {
  const zip = new JSZip();

  zip.file("mimetype", "application/epub+zip");

  zip.file("META-INF/container.xml", 
`<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`
);

  // Add OEBPS/content.opf (metadata for the EPUB)
  zip.file("OEBPS/content.opf",
`<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="BookId" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
    <dc:title>${ebook.title}</dc:title>
    <dc:creator>${ebook.author}</dc:creator>
    <dc:language>en</dc:language>
    <dc:identifier>${ebook.title.toLowerCase().replace(/\s/g, "_")}</dc:identifier>
  </metadata>
  <manifest>
    <item id="nav" href="nav.html" media-type="application/xhtml+xml" properties="nav"/>
    <item id="chapter1" href="chapter1.xhtml" media-type="application/xhtml+xml"/>
  </manifest>
  <spine>
    <itemref idref="chapter1"/>
  </spine>
</package>
  `);

  // Add a chapter (XHTML format)
  zip.file("OEBPS/chapter1.xhtml", `<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>Chapter 1</title></head>
<body>
  <h1>Chapter 1</h1>
  <p>This is the first chapter of the sample EPUB book.</p>
</body>
</html>
  `);

  // Add a navigation file
  zip.file("OEBPS/nav.html", `<?xml version="1.0" encoding="UTF-8"?>
<nav xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" epub:type="toc">
  <h1>Table of Contents</h1>
  <ol>
    <li><a href="chapter1.xhtml">Chapter 1</a></li>
    <!-- Add more chapters as needed -->
  </ol>
</nav>
  `);

  // Generate the ZIP (EPUB) and trigger download
  zip.generateAsync({ type: "blob" })
      .then(function (blob) {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "sample5.epub";
          link.click();
      });
};