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
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../contexts/AuthContext";
import { getUserByUsername } from "../services/usersService";

const User = () => {
  const [user, setUser] = useState({});

  const userContext = useContext(AuthContext);
  console.log(userContext.auth.username);

  const [open, setOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }
    // TODO: gọi API đổi mật khẩu tại đây
    alert("Đổi mật khẩu thành công!");
    handleClose();
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
            {user.fullName.charAt(0).toUpperCase()}
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
          <Button onClick={handleClose}>Hủy</Button>
          <Button variant="contained" onClick={handleChangePassword}>
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default User;
