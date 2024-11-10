import { DarkMode, HelpOutline, LightMode } from "@mui/icons-material";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Tooltip, Typography, useColorScheme } from "@mui/material";
import { useState } from "react";

export function PageFooter() {
  const { mode, setMode } = useColorScheme();
  const year = new Date().getFullYear();
  const [openAbout, setOpenAbout] = useState(false);

  return (
    <Box p={2} display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="center" mb={1}>
        <Tooltip title="About this app" placement="top">
          <IconButton onClick={() => setOpenAbout(true)}>
            <HelpOutline />
          </IconButton>
        </Tooltip>

        <Tooltip title={mode !== 'dark' ? "Dark mode" : "Light mode"} placement="top">
          <IconButton onClick={() => setMode(mode !== 'dark' ? 'dark' : 'light')}>
            {mode === 'dark' && <LightMode />}
            {mode !== 'dark' && <DarkMode />}
          </IconButton>
        </Tooltip>
      </Box>

      <Dialog open={openAbout}>
        <DialogTitle>About the eBook Library</DialogTitle>

        <DialogContent>
          This app was initially made to scan a copy of books to be usedin eReaders,
          but then turned into a more general eBook library & creator.
          To see more technical information about this app check the README.md of the Github repo.
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAbout(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Typography variant="body2">
        Copyright © {year}
      </Typography>
    </Box>
  );
}