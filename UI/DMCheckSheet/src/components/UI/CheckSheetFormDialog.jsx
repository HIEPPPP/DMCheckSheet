import { Label } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Select,
  TextField,
  DialogContent,
  MenuItem,
} from "@mui/material";
import React from "react";

const CheckSheetFormDialog = ({
  open,
  formData,
  setFormData,
  onSave,
  onClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <DialogTitle>
        {formData.id ? "Cập Nhật Check Sheet" : "Thêm Check Sheet"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã Form"
          fullWidth
          margin="dense"
          value={formData.formNO ?? ""}
          onChange={(e) => setFormData({ ...formData, formNO: e.target.value })}
        />
        <TextField
          label="Mã Check Sheet"
          fullWidth
          margin="dense"
          value={formData.sheetCode ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, sheetCode: e.target.value })
          }
        />
        <TextField
          label="Tên Sheet"
          fullWidth
          margin="dense"
          value={formData.sheetName ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, sheetName: e.target.value })
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onSave} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckSheetFormDialog;
