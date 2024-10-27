import { Box, Button, CircularProgress } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { CropWrapper } from "./CropWrapper";
import { createWorker, RecognizeResult } from "tesseract.js";

enum Coloration {
  Grayscale = "Grayscale",
  Monochrome = "Monochrome",
  Colored = "Coloured",
}

type PictureScannerProps = {
  onScanned: (result: RecognizeResult) => void;
}

export const PictureScanner = ({ onScanned }: PictureScannerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const [coloration, setColoration] = useState<Coloration>(Coloration.Grayscale);
  const [imageUrl, setImageUrl] = useState<string>();
  const [isScanning, setIsScanning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 100, height: 100 });


  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const image = imageRef.current!;

    ctx.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    
    if (coloration === Coloration.Monochrome) {
      ctx.filter = "grayscale(1) contrast(100) brightness(1)";
    } else if (coloration === Coloration.Grayscale) {
      ctx.filter = "grayscale(1)";
    }

    // Convert crop from percentage to pixels
    const pxCrop = {
      x: crop.x * image.naturalWidth / 100,
      y: crop.y * image.naturalHeight / 100,
      width: crop.width * image.naturalWidth / 100,
      height: crop.height * image.naturalHeight / 100
    };

    ctx.drawImage(
      image,
      pxCrop.x,
      pxCrop.y,
      pxCrop.width,
      pxCrop.height,
      -pxCrop.width / 2,
      -pxCrop.height / 2,
      pxCrop.width,
      pxCrop.height
    );

    ctx.restore();
  }, [rotation, crop, canvasRef, coloration]);

  const getCanvasBlob = async () => {
    const canvas = canvasRef.current!;
    const image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
  }

  const scan = async () => {
    setIsScanning(true);
    const worker = await createWorker('eng');
    const imageBlob = await getCanvasBlob();
    const result = await worker.recognize(imageBlob);
    await worker.terminate();
    onScanned(result);
    setIsScanning(false);
  }

  return (
    <Box width="100%" p={2}>
      <CropWrapper
        hidden={!imageUrl}
        crop={crop}
        rotation={rotation}
        onCrop={setCrop}
        onRotate={setRotation}
      >
        <canvas ref={canvasRef} style={{ width: "calc(100% - 100px)", maxHeight: 800 }}></canvas>
      </CropWrapper>

      <Box display="flex" justifyContent="space-between" p={2}>
        <Button
          component="label"
          sx={{ flex: 1 }}
        >
          Select Image
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            onChange={(event) => {
              const selectedFile = event.target.files?.[0];
              if (!selectedFile) return;
              const blobFile = new Blob([selectedFile], { type: selectedFile.type });
              const blobUrl = URL.createObjectURL(blobFile);
              setImageUrl(blobUrl);
            }}
          />

          <img
            ref={imageRef}
            src={imageUrl}
            style={{ display: "none" }}
            onLoad={() => {
              const canvas = canvasRef.current!;
              const image = imageRef.current!;
    
              canvas.width = image.naturalWidth;
              canvas.height = image.naturalHeight;
    
              setCrop({ x: 0, y: 0, width: 100, height: 100 });
            }}
          />
        </Button>

        <Button
          sx={{ flex: 1 }}
          disabled={isScanning || !imageUrl}
          onClick={scan}
        >
          {isScanning && (
            <CircularProgress sx={{ mr: 1}} size={20} />
          )}
          {isScanning ? "Scanning..." : "Scan"}
        </Button>

        <Button
          disabled={!imageUrl}
          sx={{ flex: 1 }}
          onClick={() => {
            switch (coloration) {
              case Coloration.Monochrome:
                setColoration(Coloration.Colored);
                break;
              case Coloration.Colored:
                setColoration(Coloration.Grayscale);
                break;
              case Coloration.Grayscale:
                setColoration(Coloration.Monochrome);
                break;
            }
          }}
        >
          {coloration}
        </Button>
      </Box>
    </Box>
  );
};
