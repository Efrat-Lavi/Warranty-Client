import React from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogContent,
  Divider,
} from "@mui/material";
import { DeleteOutline as DeleteIcon, Close as CloseIcon } from "@mui/icons-material";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      {/* כותרת עם כפתור סגירה */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", p: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Delete File
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Divider />

      {/* תוכן הדיאלוג */}
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <DeleteIcon sx={{ fontSize: 48, color: "error.main", mb: 1 }} />
          <Typography variant="body1" fontWeight={500}>
            Are you sure you want to delete this file?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            This action cannot be undone.
          </Typography>
        </Box>
      </DialogContent>

      <Divider />

      {/* כפתורים */}
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
      </Box>
    </Dialog>
  );
};

export default DeleteDialog;
