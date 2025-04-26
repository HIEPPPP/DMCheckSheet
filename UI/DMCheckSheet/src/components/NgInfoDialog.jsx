import React, { useState, useEffect } from "react";
import {
  Popover,
  Typography,
  Box,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { getResultActionByResultId } from "../services/resultActionServices";

/**
 * Hiển thị thông tin NG dưới dạng chỉ đọc, tự fetch dữ liệu từ API
 * Props:
 * - open: boolean
 * - anchorEl: HTMLElement
 * - item: { itemId, content }
 * - resultId: string
 * - onClose: () => void
 */
const NgInfoDialog = ({ open, anchorEl, item, resultId, onClose }) => {
  const [detail, setDetail] = useState({
    actionTaken: "",
    actionDate: "",
    confirmedBy: "",
    confirmedDate: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Format ISO string thành dd/MM/yyyy HH:mm:ss
  const formatDateTime = (iso) => {
    if (!iso) return "-";
    const dt = new Date(iso);
    const pad = (n) => n.toString().padStart(2, "0");
    const day = pad(dt.getDate());
    const month = pad(dt.getMonth() + 1);
    const year = dt.getFullYear();
    const hours = pad(dt.getHours());
    const mins = pad(dt.getMinutes());
    const secs = pad(dt.getSeconds());
    return `${day}/${month}/${year} ${hours}:${mins}:${secs}`;
  };

  useEffect(() => {
    if (open && resultId) {
      setLoading(true);
      setError(null);
      const fetchDetail = async () => {
        try {
          const data = await getResultActionByResultId(resultId);
          setDetail(data || {});
        } catch (err) {
          setError("Lỗi khi tải dữ liệu");
        } finally {
          setLoading(false);
        }
      };
      fetchDetail();
    }
  }, [open, resultId]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      PaperProps={{ sx: { p: 2, width: 400 } }}
      onClose={onClose}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        🔍 Thông tin NG
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        {item?.content}
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {loading ? (
        <Box display="flex" justifyContent="center" my={2}>
          <CircularProgress size={24} />
        </Box>
      ) : error ? (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={1}>
          <Typography variant="body2">Result ID: {resultId}</Typography>
          <Typography variant="body2">
            Ngày lỗi: {formatDateTime(detail.checkedDate) || "-"}
          </Typography>
          <Typography variant="body2">
            Người check:{" "}
            <span className="font-semibold text-blue-600">
              {detail.checkedBy || "-"}
            </span>
          </Typography>
          <Typography variant="body2">
            Nội dung chưa đạt: {item.content || "-"}
          </Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button variant="contained" onClick={onClose}>
          Đóng
        </Button>
      </Box>
    </Popover>
  );
};

export default NgInfoDialog;
