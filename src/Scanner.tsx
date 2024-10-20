import { createWorker } from 'tesseract.js';
import { Jimp } from 'jimp';
import { useState } from 'react';
import { exportEpub } from './helpers/file-saver';


export function Scanner() {
  const [imageBlob, setImageBlob] = useState<string>();

  const scan = async () => {
    const image1 = await Jimp.read("http://localhost:5173/test3.jpg");
    image1.greyscale()
    const base64 = await image1.getBase64("image/png")
    setImageBlob(base64)

    console.log("doing it")

    const worker = await createWorker('eng');
    const ret = await worker.recognize(base64);
    console.log(ret);
    await worker.terminate();
  }

  return (
    <div>
      Scanner
      <img src={imageBlob} height={500} />

      <button onClick={scan}>
        Test
      </button>

      <button onClick={exportEpub}>
        Export
      </button>
    </div>
  )
}