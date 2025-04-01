import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Add } from "@mui/icons-material";

import {
  getListCheckSheet,
  createCheckSheet,
  updateCheckSheet,
  updateCancelFlagCS,
} from "../services/checkSheetServices";
import ConfirmDialog from "../components/ConfirmDialog";
import CheckSheetTable from "../components/UI/CheckSheetTable";
import CheckSheetFormDialog from "../components/UI/CheckSheetFormDialog";
import Notification from "../components/Notification";

const CheckSheetMST = () => {
  const [checkSheets, setCheckSheets] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [formData, setFormData] = useState({
    sheetId: null,
    formNO: "",
    sheetCode: "",
    sheetName: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    var fetchData = async () => {
      const response = await getListCheckSheet();
      setCheckSheets(response);
    };

    fetchData();
  }, []);

  const handleOpenForm = (checkSheet = null) => {
    if (checkSheet) {
      setFormData(checkSheet);
    } else {
      setFormData({
        sheetId: null,
        formNO: "",
        sheetCode: "",
        sheetName: "",
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (formData.sheetId) {
      // Update
      const res = await updateCheckSheet(formData.sheetId, formData);
      res != null
        ? setSnackbar({ open: true, message: "Cập nhật thành công" })
        : setSnackbar({
            open: true,
            message: "Cập nhật thất bại",
            severity: "error",
          });
    } else {
      // Create
      const res = await createCheckSheet(formData);
      res != null
        ? setSnackbar({ open: true, message: "Thêm mới thành công" })
        : setSnackbar({
            open: true,
            message: "Thêm mới thất bại",
            severity: "error",
          });
    }
    setOpen(false);
    const response = await getListCheckSheet();
    setCheckSheets(response);
  };

  const handleDelete = async (checkSheetId) => {
    var res = await updateCancelFlagCS(checkSheetId);
    if (res) {
      setSnackbar({ open: true, message: "Xóa thành công" });
      const response = await getListCheckSheet();
      setCheckSheets(response);
    } else {
      setSnackbar({
        open: true,
        message: "Xóa thất bại",
        severity: "error",
      });
    }
    setConfirmDelete(null);
  };

  const handleCancelForm = () => {
    setFormData({
      sheetId: null,
      formNO: "",
      sheetCode: "",
      sheetName: "",
    });
    setOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh sách Check Sheet</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleCancelForm()}
      >
        Thêm Check Sheet
      </Button>

      <CheckSheetTable
        checkSheets={checkSheets}
        onEdit={handleOpenForm}
        onDelete={setConfirmDelete}
      />

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
        title="Xóa Check Sheet"
        content="Bạn có chắc chắn muốn xóa Check Sheet này không?"
      />

      <CheckSheetFormDialog
        open={open}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setOpen(false)}
      />

      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default CheckSheetMST;
