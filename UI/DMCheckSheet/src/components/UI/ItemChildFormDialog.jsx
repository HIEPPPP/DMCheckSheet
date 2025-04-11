import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from "@mui/material";

const ItemChildFormDialog = ({
  open,
  onClose,
  formData,
  onSave,
  setFormData,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm nội dung con</DialogTitle>
      <DialogContent>
        <TextField
          label="Parent ID"
          fullWidth
          margin="dense"
          value={formData.parentId ?? ""}
          disabled
        />
        <TextField
          label="Nội dung"
          fullWidth
          margin="dense"
          value={formData.content ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
        />
        <TextField
          label="Vị trí"
          fullWidth
          margin="dense"
          value={formData.orderNumber ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, orderNumber: e.target.value })
          }
        />
        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel id="data-type-label">Kiểu dữ liệu</InputLabel>
          <Select
            labelId="data-type-label"
            value={formData.dataType ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, dataType: e.target.value })
            }
            label="Kiểu dữ liệu"
          >
            <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
            <MenuItem value="TEXT">TEXT</MenuItem>
            <MenuItem value="NUMBER">NUMBER</MenuItem>
            <MenuItem value="DATE">DATE</MenuItem>
          </Select>
        </FormControl>
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

export default ItemChildFormDialog;
