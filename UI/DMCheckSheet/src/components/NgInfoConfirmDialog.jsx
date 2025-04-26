import {
  Popover,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";

/**
 * NgInfoDialog:
 * - Nếu mặc định có dữ liệu (defaultValue) thì dialog ở chế độ cập nhật (update)
 * - Nếu defaultValue.confirmedDate đã có thì các field sẽ bị disable (read-only)
 * - Khi nhấn Xác nhận, sẽ gọi onSave(itemId, payload, isUpdate)
 *   + isUpdate = true nếu defaultValue tồn tại
 *   + Sau khi lưu mới, component chuyển sang chế độ read-only
 */
const NgInfoConfirmDialog = ({
  open,
  anchorEl,
  onClose,
  onSave,
  item,
  defaultValue,
  roles,
  onConfirm,
}) => {
  const isChecker = roles?.includes("Checker");

  // Format helper
  const formatDate = (d) => {
    if (!d) return null;
    if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
    const dt = new Date(d);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const dd = String(dt.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Form data
  const [formData, setFormData] = useState({
    ActionTaken: "",
    ActionDate: null,
    ConfirmedBy: "",
    ConfirmedDate: null,
    Note: "",
  });

  // Khi defaultValue thay đổi: update form và readOnly
  useEffect(() => {
    if (defaultValue) {
      setFormData({
        ActionTaken: defaultValue.actionTaken || "",
        ActionDate: formatDate(defaultValue.actionDate),
        ConfirmedBy: defaultValue.confirmedBy || "",
        ConfirmedDate: formatDate(defaultValue.confirmedDate),
        Note: defaultValue.note || "",
      });
    }
  }, [defaultValue]);

  // Save
  const handleSave = () => {
    const payload = {
      actionTaken: formData.ActionTaken,
      actionDate: formData.ActionDate,
      confirmedBy: formData.ConfirmedBy,
      confirmedDate: formData.ConfirmedDate,
      note: formData.Note,
    };
    onSave(item.itemId, payload);
    onConfirm();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ sx: { p: 2, width: 400 } }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        🔍 Thông tin NG
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {item?.content}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" gap={2}>
        <Typography variant="body2">
          Ngày lỗi: {new Date().toLocaleString()}
        </Typography>
        <Typography variant="body2">Số mục: {item?.itemId}</Typography>
        <Typography variant="body2">
          Nội dung chưa đạt: {item?.content}
        </Typography>

        {/* Fields */}
        {/* <TextField
          fullWidth
          type="date"
          label="Ngày khắc phục"
          InputLabelProps={{ shrink: true }}
          value={formData.ActionDate || ""}
          onChange={handleChange("ActionDate", true)}
          disabled={readOnly}
        />

        <TextField
          fullWidth
          label="Khắc phục"
          value={formData.ActionTaken}
          onChange={handleChange("ActionTaken")}
          disabled={readOnly}
        />

        {!isChecker && (
          <>
            <TextField
              fullWidth
              type="date"
              label="Ngày kiểm tra"
              InputLabelProps={{ shrink: true }}
              value={formData.ConfirmedDate || ""}
              onChange={handleChange("ConfirmedDate", true)}
              disabled={readOnly}
            />
            <TextField
              fullWidth
              label="Người kiểm tra"
              value={formData.ConfirmedBy}
              onChange={handleChange("ConfirmedBy")}
              disabled={readOnly}
            />
          </>
        )} */}

        {/* <TextField
          fullWidth
          multiline
          label="Ghi chú"
          value={formData.Note}
          onChange={handleChange("Note")}
          disabled={readOnly}
        /> */}

        <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={handleSave} variant="contained">
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Popover>
  );
};

export default NgInfoConfirmDialog;
