import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import ItemTable from "../components/UI/ItemTable";
import ItemFormDialog from "../components/UI/ItemFormDialog";
import ConfirmDialog from "../components/ConfirmDialog";
import Notification from "../components/Notification";
import { getListItem } from "../services/itemServices";
import { data } from "react-router-dom";
import ItemChildFormDialog from "../components/UI/ItemChildFormDialog";

const CheckSheetItemMST = () => {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [formData, setFormData] = useState({
    sheetId: "",
    itemId: "",
    parentId: "",
    content: "",
    dataType: "",
    orderNumber: "",
    createBy: "",
    updateBy: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListItem();
      res && setItems(res);
    };
    fetchData();
  }, []);

  const handleFormChild = (item) => {
    setFormData({
      ...formData,
      itemId: item.itemId,
    });

    setTimeout(() => {
      setOpen(true); // Đảm bảo form mở sau khi state cập nhật
    }, 0);
  };

  const handleSave = async () => {};

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">
        Danh sách nội dung Check Sheet
      </h1>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleCancelForm()}
      >
        Thêm nội dung Check Sheet
      </Button>

      <ItemTable items={items} onAddChild={(item) => handleFormChild(item)} />

      <ItemFormDialog
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setOpen(false)}
      />

      <ItemChildFormDialog
        open={open}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSave}
        onClose={() => setOpen(false)}
      />

      <ConfirmDialog items="" onEdit="" onDelete="" />

      <Notification />
    </>
  );
};

export default CheckSheetItemMST;
