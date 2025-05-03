import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import UsersTable from "../components/UI/UsersTable";
import {
  createUser,
  deleteUser,
  getListUser,
  updateUser,
} from "../services/usersService";
import UserFormDialog from "../components/UI/UserFormDialog";
import { register } from "../services/authService";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [formData, setFormData] = useState({
    id: null,
    userName: "",
    fullName: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    var fetchData = async () => {
      const response = await getListUser();
      response && setUsers(response);
    };

    fetchData();
  }, []);

  const handleButtonAddClick = () => {
    setFormData({
      id: null,
      userName: "",
      fullName: "",
      password: "",
      role: "",
    });
    setOpen(true);
  };

  const handleOpenForm = (user = null) => {
    if (user) {
      setFormData(user); // Gán dữ liệu khi sửa
    } else {
      setFormData({
        id: null,
        userName: "",
        fullName: "",
        password: "",
        role: "",
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    if (formData.id) {
      // Cập nhật người dùng
      const res = await updateUser(formData.id, formData);
      if (res != null) {
        setSnackbar({
          open: true,
          message: "Cập nhật người dùng thành công",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Cập nhật người dùng thất bại",
          severity: "error",
        });
      }
    } else {
      // Thêm mới người dùng
      const res = await register(formData);
      if (res != null) {
        setSnackbar({
          open: true,
          message: "Thêm người dùng thành công",
          severity: "success",
        });
      } else {
        setSnackbar({
          open: true,
          message: "Thêm người dùng thất bại",
          severity: "error",
        });
      }
    }
    setOpen(false);
    const response = await getListUser();
    setUsers(response);
  };

  const handleDelete = async (id) => {
    var res = await deleteUser(id);
    res != null
      ? setSnackbar({ open: true, message: "Xóa người dùng thành công" })
      : setSnackbar({
          open: true,
          message: "Xóa người dùng thất bại",
          severity: "error",
        });
    setConfirmDelete(null);
    const response = await getListUser();
    response != null && setUsers(response);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Danh Sách Người Dùng</h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleButtonAddClick()}
      >
        Thêm người dùng
      </Button>

      <UsersTable
        users={users}
        onEdit={handleOpenForm}
        onDelete={setConfirmDelete}
      />

      {/* Dialog cho việc thêm/sửa người dùng */}
      <UserFormDialog
        open={open}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setOpen(false)}
        users={users}
      />

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
        title="Xóa người dùng"
        content="Bạn có chắc chắn muốn xóa người dùng này không?"
      />

      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default Users;
