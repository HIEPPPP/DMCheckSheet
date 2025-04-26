import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { login } from "../services/authService";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";

const Login = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!employeeId || !password) {
      setError("Vui lòng nhập đầy đủ Employee ID và Password.");
      return;
    }

    try {
      const response = await login(employeeId, password);
      if (!response || !response.token) {
        setError("Tài khoản hoặc mật khẩu không đúng.");
        setPassword("");
        return;
      }
      // Lưu thông tin vào context
      loginUser(response);
      navigate("/dashboard");
    } catch (err) {
      setError("Đã xảy ra lỗi khi đăng nhập.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-8 text-center text-4xl">Sign In</h2>

        {error && <p className="mb-4 text-red-600 text-sm">{error}</p>}

        <TextField
          label="Employee ID"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          size="small"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle fontSize="inherit" />
              </InputAdornment>
            ),
          }}
        />

        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
          <InputLabel size="small">Password</InputLabel>
          <OutlinedInput
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  size="small"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="info"
          size="small"
          fullWidth
        >
          Log In
        </Button>
      </form>
    </div>
  );
};

export default Login;
