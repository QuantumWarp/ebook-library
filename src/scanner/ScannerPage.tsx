import { Card, Grid2, IconButton, Typography } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { PictureScanner } from "./PictureScanner";
import { useState } from "react";
import { ScanSanitizer } from "./ScanSanitizer";
import { RecognizeResult } from "tesseract.js";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "../common/PageContainer";

export function ScannerPage() {
  const navigate = useNavigate();
  const [rawScan, setRawScan] = useState<RecognizeResult>();

  return (
    <PageContainer>
      <Grid2 container spacing={2} direction="column">
        <Card>
          <Grid2 container p={2}>
            <IconButton sx={{ mr: 2 }} onClick={() => navigate(-1)}>
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

        {rawScan && (
          <Card>
            <ScanSanitizer rawScan={rawScan} onComplete={() => navigate(-1)} />
          </Card>
        )}
      </Grid2>
    </PageContainer>
  );
}