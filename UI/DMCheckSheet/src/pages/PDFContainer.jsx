import React, { useContext, useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@mui/material";
import {
  ArticleRounded,
  Pageview,
  PictureAsPdfRounded,
  Search,
} from "@mui/icons-material";
import { getListDevice } from "../services/deviceServices";
import { getListCheckSheet } from "../services/checkSheetServices";
import {
  approveResult,
  confirmedMonthResult,
  getApprovedByMonth,
  getCheckSheetRows,
  getConfirmedByMonth,
} from "../services/checkResultServices";
import Pdf from "../components/UI/Pdf";
import { getListResultActionMonth } from "../services/resultActionServices";
import { AuthContext } from "../contexts/AuthContext";
import Notification from "../components/Notification";

const PDFContainer = () => {
  const [devices, setDevices] = useState([]);
  const [sheets, setSheets] = useState([]);
  //const [monthList, setMonthList] = useState([]);

  const [deviceCode, setDeviceCode] = useState("");
  const [sheetCode, setSheetCode] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [monthRef, setMonthRef] = useState("");

  const [approvedBy, setApproveBy] = useState("");
  const isApproved = !!approvedBy; // true nếu đã được phê duyệt
  const [confirmedMonthBy, setConfirmedMonthBy] = useState("");
  const isConfirmedMonth = !!confirmedMonthBy; //true nếu đã được xác nhận

  const [action, setAction] = useState("");
  const [rows, setRows] = useState([]);
  const [showPdf, setShowPdf] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const user = useContext(AuthContext);
  const username = user?.auth?.username;
  const roles = user?.auth?.roles || [];
  const isApprover = roles.includes("Approver");
  const isConfirmerMonth = roles.includes("ConfirmerMonth");

  // Load devices, sheets, months
  useEffect(() => {
    getListCheckSheet().then((data) => setSheets(data || []));
    getListDevice().then((data) => setDevices(data || []));

    // tạo 12 tháng gần nhất
    // const now = new Date(),
    //   mList = [];
    // for (let i = 0; i < 12; i++) {
    //   const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    //   mList.push({
    //     value: d.toISOString().slice(0, 7),
    //     label: d.toLocaleString("default", { month: "long", year: "numeric" }),
    //   });
    // }
    // setMonthList(mList);
  }, []);

  // Khi chọn sheetCode, cũng set luôn sheetName
  useEffect(() => {
    const sel = sheets.find((s) => s.sheetCode === sheetCode);
    setSheetName(sel ? sel.sheetName : "");
  }, [sheetCode, sheets]);

  // Gọi API khi nhấn Tìm kiếm
  const handleSearch = async () => {
    if (!deviceCode || !sheetCode || !monthRef) return;

    // reset trước
    setShowPdf(false);
    setRows([]);
    setAction([]);
    setApproveBy("");
    setConfirmedMonthBy("");

    const monthDate = monthRef + "-01";
    const res = await getCheckSheetRows(sheetCode, deviceCode, monthDate);
    const actions = await getListResultActionMonth(
      sheetCode,
      deviceCode,
      monthDate
    );
    const approver = await getApprovedByMonth(sheetCode, deviceCode, monthDate);
    const confirmerMonth = await getConfirmedByMonth(
      sheetCode,
      deviceCode,
      monthDate
    );
    setRows(res || []);
    setAction(actions || []);
    setApproveBy(approver?.approvedBy);
    setConfirmedMonthBy(confirmerMonth?.confirmedMonthBy);
    setShowPdf(true);
  };

  // Tính số ngày
  const daysInMonth = monthRef
    ? new Date(
        ...monthRef.split("-").map((v, i) => (i === 1 ? Number(v) : Number(v)))
      ) &&
      new Date(+monthRef.split("-")[0], +monthRef.split("-")[1], 0).getDate()
    : 31;

  const handleApprove = async () => {
    const monthDate = monthRef + "-01";
    const result = await approveResult(
      sheetCode,
      deviceCode,
      monthDate,
      username
    );
    result != null
      ? setSnackbar({ open: true, message: "Phê duyệt thành công" })
      : setSnackbar({
          open: true,
          message: "Phê duyệt thất bại",
          severity: "error",
        });
    setApproveBy(result.approvedBy);
  };

  const handleConfirmedMonth = async () => {
    const monthDate = monthRef + "-01";
    const result = await confirmedMonthResult(
      sheetCode,
      deviceCode,
      monthDate,
      username
    );
    result != null
      ? setSnackbar({ open: true, message: "Xác nhận thành công" })
      : setSnackbar({
          open: true,
          message: "Xác nhận thất bại",
          severity: "error",
        });
    setConfirmedMonthBy(result.confirmedMonthBy);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Controls */}
      <div className="flex gap-4 items-center mt-4">
        <FormControl fullWidth size="small">
          <InputLabel>CheckSheet</InputLabel>
          <Select
            value={sheetCode}
            label="CheckSheet"
            onChange={(e) => setSheetCode(e.target.value)}
          >
            {sheets.map((s) => (
              <MenuItem key={s.sheetId} value={s.sheetCode}>
                {s.sheetName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel>Thiết bị</InputLabel>
          <Select
            value={deviceCode}
            label="Thiết bị"
            onChange={(e) => setDeviceCode(e.target.value)}
          >
            {devices.map((d) => (
              <MenuItem key={d.deviceId} value={d.deviceCode}>
                {d.deviceName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          type="month"
          label="Tháng"
          value={monthRef}
          onChange={(e) => setMonthRef(e.target.value)}
          InputLabelProps={{ shrink: true }}
          size="small"
        />

        <Button
          variant="outlined"
          className="w-[400px] h-10"
          onClick={handleSearch}
          startIcon={<Search />}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Khu vực show icon / Pdf */}
      <div className="mt-4">
        {showPdf && rows.length > 0 ? (
          <div>
            <Pdf
              rows={rows}
              daysInMonth={daysInMonth}
              deviceCode={deviceCode}
              sheetName={sheetName}
              monthLabel={monthRef}
              actions={action}
              approvedBy={approvedBy}
              confirmedMonthBy={confirmedMonthBy}
            />
            {/* <div className="mt-4">
              <div className="flex gap-4 float-end">
                <Button
                  variant="outlined"
                  onClick={handleApprove}
                  disabled={!isApprover || isApproved}
                >
                  Phê duyệt
                </Button>
                <Button
                  variant="contained"
                  onClick={handleConfirmedMonth}
                  disabled={
                    !isConfirmerMonth || !isApproved || isConfirmedMonth
                  } // vừa cần quyền, vừa phải đã approve trước đó
                >
                  Xác nhận
                </Button>
              </div>
            </div> */}
          </div>
        ) : (
          <div className="flex justify-center items-center h-185 text-gray-400 border rounded-sm bg-white p-10 shadow-xl">
            <ArticleRounded style={{ fontSize: 250, color: "#2196F3" }} />
          </div>
        )}
      </div>

      <Notification
        {...snackbar}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </div>
  );
};

export default PDFContainer;
