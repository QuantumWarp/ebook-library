import { Box } from "@mui/material";
import { ReactNode } from "react"
import { PageFooter } from "./PageFooter";

type PageContainerProps = {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return (
    <Box p={2} pt={8} display="flex" flexDirection="column" alignItems="center" height="100vh">
      <Box flex={1} maxWidth={1200} width="100%">
        {children}
      </Box>
      
      <PageFooter />
    </Box>
  )
}
