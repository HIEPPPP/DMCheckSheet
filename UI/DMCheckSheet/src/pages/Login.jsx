import * as React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Alert,
  IconButton,
  TextField,
  Avatar,
  Box,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    alert(
      `Logging in with Employee ID: ${formData.get(
        "employeeId"
      )}, Password: ${formData.get("password")}`
    );
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form component="form" onSubmit={handleSubmit}>
        {/* <Box display="flex" justifyContent="center" mb={2}>
          <InputAdornment>
            <BadgeIcon
              className="text-gray-600 mb-8"
              style={{ fontSize: "4rem" }}
            />
          </InputAdornment>
        </Box> */}
        <h2 className="mb-8 text-center font- text-4xl">Sign In</h2>
        <TextField
          id="input-with-icon-textfield"
          label="Employee ID"
          name="employeeId"
          type="text"
          size="small"
          required
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle fontSize="inherit" />
                </InputAdornment>
              ),
            },
          }}
          variant="outlined"
        />
        <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
          <InputLabel size="small" htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            name="password"
            size="small"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="small"
                >
                  {showPassword ? (
                    <VisibilityOff fontSize="inherit" />
                  ) : (
                    <Visibility fontSize="inherit" />
                  )}
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
          disableElevation
          fullWidth
          sx={{ my: 2 }}
        >
          Log In
        </Button>
      </form>
    </div>
  );
};
export default Login;
