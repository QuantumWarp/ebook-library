import { DarkMode, LightMode } from "@mui/icons-material";
import { Box, IconButton, Typography, useColorScheme } from "@mui/material";

export function PageFooter() {
  const { mode, setMode } = useColorScheme();
  const year = new Date().getFullYear();

  return (
    <Box p={2} display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" justifyContent="center" mb={1}>
        <IconButton onClick={() => setMode(mode !== 'dark' ? 'dark' : 'light')}>
          {mode === 'dark' && <LightMode />}
          {mode !== 'dark' && <DarkMode />}
        </IconButton>
      </Box>

      <Typography variant="body2">
        Copyright © {year}
      </Typography>
    </Box>
  );
}