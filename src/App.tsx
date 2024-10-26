import { useRef } from "react";
import { PictureAdjuster } from "./components/PictureAdjuster";
import { Scanner } from "./components/Scanner";

export function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div>
      Test
      <PictureAdjuster canvasRef={canvasRef} />
      <Scanner canvasRef={canvasRef} />
    </div>
  );
}
