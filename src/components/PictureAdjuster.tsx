import { Jimp } from 'jimp';
import { useEffect, useState } from 'react';
import { Rotations, Side } from '../helpers/enums';

const cropAmount = 100;
const rotateAmount = 90;

type PictureAdjusterProps = {
  initialBlob: string;
}

export function PictureAdjuster({ initialBlob }: PictureAdjusterProps) {
  const [imageBlob, setImageBlob] = useState<string>(initialBlob);

  const reset = async () => {
    setImageBlob(initialBlob);
  };

  useEffect(() => {
    setImageBlob(initialBlob);
  }, [initialBlob])

  const crop = async (side: Side) => {
    const image = await Jimp.read(imageBlob!);
    const { width, height } = image;

    switch (side) {
      case Side.Left:
        image.crop({ x: cropAmount, y: 0, w: width - cropAmount, h: height });
        break;
      case Side.Right:
        image.crop({ x: 0, y: 0, w: width - cropAmount, h: height });
        break;
      case Side.Top:
        image.crop({ x: 0, y: cropAmount, w: width, h: height- cropAmount   });
        break;
      case Side.Bottom:
        image.crop({ x: 0, y: 0, w: width, h: height - cropAmount });
        break;
    }
    
    const base64 = await image.getBase64("image/png");
    setImageBlob(base64);
  };

  const rotate = async (direction: Rotations) => {
    const image = await Jimp.read(imageBlob!);
  
    switch (direction) {
      case Rotations.Clockwise:
        image.rotate(-rotateAmount);
        break;
      case Rotations.Counterclockwise:
        image.rotate(rotateAmount);
        break;
    }
    
    const base64 = await image.getBase64("image/png");
    setImageBlob(base64);
  }

  const sanitize = async () => {
    const image = await Jimp.read(imageBlob!);
    image.greyscale();
    const base64 = await image.getBase64("image/png");
    setImageBlob(base64);
  }

  return (
    <div>
      Adjust
      <img src={imageBlob} height={500} />

      <button onClick={() => reset()}>
        Reset
      </button>
      
      <button onClick={() => crop(Side.Left)}>
        Crop Left
      </button>
      
      <button onClick={() => crop(Side.Right)}>
        Crop Right
      </button>
      
      <button onClick={() => crop(Side.Top)}>
        Crop Top
      </button>
      
      <button onClick={() => crop(Side.Bottom)}>
        Crop Bottom
      </button>

      <button onClick={() => rotate(Rotations.Counterclockwise)}>
        Rotate Left
      </button>

      <button onClick={() => rotate(Rotations.Clockwise)}>
        Rotate Right
      </button>

      <button onClick={() => sanitize()}>
        Sanitize
      </button>
    </div>
  )
}