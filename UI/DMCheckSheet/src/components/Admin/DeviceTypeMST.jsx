import React, { useEffect, useState } from "react";
import { Add, Edit, Delete } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  createDeviceType,
  deleteDeviceType,
  getListDeviceType,
  updateDeviceType,
} from "../../services/deviceTypeServices";

const DeviceTypeMST = () => {
  const [deviceType, setDeviceType] = useState([]);
  const [editType, setEditType] = useState(null);
  const [formData, setFormData] = useState({
    typeId: "",
    typeCode: "",
    typeName: "",
    checkSheetName: "",
    typeDesc: "",
    createAt: "",
    createBy: "",
    updateAt: "",
    updateBy: "",
  });
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [errors, setErrors] = useState({});

  // Kiểm tra dữ liệu đầu vào
  const validate = () => {
    let newErrors = {};
    if (!formData.typeCode.trim())
      newErrors.typeCode = "Mã loại không được để trống!";
    if (!formData.typeName.trim())
      newErrors.typeName = "Tên loại không được để trống!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListDeviceType();
      if (res) setDeviceType(res);
    };
    fetchData();
  }, []);

  const handleOpen = (deviceType) => {
    setEditType(deviceType);
    setFormData(
      deviceType ?? {
        typeId: "",
        typeCode: "",
        typeName: "",
        checkSheetName: "",
        typeDesc: "",
        createAt: "",
        createBy: "",
        updateAt: "",
        updateBy: "",
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditType(null);
    setFormData({
      typeId: "",
      typeCode: "",
      typeName: "",
      checkSheetName: "",
      typeDesc: "",
      createAt: "",
      createBy: "",
      updateAt: "",
      updateBy: "",
    });
  };

  const handleSave = async () => {
    try {
      if (editType) {
        const updateType = await updateDeviceType(editType.typeId, {
          ...formData,
          updateAt: new Date().toISOString(),
          updateBy: null,
        });
        if (updateType) {
          setDeviceType((prev) =>
            prev.map((dt) =>
              dt.typeId === editType.typeId
                ? { ...updateType, typeId: dt.typeId }
                : dt
            )
          );
          setSnackbar({
            open: true,
            message: "Cập nhật thành công!",
            severity: "success",
          });
        }
      } else {
        const newDeviceType = await createDeviceType({
          ...formData,
          createAt: new Date().toISOString(),
          createBy: null,
        });
        if (newDeviceType) {
          setDeviceType([...deviceType, newDeviceType]);
          setSnackbar({
            open: true,
            message: "Thêm thành công!",
            severity: "success",
          });
        }
      }
      handleClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Lỗi! Vui lòng thử lại.",
        severity: "error",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const isDeleted = await deleteDeviceType(id);
      if (isDeleted) {
        setDeviceType(deviceType.filter((d) => d.typeId !== id));
        setSnackbar({
          open: true,
          message: "Xóa thành công!",
          severity: "success",
        });
      }
    } catch (error) {
      setSnackbar({ open: true, message: "Lỗi khi xóa!", severity: "error" });
    }
    setConfirmDelete(null);
  };

  const handleSubmit = () => {
    if (validate()) {
      handleSave();
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh Sách Loại Thiết Bị</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen()}
      >
        Thêm Loại Thiết Bị
      </Button>

      <TableContainer component={Paper} className="mt-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã loại</TableCell>
              <TableCell>Tên loại</TableCell>
              <TableCell>Tên Check Sheet</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceType.map((dt, index) => (
              <TableRow key={dt.typeId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{dt.typeCode}</TableCell>
                <TableCell>{dt.typeName}</TableCell>
                <TableCell>{dt.checkSheetName}</TableCell>
                <TableCell>{dt.typeDesc}</TableCell>
                <TableCell className="flex items-center space-x-2 w-[150px]">
                  <IconButton color="primary" onClick={() => handleOpen(dt)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setConfirmDelete(dt.typeId)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog thêm/sửa */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editType ? "Cập Nhật Loại Thiết Bị" : "Thêm Loại Thiết Bị"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Mã loại"
            fullWidth
            margin="dense"
            value={formData.typeCode ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, typeCode: e.target.value })
            }
            error={!!errors.typeCode}
            helperText={errors.typeCode}
          />
          <TextField
            label="Tên loại"
            fullWidth
            margin="dense"
            value={formData.typeName ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, typeName: e.target.value })
            }
            error={!!errors.typeName}
            helperText={errors.typeName}
          />
          <TextField
            label="Tên Check Sheet"
            fullWidth
            margin="dense"
            value={formData.checkSheetName ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, checkSheetName: e.target.value })
            }
            error={!!errors.typeName}
            helperText={errors.typeName}
          />
          <TextField
            label="Mô tả"
            fullWidth
            margin="dense"
            value={formData.typeDesc ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, typeDesc: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSubmit} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
      >
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          Bạn có chắc muốn xóa loại linh kiện này không?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete(null)}>Hủy</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => handleDelete(confirmDelete)}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeviceTypeMST;
