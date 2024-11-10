import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, IconButton, Typography } from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  QuestionMark as QuestionMarkIcon,
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
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <PageContainer>
      <Grid2 container spacing={2} direction="column">
        <Card sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Grid2 container>
            <IconButton sx={{ mr: 2 }} onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>

            <Typography variant="h4">
              Scanner
            </Typography>
          </Grid2>

          <IconButton onClick={() => setInfoOpen(true)}>
            <QuestionMarkIcon />
          </IconButton>

          <Dialog open={infoOpen}>
            <DialogTitle>Scanner Information</DialogTitle>

            <DialogContent>
              <Typography mb={2}>
                To use the scanner effectively, make sure the image you use is very sharp,
                has no shadows and has nothing else in the image. You can use the controls
                to rotate and crop the image to help with this.
              </Typography>
              <Typography>
                Usually the text reading will not be perfect, edit the result after scan as
                appropriate, including adding bold & italics etc. Once you click complete
                you will be able to use <b>Paste Last Scan</b> to paste it into your chapter.
              </Typography>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setInfoOpen(false)}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
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