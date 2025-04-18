import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

import ItemTree from "../components/UI/ItemTable";
import ItemFormDialog from "../components/UI/ItemFormDialog";
import ItemChildFormDialog from "../components/UI/ItemChildFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";

import {
  createItem,
  getListItem,
  updateCancelFlag,
  updateItem,
} from "../services/itemServices";

const CheckSheetItemMST = () => {
  const [items, setItems] = useState([]);
  const [openParentForm, setOpenParentForm] = useState(false);
  const [openChildForm, setOpenChildForm] = useState(false);
  const [formType, setFormType] = useState("parent"); // "parent" | "child"
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [formData, setFormData] = useState({
    sheetId: "",
    itemId: null,
    parentId: null,
    content: "",
    dataType: "",
    orderNumber: null,
    createBy: "",
    updateBy: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Load dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await getListItem();
        items && setItems(items);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  // Mở form thêm nội dung con
  const handleFormChild = (parentItem) => {
    setFormData({
      sheetId: parentItem.sheetId ?? "",
      itemId: "",
      parentId: parentItem.itemId,
      content: "",
      dataType: "",
      orderNumber: parentItem.orderNumber ?? null,
      createBy: "Admin",
      updateBy: "",
    });
    setFormType("child");
    setOpenChildForm(true);
  };

  const handleOpenForm = (item) => {
    if (item) {
      setFormData({
        sheetId: item.sheetId ?? "",
        itemId: item.itemId,
        parentId: item.parentId,
        content: item.content,
        dataType: item.dataType,
        orderNumber: item.orderNumber ?? null,
        createBy: "",
        updateBy: "",
      });
    } else {
      setFormData({
        sheetId: "",
        itemId: null,
        parentId: null,
        content: "",
        dataType: "",
        orderNumber: "",
        createBy: "",
        updateBy: "",
      });
    }
    setFormType("parent");
    setOpenParentForm(true);
  };

  // Hàm lưu dữ liệu
  const handleSave = async () => {
    if (!formData.content) {
      alert("Vui lòng nhập đầy đủ nội dung và kiểu dữ liệu!");
      return;
    }

    try {
      if (formData.itemId) {
        // Cập nhật nội dung
        const updatedItem = await updateItem(formData.itemId, formData);
        updatedItem != null
          ? setSnackbar({ open: true, message: "Cập nhật dữ liệu thành công" })
          : setSnackbar({
              open: true,
              message: "Cập nhật dữ liệu thất bại",
              severity: "error",
            });
      } else {
        // Thêm mới nội dung
        const newItem = await createItem(formData);
        newItem != null
          ? setSnackbar({ open: true, message: "Thêm dữ liệu thành công" })
          : setSnackbar({
              open: true,
              message: "Thêm dữ liệu thất bại",
              severity: "error",
            });
      }
      setOpenParentForm(false);
      setOpenChildForm(false);
      await getListItem().then((items) => setItems(items));
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Cập nhật dữ liệu thất bại",
        severity: "error",
      });
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await updateCancelFlag(itemId);
      if (response) {
        setSnackbar({ open: true, message: "Xóa dữ liệu thành công" });
        setItems((prevItems) =>
          prevItems.filter((item) => item.itemId !== itemId)
        );
      } else {
        setSnackbar({
          open: true,
          message: "Xóa dữ liệu thất bại",
          severity: "error",
        });
      }
      setConfirmDelete(null);
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      setSnackbar({
        open: true,
        message: "Xóa dữ liệu thất bại",
        severity: "error",
      });
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        Danh sách nội dung Check Sheet
      </h1>

      <Button variant="contained" startIcon={<Add />} onClick={handleOpenForm}>
        Thêm nội dung Check Sheet
      </Button>

      <ItemTree
        items={items}
        onAddChild={handleFormChild}
        onEdit={handleOpenForm}
        onDelete={setConfirmDelete}
        onCancel={() => {
          setConfirmDelete(null);
        }}
      />

      {/* Chỉ render form tương ứng với loại đang chọn */}
      {formType === "parent" && (
        <ItemFormDialog
          open={openParentForm}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClose={() => setOpenParentForm(false)}
        />
      )}

      {formType === "child" && (
        <ItemChildFormDialog
          open={openChildForm}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onClose={() => setOpenChildForm(false)}
          isChild={true}
          parentId={formData.parentId}
        />
      )}

      <ConfirmDialog
        open={Boolean(confirmDelete)}
        onConfirm={() => handleDelete(confirmDelete)}
        onCancel={() => setConfirmDelete(null)}
        title={"Xác nhận xóa nội dung"}
        content={`Bạn có chắc chắn muốn xóa nội dùng này không?`}
      />
      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
};

export default CheckSheetItemMST;
