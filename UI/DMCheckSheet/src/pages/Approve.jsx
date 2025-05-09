import { ArticleRounded, Search } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import ApproveTable from "../components/UI/ApproveTable";
import {
  approveResult,
  confirmedMonthResult,
  getApprovedByMonth,
  getCheckSheetRows,
  getConfirmedByMonth,
  getListResultApprovedConfirmedMonth,
} from "../services/checkResultServices";
import Pdf from "../components/UI/Pdf";
import { getListResultActionMonth } from "../services/resultActionServices";
import { AuthContext } from "../contexts/AuthContext";
import Notification from "../components/Notification";

const Approve = () => {
  const [deviceCode, setDeviceCode] = useState("");
  const [sheetCode, setSheetCode] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [monthRef, setMonthRef] = useState("");
  const [checkSheetDevice, setCheckSheetDevice] = useState([]);
  const [action, setAction] = useState("");
  const [rows, setRows] = useState([]);
  const [showPdf, setShowPdf] = useState(false);

  const [approvedBy, setApproveBy] = useState("");
  const isApproved = !!approvedBy; // true nếu đã được phê duyệt
  const [confirmedMonthBy, setConfirmedMonthBy] = useState("");
  const isConfirmedMonth = !!confirmedMonthBy; //true nếu đã được xác nhận

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

  const daysInMonth = monthRef
    ? new Date(
        ...monthRef.split("-").map((v, i) => (i === 1 ? Number(v) : Number(v)))
      ) &&
      new Date(+monthRef.split("-")[0], +monthRef.split("-")[1], 0).getDate()
    : 31;

  // Dạng "YYYY-MM"
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}`;

  // Kiểm tra tháng hiện tại có lớn hơn monthRef hay không
  // Nếu monthRef rỗng (chưa chọn tháng) thì mặc định là false
  const isAfterMonthRef = monthRef ? currentMonth > monthRef : false;

  useEffect(() => {
    const fetchData = async () => {
      if (!deviceCode || !sheetCode || !monthRef) return;
      const monthDate = monthRef + "-01";
      const [res, actions, approver, confirmer] = await Promise.all([
        getCheckSheetRows(sheetCode, deviceCode, monthDate),
        getListResultActionMonth(sheetCode, deviceCode, monthDate),
        getApprovedByMonth(sheetCode, deviceCode, monthDate),
        getConfirmedByMonth(sheetCode, deviceCode, monthDate),
      ]);
      setRows(res || []);
      setAction(actions || []);
      setApproveBy(approver?.approvedBy);
      setConfirmedMonthBy(confirmer?.confirmedMonthBy);
      setShowPdf(true);
    };

    fetchData();
  }, [deviceCode, sheetCode, monthRef]);

  const handleSearch = async () => {
    setShowPdf(false);
    const monthDate = monthRef + "-01";
    const res = await getListResultApprovedConfirmedMonth(monthDate);
    res && setCheckSheetDevice(res);
  };

  const handleViewPdf = (cd) => {
    setDeviceCode(cd.deviceCode);
    setSheetCode(cd.sheetCode);
    setSheetName(cd.sheetName);
    // xóa đi để useEffect bật lại
    setShowPdf(false);
  };
  // Gọi API khi nhấn Tìm kiếm
  // const handleViewPdf = async (cd) => {
  //   const { deviceCode, sheetCode, sheetName } = cd;
  //   const monthDate = monthRef + "-01";

  //   // nếu thiếu tháng thì thôi
  //   if (!deviceCode || !sheetCode || !monthRef) return;

  //   // reset hiển thị
  //   setShowPdf(false);
  //   setApproveBy("");
  //   setConfirmedMonthBy("");
  //   setRows([]);
  //   setAction([]);

  //   // gọi API với giá trị tạm
  //   const [res, actions, approver, confirmer] = await Promise.all([
  //     getCheckSheetRows(sheetCode, deviceCode, monthDate),
  //     getListResultActionMonth(sheetCode, deviceCode, monthDate),
  //     getApprovedByMonth(sheetCode, deviceCode, monthDate),
  //     getConfirmedByMonth(sheetCode, deviceCode, monthDate),
  //   ]);

  //   setRows(res || []);
  //   setAction(actions || []);
  //   setApproveBy(approver?.approvedBy);
  //   setConfirmedMonthBy(confirmer?.confirmedMonthBy);
  //
  //   setShowPdf(true);
  // };

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
    // gọi lại để load lại data
    await handleSearch();
    // setApproveBy(result.approvedBy);
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
    // gọi lại để load lại data
    await handleSearch();
    // setConfirmedMonthBy(result.confirmedMonthBy);
  };

  return (
    <div className="p-2 space-y-6">
      {/* Bảng Approved và Confirmed */}
      <ApproveTable
        checkSheetDevice={checkSheetDevice}
        monthRef={monthRef}
        setMonthRef={setMonthRef}
        onSearch={handleSearch}
        onEdit={handleViewPdf}
      />
      {/* Khu vực show icon / Pdf */}
      <div className="">
        {showPdf && rows.length > 0 ? (
          <div className="flex flex-col">
            <div className="">
              <div className="flex gap-4 float-end">
                <Button
                  variant="outlined"
                  onClick={handleConfirmedMonth}
                  disabled={
                    !isConfirmerMonth || isConfirmedMonth || !isAfterMonthRef
                  } // vừa cần quyền, vừa phải đã approve trước đó
                >
                  Xác nhận
                </Button>
                <Button
                  variant="contained"
                  onClick={handleApprove}
                  disabled={
                    !isApprover ||
                    !confirmedMonthBy ||
                    isApproved ||
                    !isAfterMonthRef
                  }
                >
                  Phê duyệt
                </Button>
              </div>
            </div>
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

export default Approve;
