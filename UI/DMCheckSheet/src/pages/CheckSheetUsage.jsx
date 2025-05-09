import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const CheckSheetUsage = () => {
  const { code } = useParams();
  const parts = code?.split("-") || [];
  const deviceCode = parts[0];
  const checkSheetCode = parts[1];
  const user = useContext(AuthContext);
  return <div>CheckSheetUsage</div>;
};

export default CheckSheetUsage;
