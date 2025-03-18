import React, { useEffect } from "react";
import { useState } from "react";
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
  Snackbar,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  Details,
  DetailsRounded,
  DetailsTwoTone,
  PostAdd,
  Info,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import {
  createListItem,
  getListItem,
  updateListItem,
  deleteListItem,
} from "../../services/checkListItemServices";
import { getListDeviceType } from "../../services/deviceTypeServices";

const CheckListItemMST = () => {
  const [checkListItems, setCheckListItems] = useState([]);
  const [deviceTypes, setDeviceTypes] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    typeId: "",
    checkTitle: "",
    checkContext: "",
    isRequire: true,
    dataType: "Boolean",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListItem();
      if (res) setCheckListItems(res);
    };

    const fetchDeviceTypes = async () => {
      const res = await getListDeviceType();
      if (res) setDeviceTypes(res);
    };

    fetchData();
    fetchDeviceTypes();
  }, []);

  const handleSearch = () => {};

  const handleOpen = (device = null) => {
    setEditingItem(device);
    setFormData(
      device ?? {
        typeId: "",
        checkTitle: "",
        checkContext: "",
        isRequire: true,
        dataType: "Boolean",
      }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
    setFormData({
      typeId: "",
      checkTitle: "",
      checkContext: "",
      isRequire: true,
      dataType: "Boolean",
    });
  };

  const handleSave = async () => {
    if (editingItem) {
      const updatedListItem = await updateListItem(
        editingItem.itemId,
        formData
      );
      if (updatedListItem) {
        setCheckListItems((prev) =>
          prev.map((x) =>
            x.itemId === editingItem.itemId ? updatedListItem : x
          )
        );
        setSnackbar({
          open: true,
          message: "Cập nhật thành công!",
          severity: "success",
        });
      }
    } else {
      const newItem = await createListItem(formData);
      if (newItem) {
        setCheckListItems([...checkListItems, newItem]);
        setSnackbar({
          open: true,
          message: "Thêm thành công!",
          severity: "success",
        });
      }
    }
    const editListItem = await getListItem();
    if (editListItem) setCheckListItems(editListItem);
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      const isDeleted = await deleteListItem(id);
      if (isDeleted) {
        setDevices(checkListItems.filter((d) => d.itemId !== id));
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

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">
        Danh sách nội dung kiểm tra thiết bị
      </h1>
      <div className="flex justify-between">
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Thêm nội dung kiểm tra
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch} color="primary">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </div>

      <TableContainer component={Paper} className="mt-4">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>STT</TableCell>
              <TableCell>Mã loại thiết bị</TableCell>
              <TableCell>Tên loại thiết bị</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Nội dung</TableCell>
              <TableCell>Kiểu dữ liệu</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {checkListItems.map((item, index) => (
              <TableRow key={item.itemId}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.typeCode}</TableCell>
                <TableCell>{item.typeName}</TableCell>
                <TableCell>{item.checkTitle}</TableCell>
                <TableCell>{item.checkContext}</TableCell>
                <TableCell>{item.dataType}</TableCell>
                <TableCell className="flex justify-between w-1/6">
                  <IconButton color="primary" onClick={() => handleOpen(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => setConfirmDelete(item.itemId)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingItem
            ? "Cập Nhật Nội Dung Kiểm Tra"
            : "Thêm Nội Dung Kiểm Tra"}
        </DialogTitle>
        <DialogContent>
          {/* Select Box cho loại thiết bị */}
          <FormControl fullWidth margin="dense">
            <label htmlFor="" className="mb-2">
              Loại thiết bị
            </label>
            <Select
              labelId="list-item-label"
              id="list-item-select"
              value={formData.typeId}
              onChange={(e) =>
                setFormData({ ...formData, typeId: e.target.value })
              }
            >
              {deviceTypes.map((type) => (
                <MenuItem key={type.typeId} value={type.typeId}>
                  {type.typeName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Tiêu đề"
            fullWidth
            margin="dense"
            value={formData.checkTitle ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, checkTitle: e.target.value })
            }
          />
          <TextField
            label="Nội dung"
            fullWidth
            margin="dense"
            value={formData.checkContext ?? ""}
            onChange={(e) =>
              setFormData({ ...formData, checkContext: e.target.value })
            }
          />
          <FormControl fullWidth margin="dense">
            <label htmlFor="" className="mb-2">
              Bắt buộc
            </label>
            <Select
              labelId="device-type-label"
              id="device-type-select"
              value={formData.isRequire}
              onChange={(e) =>
                setFormData({ ...formData, isRequire: e.target.value })
              }
            >
              <MenuItem value={true}>Có</MenuItem>
              <MenuItem value={false}>Không</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <label htmlFor="" className="mb-2">
              Kiểu dữ liệu
            </label>
            <Select
              labelId="device-type-label"
              id="device-type-select"
              value={formData.dataType}
              onChange={(e) =>
                setFormData({ ...formData, dataType: e.target.value })
              }
            >
              <MenuItem value="Boolean">Boolean</MenuItem>
              <MenuItem value="Number">Number</MenuItem>
              <MenuItem value="String">String</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
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
          Bạn có chắc muốn nội dung kiểm tra này không?
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

export default CheckListItemMST;
