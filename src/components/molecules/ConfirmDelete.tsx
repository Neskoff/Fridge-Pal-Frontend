import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CircularProgress } from "@mui/material";

interface DeleteProductConfirmationProps {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleDelete: () => void;
}

const DeleteProductConfirmation = ({
  open,
  handleClose,
  handleDelete,
  loading,
}: DeleteProductConfirmationProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle>Delete Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this product?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>No</Button>
        <Button
          disabled={loading}
          variant="contained"
          color="error"
          onClick={() => {
            handleDelete();
          }}
        >
          {(loading && <CircularProgress color="secondary" size="1rem" />) ||
            "Yes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteProductConfirmation;
