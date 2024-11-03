import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ReactNode } from "react";

type ConfirmationDialogProps = {
  title: string;
  children: ReactNode;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  action?: string;
}

export function ConfirmationDialog({
  title,
  children,
  open,
  onConfirm,
  onClose,
  action = "Confirm",
}: ConfirmationDialogProps) {
  return (
    <Dialog open={open}>
      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>
          Cancel
        </Button>

        <Button
          color="error"
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
