import { useState } from "react";
import { Library } from "./library/Library";
import { Box } from "@mui/material";
import { BookEditorController } from "./book/BookEditorController";
import { Book } from "./models/book";
import { ScannerPage } from "./scanner/ScannerPage";
import { PageFooter } from "./PageFooter";

export function MainPage() {
  const [book, setBook] = useState<Book>();
  const [scanner, setScanner] = useState(false);

  return (
    <Box p={2} pt={8} display="flex" justifyContent="center" flexDirection="column" alignItems="center" height="100vh">
      <Box flex={1}>
        {scanner && <ScannerPage onBack={() => setScanner(false)} />}

        <Box display={scanner ? "none" : "block"}>
          {!book && <Library setBook={setBook} />}

          {book && (
            <BookEditorController
              initialBook={book}
              onScan={() => setScanner(true)}
              onBack={() => setBook(undefined)}
            />
          )}
        </Box>
      </Box>

      <PageFooter />
    </Box>
  );
}
