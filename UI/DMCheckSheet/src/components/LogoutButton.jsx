import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { Button } from "@mui/material";
import { FiLogOut } from "react-icons/fi";

const LogoutButton = () => {
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <button
      className="ml-auto text-[#333] hover:text-red-500 transition-all"
      onClick={handleLogout}
    >
      <FiLogOut size={22} />
    </button>
  );
};

export default LogoutButton;
