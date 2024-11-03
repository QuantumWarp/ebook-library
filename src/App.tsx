import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = createTheme({
    palette: {
      mode: 'light',
      background: {
        default: '#f0f0f0',
      },
    },
    colorSchemes: {
      dark: prefersDarkMode
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
