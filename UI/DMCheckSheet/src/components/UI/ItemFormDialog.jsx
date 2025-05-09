import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { getListCheckSheet } from "../../services/checkSheetServices";

const ItemFormDialog = ({ open, onClose, formData, setFormData, onSave }) => {
  const [checkSheet, setCheckSheet] = useState([]);
  const [errors, setErrors] = useState({});

  // Fetch sheet list
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getListCheckSheet();
        setCheckSheet(data || []);
      } catch (error) {
        console.error("Error fetching sheet list", error);
      }
    };

    fetchData();
  }, []);

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    if (!formData.content?.trim())
      newErrors.content = "Nội dung không được để trống";
    // if (!formData.dataType?.trim())
    //   newErrors.dataType = "Vui lòng chọn kiểu dữ liệu";
    if (!formData.sheetId?.toString()?.trim())
      newErrors.sheetId = "Vui lòng chọn Sheet ID";
    return newErrors;
  };

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSave = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
      disableAutoFocus
      disableRestoreFocus
    >
      <DialogTitle>
        {formData.itemId ? "Cập nhật nội dung" : "Thêm nội dung"}
      </DialogTitle>

      <DialogContent>
        {/* Sheet ID Select */}
        <FormControl
          fullWidth
          margin="dense"
          required
          error={Boolean(errors.sheetId)}
        >
          <InputLabel id="sheet-id-label">Sheet ID</InputLabel>
          <Select
            labelId="sheet-id-label"
            id="sheet-id-select"
            value={formData.sheetId ?? ""}
            onChange={handleChange("sheetId")}
            label="Sheet ID"
          >
            <MenuItem value="">-- Chọn sheet --</MenuItem>
            {checkSheet.map((sheet) => (
              <MenuItem key={sheet.sheetId} value={sheet.sheetId}>
                {sheet.sheetCode} - {sheet.sheetName}
              </MenuItem>
            ))}
          </Select>
          {errors.sheetId && <FormHelperText>{errors.sheetId}</FormHelperText>}
        </FormControl>

        {/* Content Field */}
        <TextField
          label="Nội dung"
          fullWidth
          margin="dense"
          required
          value={formData.content ?? ""}
          onChange={handleChange("content")}
          error={Boolean(errors.content)}
          helperText={errors.content}
        />

        {/* Order Number Field */}
        <TextField
          label="Thứ tự hiển thị"
          fullWidth
          margin="dense"
          type="number"
          value={formData.orderNumber ?? ""}
          onChange={handleChange("orderNumber")}
        />

        {/* Data Type Select */}
        <FormControl
          fullWidth
          margin="dense"
          required
          error={Boolean(errors.dataType)}
        >
          <InputLabel id="data-type-label">Kiểu dữ liệu *</InputLabel>
          <Select
            labelId="data-type-label"
            id="data-type-select"
            value={formData.dataType ?? ""}
            onChange={handleChange("dataType")}
            label="Kiểu dữ liệu"
          >
            <MenuItem value={null}>-- Chọn kiểu dữ liệu --</MenuItem>
            <MenuItem value="BOOLEAN">BOOLEAN</MenuItem>
            <MenuItem value="TEXT">TEXT</MenuItem>
            <MenuItem value="NUMBER">NUMBER</MenuItem>
            <MenuItem value="DATE">DATE</MenuItem>
          </Select>
          {errors.dataType && (
            <FormHelperText>{errors.dataType}</FormHelperText>
          )}
        </FormControl>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSave} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemFormDialog;
