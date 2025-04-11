import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getListCheckSheet } from "../../services/checkSheetServices";
import { getListDevice } from "../../services/deviceServices";

const CheckSheetDeviceFormDialog = ({
  open,
  formData,
  setFormData,
  onSave,
  onClose,
}) => {
  const [errors, setErrors] = useState({});
  const [checkSheet, setCheckSheet] = useState([]);
  const [device, setDevices] = useState([]);

  useEffect(() => {
    const fetchCheckSheet = async () => {
      try {
        const data = await getListCheckSheet();
        setCheckSheet(data || []);
      } catch (error) {
        console.error("Error fetching sheet list", error);
      }
    };

    const fetchDevices = async () => {
      try {
        const data = await getListDevice();
        setDevices(data || []);
      } catch (error) {
        console.error("Error fetching devices", error);
      }
    };

    fetchCheckSheet();
    fetchDevices();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? "Cập Nhật" : "Thêm Mới"}</DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          margin="dense"
          required
          error={Boolean(errors.checkSheetId)}
        >
          <InputLabel id="sheet-id-label">Sheet ID</InputLabel>
          <Select
            labelId="sheet-id-label"
            id="sheet-id-select"
            value={formData.checkSheetId ?? ""}
            onChange={handleChange("checkSheetId")}
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

        <FormControl
          fullWidth
          margin="dense"
          required
          error={Boolean(errors.checkSheetId)}
        >
          <InputLabel id="device-id-label">Device ID</InputLabel>
          <Select
            labelId="device-id-label"
            id="device-id-select"
            value={formData.deviceId ?? ""}
            onChange={handleChange("deviceId")}
            label="Device ID"
          >
            <MenuItem value="">-- Chọn Device --</MenuItem>
            {device.map((device) => (
              <MenuItem key={device.deviceId} value={device.deviceId}>
                {device.deviceCode} - {device.deviceName}
              </MenuItem>
            ))}
          </Select>
          {errors.deviceId && (
            <FormHelperText>{errors.deviceId}</FormHelperText>
          )}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={onSave} variant="contained">
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CheckSheetDeviceFormDialog;
