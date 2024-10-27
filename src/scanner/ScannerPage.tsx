import { Card, Grid2, IconButton, Typography } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { PictureScanner } from "./PictureScanner";
import { useState } from "react";
import { ScanSanitizer } from "./ScanSanitizer";
import { RecognizeResult } from "tesseract.js";

type ScannerPageProps = {
  onBack: () => void;
}

export function ScannerPage({ onBack }: ScannerPageProps) {
  const [rawScan, setRawScan] = useState<RecognizeResult>();

  return (
    <Grid2 container spacing={2} direction="column" width={800}>
      <Card>
        <Grid2 container p={2}>
          <IconButton sx={{ mr: 2 }} onClick={onBack}>
            <ArrowBackIcon />
          </IconButton>

          <Typography variant="h4">
            Scanner
          </Typography>
        </Grid2>
      </Card>

      <Card>
        <PictureScanner onScanned={setRawScan} />
      </Card>

      {rawScan && <Card>
        <ScanSanitizer rawScan={rawScan} onComplete={onBack} />
      </Card>}
    </Grid2>
  );
}