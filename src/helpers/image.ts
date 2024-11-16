export const readAndCompressImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.8): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = reject;
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onerror = reject;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        let { width, height } = img;
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (maxWidth / width) * height;
            width = maxWidth;
          } else {
            width = (maxHeight / height) * width;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob((blob) => resolve(blob!), "jpg", quality);
      };
    };
  });
};
