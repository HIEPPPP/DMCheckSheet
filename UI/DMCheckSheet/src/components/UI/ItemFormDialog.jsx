import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import React from "react";

const ItemFormDialog = ({ open, formData, setFormData, onSave, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {formData.itemId ? "Cập Nhật Nội Dung" : "Thêm Nội Dung"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Parent ID"
          fullWidth
          margin="dense"
          value={formData.parentId ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, parentId: e.target.value })
          }
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
          label="Nội dung"
          fullWidth
          margin="dense"
          value={formData.orderNumber ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, orderNumber: e.target.value })
          }
        />
        <TextField
          label="Nội dung"
          fullWidth
          margin="dense"
          value={formData.dataType ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, dataType: e.target.value })
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

export default ItemFormDialog;
