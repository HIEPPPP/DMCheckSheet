import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  TextField,
} from "@mui/material";

const DeviceFormDialog = ({ open, formData, setFormData, onSave, onClose }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>
      {formData.deviceId ? "Cập Nhật Thiết Bị" : "Thêm Thiết Bị"}
    </DialogTitle>
    <DialogContent>
      <TextField
        label="Mã thiết bị"
        fullWidth
        margin="dense"
        value={formData.deviceCode ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, deviceCode: e.target.value })
        }
      />
      <TextField
        label="Tên thiết bị"
        fullWidth
        margin="dense"
        value={formData.deviceName ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, deviceName: e.target.value })
        }
      />
      <TextField
        label="Tần suất"
        fullWidth
        margin="dense"
        value={formData.frequency ?? ""}
        onChange={(e) =>
          setFormData({ ...formData, frequency: e.target.value })
        }
      />
      <TextField
        label="Vị trí"
        fullWidth
        margin="dense"
        value={formData.location ?? ""}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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

export default DeviceFormDialog;
