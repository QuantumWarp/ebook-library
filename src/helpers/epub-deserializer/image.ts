import JSZip from "jszip";
const parser = new DOMParser();

export const deserializeImage = async (zip: JSZip, xmlString: string): Promise<string> => {
  const xml = parser.parseFromString(xmlString, "application/xml");

  let element = xml.querySelector("manifest item#cover");
  element = xml.querySelector("manifest item[properties=cover-image]");
  let url = element?.getAttribute("href")?.replace("./", "") || "";
  url = url.includes("/") ? url : `OEBPS/${url}`;

  if (!url) return Promise.resolve("");
  console.log(url)
  const imageBlob = await zip.file(url)!.async("blob");
  
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(imageBlob);
    reader.onload = () => resolve(reader.result as string || "");
  });
}
