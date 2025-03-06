import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashBoard from "./Dashboard";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await login(username, password);
    if (response != null) {
      navigate("/dashboard");
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card sx={{ width: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography
            variant="h4"
            component="div"
            textAlign="center"
            gutterBottom
          >
            Login DM
          </Typography>
          <TextField
            fullWidth
            label="Mã nhân viên"
            variant="outlined"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
