import { KeyboardArrowDown, KeyboardArrowLeft, KeyboardArrowRight, KeyboardArrowUp, KeyboardDoubleArrowDown, KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight, KeyboardDoubleArrowUp, Rotate90DegreesCcw, Rotate90DegreesCw, RotateLeft, RotateRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";

const cropInc = 0.5;
const largeCropInc = 5;
const rotInc = 1;

type Crop = {
  x: number;
  y: number;
  width: number;
  height: number;
}

type CropWrapperProps = {
  children: React.ReactNode;
  hidden: boolean;
  crop: Crop;
  rotation: number;
  onRotate: (rotation: number) => void;
  onCrop: (crop: Crop) => void;
}

export const CropWrapper = ({
  children,
  hidden,
  crop,
  rotation,
  onRotate,
  onCrop
}: CropWrapperProps) => {

  return (
    <Box display="flex" flexDirection="column" alignItems="center" sx={{ display: hidden ? "none" : "flex" }}>
      <Box display="flex" justifyContent="space-between" width="100%">
        <Box>
          <IconButton onClick={() => onRotate(rotation - 90)}>
            <Rotate90DegreesCcw />
          </IconButton>
          <IconButton onClick={() => onRotate(rotation - rotInc)}>
            <RotateLeft />
          </IconButton>
        </Box>

        <Box>
          <IconButton
            disabled={crop.height - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, y: crop.y + largeCropInc, height: crop.height - largeCropInc })}
          >
            <KeyboardDoubleArrowDown />
          </IconButton>
          <IconButton
            disabled={crop.height - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, y: crop.y + cropInc, height: crop.height - cropInc })}
          >
            <KeyboardArrowDown />
          </IconButton>
          <IconButton
            disabled={crop.y - cropInc < 0}
            onClick={() => onCrop({ ...crop, y: crop.y - cropInc, height: crop.height + cropInc })}
          >
            <KeyboardArrowUp />
          </IconButton>
          <IconButton
            disabled={crop.y - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, y: crop.y - largeCropInc, height: crop.height + largeCropInc })}
          >
            <KeyboardDoubleArrowUp />
          </IconButton>
        </Box>
        
        <Box>
          <IconButton onClick={() => onRotate(rotation + rotInc)}>
            <RotateRight />
          </IconButton>
          <IconButton onClick={() => onRotate(rotation - 90)}>
            <Rotate90DegreesCw />
          </IconButton>
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" flexDirection="column">
          <IconButton
            disabled={crop.width - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, x: crop.x + largeCropInc, width: crop.width - largeCropInc })}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
          <IconButton
            disabled={crop.width - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, x: crop.x + cropInc, width: crop.width - cropInc })}
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            disabled={crop.x - cropInc < 0}
            onClick={() => onCrop({ ...crop, x: crop.x - cropInc, width: crop.width + cropInc })}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            disabled={crop.x - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, x: crop.x - largeCropInc, width: crop.width + largeCropInc })}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
        </Box>

        {children}
        
        <Box display="flex" flexDirection="column">
          <IconButton
            disabled={crop.width - largeCropInc < 0}
            onClick={() => onCrop({ ...crop, width: crop.width - largeCropInc })}
          >
            <KeyboardDoubleArrowLeft />
          </IconButton>
          <IconButton
            disabled={crop.width - cropInc < 0}
            onClick={() => onCrop({ ...crop, width: crop.width - cropInc })}
          >
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton
            disabled={crop.x + crop.width + cropInc > 100}
            onClick={() => onCrop({ ...crop, width: crop.width + cropInc })}
          >
            <KeyboardArrowRight />
          </IconButton>
          <IconButton
            disabled={crop.x + crop.width + largeCropInc > 100}
            onClick={() => onCrop({ ...crop, width: crop.width + largeCropInc })}
          >
            <KeyboardDoubleArrowRight />
          </IconButton>
        </Box>
      </Box>

      <Box>
        <IconButton
          disabled={crop.height - largeCropInc < 0}
          onClick={() => onCrop({ ...crop, y: crop.y, height: crop.height - largeCropInc })}
        >
          <KeyboardDoubleArrowUp />
        </IconButton>
        <IconButton
          disabled={crop.height - cropInc < 0}
          onClick={() => onCrop({ ...crop, y: crop.y, height: crop.height - cropInc })}
        >
          <KeyboardArrowUp />
        </IconButton>
        <IconButton
          disabled={crop.y + crop.height + cropInc > 100}
          onClick={() => onCrop({ ...crop, y: crop.y, height: crop.height + cropInc })}
        >
          <KeyboardArrowDown />
        </IconButton>
        <IconButton
          disabled={crop.y + crop.height + largeCropInc > 100}
          onClick={() => onCrop({ ...crop, y: crop.y, height: crop.height + largeCropInc })}
        >
          <KeyboardDoubleArrowDown />
        </IconButton>
      </Box>
    </Box>
  );
};
