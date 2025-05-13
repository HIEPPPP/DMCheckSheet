import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getByDeviceAndCheckSheetCode } from "../services/checkSheetDeviceServices";
import {
  confirmResult,
  createResults,
  getCheckSheetCols,
  getCheckSheetColsTop10,
  getResultsBySheetAndDate,
  updateResult,
} from "../services/checkResultServices";
import BooleanToggleSwitch from "../components/BooleanToggleSwitch";
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { getItemBySheetCode } from "../services/itemServices";
import CheckSheetUsageTable from "../components/UI/CheckSheetUsageTable";

const CheckSheetUsage = () => {
  const { code } = useParams();
  const parts = code?.split("-") || [];
  const deviceCode = parts[0];
  const checkSheetCode = parts[1];
  const user = useContext(AuthContext);

  const [checkSheetCols, setCheckSheetCols] = useState([]);
  const [sheetDevice, setSheetDevice] = useState({});
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [values, setValues] = useState({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  // key: itemId, value: resultId
  const [resultMap, setResultMap] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [checkedByUser, setCheckedByUser] = useState("");

  // Roles
  const roles = user?.auth?.roles || [];
  const isChecker = roles.includes("Checker");

  const navigate = useNavigate();

  // Base info builder
  const getBaseInfo = () => ({
    formNO: sheetDevice.formNO,
    sheetCode: sheetDevice.sheetCode,
    sheetName: sheetDevice.sheetName,
    deviceCode: sheetDevice.deviceCode,
    deviceName: sheetDevice.deviceName,
    frequency: sheetDevice.frequency,
    location: sheetDevice.location,
    checkedBy: user.auth.username, //Ngày nhập/xuất
    checkedDate: new Date().toISOString(), //Ngày nhập/xuất
    note: "",
  });

  // Fetch sheetDevice
  useEffect(() => {
    if (!deviceCode || !checkSheetCode) return;
    const fetchSheet = async () => {
      setLoading(true);
      try {
        const res = await getByDeviceAndCheckSheetCode(
          deviceCode,
          checkSheetCode
        );
        if (!res) throw new Error("Thông tin Sheet không tìm thấy.");
        setSheetDevice(res);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSheet();
  }, [deviceCode, checkSheetCode]);

  // Fetch items
  useEffect(() => {
    if (!sheetDevice.sheetCode) return;
    const fetchItems = async () => {
      setLoading(true);
      try {
        const items = await getItemBySheetCode(sheetDevice.sheetCode);
        if (!items) throw new Error("Items không tìm thấy.");
        setData(items);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [sheetDevice.sheetCode]);

  // Get Check Sheet Cols
  useEffect(() => {
    const checkSheetCols = async () => {
      setLoading(true);
      try {
        const res = await getCheckSheetColsTop10(
          sheetDevice.sheetCode,
          sheetDevice.deviceCode
        );
        if (!res) throw new Error("Thông tin Sheet không tìm thấy.");
        setCheckSheetCols(res);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    checkSheetCols();
  }, [sheetDevice.deviceCode, sheetDevice.checkSheetCode]);

  // Initial load or create results once per day
  useEffect(() => {
    // 1) Chưa có sheetCode hoặc chưa load items => dừng
    if (!sheetDevice.sheetCode || data.length === 0) return;

    // 2) Nếu đã init rồi => dừng (không gọi createResults nữa)
    if (initialized) return;

    const initAsync = async () => {
      setLoading(true);
      try {
        const today = new Date().toISOString().slice(0, 10);
        const existing = await getResultsBySheetAndDate(
          sheetDevice.sheetCode,
          sheetDevice.deviceCode,
          today
        );

        if (existing && existing.length > 0) {
          // nếu bất kỳ r.confirmedBy nào != null => khóa toàn bộ sheet
          // const locked = existing.some((r) => !!r.confirmedBy);
          // if (locked) {
          //   setIsLocked(true);
          //   // vẫn build map/values để hiển thị data, nhưng dừng ở đây không tạo mới
          //   const map = existing.reduce((acc, r) => {
          //     acc[r.itemId] = r.resultId;
          //     return acc;
          //   }, {});
          //   setResultMap(map);
          //   setValues(
          //     existing.reduce((acc, r) => ({ ...acc, [r.itemId]: r.value }), {})
          //   );
          //   return; // thoát init, không cho thao tác
          // }

          // Lần tái mở phiếu trong ngày — dùng checkedBy của bản ghi cũ
          setCheckedByUser(existing[0].checkedBy);
          // 1) Build map itemId → resultId
          const map = existing.reduce((acc, r) => {
            acc[r.itemId] = r.resultId;
            return acc;
          }, {});
          setResultMap(map);

          // 2) set values và disabledItems
          const vals = {};
          const disabledInit = {};
          existing.forEach((r) => {
            vals[r.itemId] = r.value;
            // nếu NG và đã confirm thì disable
            if (r.value === "NG" && r.isConfirmNG) {
              disabledInit[r.itemId] = true;
            }
          });
          setValues(vals);
          setValues(vals);
        } else {
          // Chưa có kết quả hôm nay: tạo mới batch
          const toCreate = data.map((item) => ({
            ...getBaseInfo(),
            itemId: item.itemId,
            value: "",
          }));

          // Lần đầu check trong ngày
          const created = await createResults(toCreate);
          // Lưu lại checkedBy
          setCheckedByUser(user.auth.username);

          // Build map từ mảng created
          const map = created.reduce((acc, r) => {
            acc[r.itemId] = r.resultId;
            return acc;
          }, {});
          setResultMap(map);

          // Khởi giá trị rỗng cho values
          const vals = data.reduce((acc, item) => {
            acc[item.itemId] = "";
            return acc;
          }, {});
          setValues(vals);
        }
      } catch (err) {
        console.error("Init results failed:", err);
        setError(err.message);
      } finally {
        setInitialized(true);
        setLoading(false);
      }
    };
    initAsync();
  }, [data, sheetDevice.sheetCode, initialized]);

  // Build tree structure
  useEffect(() => {
    const map = new Map();
    const roots = [];
    data.forEach((item) => map.set(item.itemId, { ...item, children: [] }));
    data.forEach((item) => {
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId).children.push(map.get(item.itemId));
      } else {
        roots.push(map.get(item.itemId));
      }
    });
    setGroupedData(roots);
  }, [data]);

  // Handle change
  const handleValueChange = async (itemId, newValue) => {
    // 1) Cập nhật UI tạm
    setValues((p) => ({ ...p, [itemId]: newValue }));

    // 2) Gọi updateResult
    const resultId = resultMap[itemId];
    if (!resultId) return console.error(`No resultId for item ${itemId}`);

    const payload = {
      value: newValue,
      updateAt: new Date().toISOString(),
      updateBy: user.auth.username,
    };
    try {
      await updateResult(resultId, payload);

      // const action = await getResultActionByResultId(resultId);
      // if (action != null) {
      // Xóa dữ liệu trong result action
      // await deleteResultActionByResultID(resultId);
      // }

      // console.log(" updateResult succeeded");
    } catch (err) {
      console.error(` updateResult ${resultId} failed:`, err);
      return; // dừng nếu update lỗi
    }

    // 3) Gọi refreshStatus
    // try {
    //   // console.log("calling refreshStatus");
    //   // await refreshStatus();
    //   // console.log("refreshStatus done");
    // } catch (err) {
    //   // console.error("refreshStatus failed:", err);
    // }

    // 4) Nếu NG thì show dialog
    // if (newValue === "NG") {
    //   setOpenDialogFor(itemId);
    //   setAnchorEl(document.getElementById(`ng-button-${itemId}`));
    // }
  };

  // Render by type
  const renderInputByType = (item) => {
    const { dataType, itemId } = item;
    const value = values[itemId] ?? "";
    let inputField;
    switch (dataType) {
      case "BOOLEAN":
        inputField = (
          <BooleanToggleSwitch
            defaultValue={value || null}
            onChange={(val) => handleValueChange(itemId, val)}
            disabled={!!disabledItems[itemId]}
          />
        );
        break;
      case "TEXT":
      case "NUMBER":
      case "DATE":
        inputField = (
          <TextField
            size="small"
            type={dataType.toLowerCase()}
            variant="outlined"
            value={value}
            placeholder="-"
            onChange={(e) => handleValueChange(itemId, e.target.value)}
          />
        );
        break;
      default:
        inputField = <span></span>;
    }
    return (
      <div className="flex items-center gap-2">
        {/* {value === "NG" && (
          <Button
            id={`ng-button-${itemId}`}
            variant="outlined"
            size="small"
            onClick={(e) => handleOpenNGInfo(itemId, e.currentTarget)}
          >
            <Info fontSize="small" />
            <span className="ml-1">NG</span>
          </Button>
        )} */}
        {inputField}
      </div>
    );
  };

  // Recursive render
  const renderNested = (item) => (
    <div key={item.itemId} className="ml-4 space-y-2">
      <div className="flex justify-between items-center gap-4">
        <span>{item.content}</span>
        {renderInputByType(item)}
      </div>
      {item.children.length > 0 && (
        <div className="pl-4 border-l border-gray-300">
          {item.children.map((c) => renderNested(c))}
        </div>
      )}
    </div>
  );

  const handleConfirm = async () => {
    // 1) Tạo mảng payload
    const toConfirm = Object.values(resultMap).map((resultId) => ({
      resultId: resultId,
      confirmedBy: user.auth.username,
    }));

    // Người xác nhận phải khác người kiểm tra
    if (user.auth.username === checkedByUser) {
      setError("Người xác nhận không được là người kiểm tra.");
      setTimeout(() => navigate("/dashboard"), 3000);
      return;
    }

    try {
      // 2) Gọi API batch
      await confirmResult(toConfirm);
      // 3) Feedback cho user
      setOpenSnackbar(true);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      console.error("Confirm results failed:", err);
      setError("Xác nhận thất bại, vui lòng thử lại.");
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading)
    return <p className="font-bold text-center">Đang tải dữ liệu...</p>;

  return (
    <div className={`p-4 space-y-6 relative overflow-auto`}>
      <header>
        <h1 className="text-3xl font-bold">{sheetDevice.sheetName}</h1>
        <div className="flex justify-between mt-4">
          <div>
            <p>
              Mã thiết bị: <strong>{sheetDevice.deviceCode}</strong>
            </p>
            <p>Tên thiết bị: {sheetDevice.deviceName}</p>
          </div>
          <p>Người kiểm tra: {user.auth.fullName}</p>
        </div>
      </header>

      <CheckSheetUsageTable
        checkSheetCols={checkSheetCols}
      ></CheckSheetUsageTable>

      {groupedData.map((parent) => (
        <section
          key={parent.itemId}
          className="border rounded-xl shadow p-4 mb-6"
        >
          <h2 className="font-semibold mb-2">{parent.content}</h2>
          <div className="space-y-3 pl-4">
            {parent.children.map((child) => renderNested(child))}
          </div>
        </section>
      ))}

      <div className="flex justify-center">
        {!isChecker ? (
          <Button variant="contained" color="primary" onClick={handleConfirm}>
            Xác nhận
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleComplete}>
            Chuyển hướng
          </Button>
        )}
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
          variant="filled"
        >
          Hoàn tất kiểm tra! Đang chuyển hướng...
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CheckSheetUsage;
