import React, { use, useContext, useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Avatar,
  Grid,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../contexts/AuthContext";
import { getUserByUsername } from "../services/usersService";
import { changePassword } from "../services/authService";
import { useNavigate } from "react-router-dom";

const User = () => {
  const [user, setUser] = useState({});

  const userContext = useContext(AuthContext);
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserByUsername(userContext.auth.username);
        setUser(response);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () =>
    setSnackbar((prev) => ({ ...prev, open: false }));

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setSnackbar({
        open: true,
        message: "Vui lòng điền đầy đủ thông tin.",
        severity: "warning",
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      setSnackbar({
        open: true,
        message: "Mật khẩu mới và xác nhận không khớp.",
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // Call API đổi mật khẩu
      const response = await changePassword(oldPassword, newPassword);

      if (response !== null) {
        setSnackbar({
          open: true,
          message: "Đổi mật khẩu thành công!",
          severity: "success",
        });
        handleClose();
        // Reset form
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          // Logout user
          logoutUser();
          navigate("/login");
        }, 2000);
      } else {
        setSnackbar({
          open: true,
          message: "Đổi mật khẩu thất bại, vui lòng thử lại.",
          severity: "error",
        });
      }
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message || "Lỗi hệ thống, vui lòng thử lại sau.";
      setSnackbar({ open: true, message: msg, severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Thông tin người dùng với button space-between */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Left: avatar + info */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            sx={{ bgcolor: "primary.main", width: 64, height: 64, mr: 2 }}
          >
            {user.fullName?.charAt(0).toUpperCase()}
          </Avatar>
          <Box>
            <Typography variant="h5">{user.fullName}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.userName}
            </Typography>
          </Box>
        </Box>

        {/* Right: Đổi mật khẩu */}
        <Button
          variant="outlined"
          startIcon={<LockOutlinedIcon />}
          onClick={handleOpen}
        >
          Đổi mật khẩu
        </Button>
      </Paper>

      {/* Thông tin chi tiết */}
      <Paper elevation={0} sx={{ mt: 3, p: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Thông tin chi tiết
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" gutterBottom>
          <strong>Họ và tên:</strong> {user.fullName}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Mã nhân viên:</strong> {user.userName}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>Quyền:</strong> {user.name}
        </Typography>
      </Paper>

      {/* Dialog đổi mật khẩu */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Đổi mật khẩu</DialogTitle>
        <DialogContent dividers>
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu hiện tại"
            margin="dense"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Mật khẩu mới"
            margin="dense"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            fullWidth
            type="password"
            label="Xác nhận mật khẩu"
            margin="dense"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3 }}>
          <Button onClick={handleClose} disabled={loading}>
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleChangePassword}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Lưu"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default User;
