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
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {formData.id ? "Cập Nhật Check Sheet" : "Thêm Check Sheet"}
      </DialogTitle>
      <DialogContent>
        <FormControl>
          <Select className="w-full">
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Mã Form"
          fullWidth
          margin="dense"
          value={formData.formNo ?? ""}
          onChange={(e) => setFormData({ ...formData, formNo: e.target.value })}
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
