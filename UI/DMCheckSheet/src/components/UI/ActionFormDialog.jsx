import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Label } from "@mui/icons-material";

const ActionFormDialog = ({ open, formData, setFormData, onSave, onClose }) => {
  const today = new Date().toISOString().split("T")[0];
  const user = useContext(AuthContext);
  const userCode = user?.auth.username;

  const Android12Switch = styled(Switch)(({ theme }) => ({
    padding: 8,
    "& .MuiSwitch-track": {
      borderRadius: 22 / 2,
      "&::before, &::after": {
        content: '""',
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        width: 16,
        height: 16,
      },
      "&::before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
        left: 12,
      },
      "&::after": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          theme.palette.getContrastText(theme.palette.primary.main)
        )}" d="M19,13H5V11H19V13Z" /></svg>')`,
        right: 12,
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "none",
      width: 16,
      height: 16,
      margin: 2,
    },
  }));

  const hasError = !formData.actionTaken || formData.actionTaken.trim() === "";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <DialogTitle>Cập nhật, xác nhận nội dung khắc phục</DialogTitle>
      <DialogContent>
        <TextField
          label="Tên CheckSheet"
          fullWidth
          margin="dense"
          value={formData.sheetName ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, sheetName: e.target.value })
          }
          disabled
        />
        <TextField
          label="Tên thiết bị"
          fullWidth
          margin="dense"
          value={formData.deviceName ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, deviceName: e.target.value })
          }
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
          disabled
        />
        <TextField
          label="Người Check"
          fullWidth
          margin="dense"
          value={formData.checkedBy ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, checkedBy: e.target.value })
          }
          disabled
        />
        <TextField
          label="Nội dung khắc phục"
          fullWidth
          margin="dense"
          value={formData.actionTaken ?? ""}
          onChange={(e) =>
            setFormData({ ...formData, actionTaken: e.target.value })
          }
          helperText={hasError ? "Vui lòng nhập nội dung khắc phục" : ""}
        />
        <TextField
          type="date"
          label="Ngày khắc phục"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="dense"
          value={formData.actionDate ? formData.actionDate.slice(0, 10) : today}
          onChange={(e) =>
            setFormData({ ...formData, actionDate: e.target.value })
          }
        />
        <TextField
          label="Người xác nhận"
          fullWidth
          margin="dense"
          value={formData.confirmedBy ? formData.confirmedBy : userCode}
          onChange={(e) =>
            setFormData({ ...formData, confirmedBy: e.target.value })
          }
          disabled
        />
        <TextField
          type="date"
          label="Ngày xác nhận"
          fullWidth
          InputLabelProps={{ shrink: true }}
          margin="dense"
          value={
            formData.confirmedDate ? formData.confirmedDate.slice(0, 10) : today
          }
          onChange={(e) =>
            setFormData({ ...formData, confirmedDate: e.target.value })
          }
        />
        <TextField
          label="Ghi chú"
          fullWidth
          margin="dense"
          value={formData.note ?? ""}
          onChange={(e) => setFormData({ ...formData, note: e.target.value })}
        />
        {/* Switch để set formData.value = "OK" khi bật */}

        {/* <FormControlLabel
            control={
              <Switch
                checked={formData.value === "OK"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    value: e.target.checked ? "OK" : "NG",
                  })
                }
              />
            }
            label="OK"
          /> */}
        <FormControlLabel
          control={
            <Android12Switch
              checked={formData.value === "OK"}
              onChange={(_, checked) =>
                setFormData({
                  ...formData,
                  value: checked ? "OK" : "NG",
                })
              }
            />
          }
          label="Xác nhận nội dung kiểm tra OK"
          className="mt-2"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onSave} variant="contained" disabled={hasError}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionFormDialog;
