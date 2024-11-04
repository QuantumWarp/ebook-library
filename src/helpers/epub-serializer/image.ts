export const serializeImage = async (dataURL: string): Promise<Blob | null> => {
  return new Promise((resolve) => {
    if (!dataURL) return resolve(null);
    const img = new Image();
    img.src = dataURL;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(resolve);
    }
  })
};
