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
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import {
  createDeviceType,
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
    typeDesc: "",
    createAt: "",
    createBy: "",
    updateAt: "",
    updateBy: "",
  });
  const [open, setOpen] = useState(false);

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
      typeDesc: "",
      createAt: "",
      createBy: "",
      updateAt: "",
      updateBy: "",
    });
  };

  const handleSave = async () => {
    if (editType) {
      const updateType = await updateDeviceType(editType.typeId, formData);
      if (updateType) {
        setDeviceType((prev) =>
          prev.map((dt) => (dt.typeId === editType.typeId ? updateType : dt))
        );
      }
    } else {
      const newDeviceType = await createDeviceType(formData);
      if (newDeviceType) {
        setDeviceType([...deviceType, newDeviceType]);
      }
    }
    handleClose();
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

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã loại</TableCell>
              <TableCell>Tên loại</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceType.map((dt) => (
              <TableRow>
                <TableCell>{dt.typeCode}</TableCell>
                <TableCell>{dt.typeName}</TableCell>
                <TableCell>{dt.typeDesc}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleOpen(dt)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    //onClick={() => handleDelete(device.deviceId)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open}>
        <DialogTitle>
          {editType ? "Cập Nhật Loại Linh Kiện" : "Thêm Loại Linh Kiện"}
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
          />
          <TextField
            label="Tên loại"
            fullWidth
            margin="dense"
            value={formData.typeName ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, typeName: e.target.value })
            }
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
          <Button onClick={handleSave} variant="contained">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeviceTypeMST;
