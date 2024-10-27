import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { MainPage } from "./MainPage";

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    colorSchemes: {
      dark: prefersDarkMode
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainPage />
    </ThemeProvider>
  );
}
