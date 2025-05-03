import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const UserFormDialog = ({
  open,
  formData,
  setFormData,
  onSave,
  onClose,
  users,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.userName?.trim()) {
      newErrors.userName = "Mã nhân viên không được để trống";
    }
    if (!formData.fullName?.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
    }
    if (!formData.id) {
      if (!formData.password) {
        newErrors.password = "Mật khẩu không được để trống";
      } else if (formData.password.length < 6) {
        newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
      }
      if (!formData.role) {
        newErrors.role = "Quyền không được để trống";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave();
    }
  };

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setFormData({ ...formData, [field]: value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: undefined });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <DialogTitle>
        {formData.id ? "Cập Nhật Người Dùng" : "Thêm Người Dùng"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Mã nhân viên"
          fullWidth
          margin="dense"
          value={formData.userName ?? ""}
          onChange={handleChange("userName")}
          error={Boolean(errors.userName)}
          helperText={errors.userName}
        />
        <TextField
          label="Họ và tên"
          fullWidth
          margin="dense"
          value={formData.fullName ?? ""}
          onChange={handleChange("fullName")}
          error={Boolean(errors.fullName)}
          helperText={errors.fullName}
        />

        {/* Chỉ hiển thị password và role nếu là thêm mới */}
        {!formData.id && (
          <>
            <TextField
              type="password"
              label="Mật khẩu"
              fullWidth
              margin="dense"
              value={formData.password ?? ""}
              onChange={handleChange("password")}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <FormControl fullWidth margin="dense" error={Boolean(errors.role)}>
              <InputLabel id="user-role-label">Quyền</InputLabel>
              <Select
                labelId="user-role-label"
                id="user-role-select"
                value={formData.role ?? ""}
                onChange={handleChange("role")}
                label="Quyền"
              >
                <MenuItem value="">-- Chọn quyền --</MenuItem>
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.name}>
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.role && <FormHelperText>{errors.role}</FormHelperText>}
            </FormControl>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSave} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFormDialog;
