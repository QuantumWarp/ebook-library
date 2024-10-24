import { useEffect, useState } from "react";
import { PictureAdjuster } from "./components/PictureAdjuster";
import { Jimp } from "jimp";
import { Scanner } from "./components/Scanner";

export function App() {
  const [imageBlob, setImageBlob] = useState<string>();

  useEffect(() => {
    async function getImage() {
      const image = await Jimp.read("http://localhost:5173/test3.jpg");
      const base64 = await image.getBase64("image/png");
      setImageBlob(base64);
    }
    getImage();
  }, []);


  return (
    <div>
      Test
      <PictureAdjuster initialBlob={imageBlob!} />
      <Scanner imageBlob={imageBlob!} />
    </div>
  );
}
