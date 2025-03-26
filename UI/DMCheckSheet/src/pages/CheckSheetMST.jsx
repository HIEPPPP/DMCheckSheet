import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckSheetTable from "../components/UI/CheckSheetTable";
import CheckSheetFormDialog from "../components/UI/CheckSheetFormDialog";
import { Add } from "@mui/icons-material";

const CheckSheetMST = () => {
  const [checkSheets, setCheckSheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [formData, setFormData] = useState({
    id: null,
    formNo: "",
    sheetName: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    var fetchData = async () => {
      // const response = await getListDevice();
      // setDevices(response);
    };

    fetchData();
  }, []);

  const handleOpenForm = (checkSheet = null) => {
    if (checkSheet) {
      setFormData(checkSheet); // Gán dữ liệu khi sửa
    } else {
      setFormData({
        id: null,
        formNo: "",
        sheetName: "",
      });
    }
    setOpen(true);
  };
  const handleSave = async () => {
    if (formData.id) {
      // Update
    } else {
      // Create
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh sách Check Sheet</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(true)}
      >
        Thêm Check Sheet
      </Button>

      <CheckSheetTable checkSheets={checkSheets} onEdit={handleOpenForm} />

      <CheckSheetFormDialog
        open={open}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default CheckSheetMST;
