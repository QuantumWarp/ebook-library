import { useRef, useState, useEffect } from "react";

const cropInc = 20;
const rotInc = 1;

type PictureAdjusterProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}

export const PictureAdjuster = ({ canvasRef }: PictureAdjusterProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const [rotation, setRotation] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const image = imageRef.current!;

    ctx.clearRect(0, 0, image.naturalWidth, image.naturalHeight);
    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.filter = "grayscale(100%)";

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      -crop.width / 2,
      -crop.height / 2,
      crop.width,
      crop.height
    );

    ctx.restore();
  }, [rotation, crop, canvasRef]);

  return (
    <div>
      <h3>Image Editor</h3>
      <canvas ref={canvasRef} style={{ width: "500px" }}></canvas>

      <div>
        <button onClick={() => setCrop({ ...crop, x: crop.x + cropInc, width: crop.width - cropInc })}>
          Crop Left
        </button>
        
        <button onClick={() => setCrop({ ...crop, width: crop.width - cropInc })}>
          Crop Right
        </button>
        
        <button onClick={() => setCrop({ ...crop, y: crop.y + cropInc, height: crop.height - cropInc })}>
          Crop Top
        </button>
        
        <button onClick={() => setCrop({ ...crop, height: crop.height - cropInc })}>
          Crop Bottom
        </button>
      </div>

      <div>
        <button onClick={() => setRotation(rotation - rotInc)}>
          Rotate Left
        </button>

        <button onClick={() => setRotation(rotation + rotInc)}>
          Rotate Right
        </button>
      </div>

      <img
        ref={imageRef}
        src="http://localhost:5173/test1.jpg"
        alt="Editable"
        style={{ display: "none" }} // Hide the image element
        onLoad={() => {
          const canvas = canvasRef.current!;
          const image = imageRef.current!;

          canvas.width = image.naturalWidth;
          canvas.height = image.naturalHeight;

          const ctx = canvas.getContext("2d")!;
          setCrop({ x: 0, y: 0, width: image.naturalWidth, height: image.naturalHeight });
          ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
        }}
      />
    </div>
  );
};
