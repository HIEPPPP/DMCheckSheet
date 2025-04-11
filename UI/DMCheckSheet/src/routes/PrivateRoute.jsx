// components/PrivateRoute.jsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth?.token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
