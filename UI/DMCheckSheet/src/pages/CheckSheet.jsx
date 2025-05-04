import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState, useMemo } from "react";

import { Alert, Button, Snackbar, TextField } from "@mui/material";
import { Info } from "@mui/icons-material";

import BooleanToggleSwitch from "../components/BooleanToggleSwitch";
import NgInfoDialog from "../components/NgInfoDialog";
import NgInfoConfirmDialog from "../components/NgInfoConfirmDialog";
import TableNG from "../components/TableNG";
import { AuthContext } from "../contexts/AuthContext";
import { getItemBySheetCode } from "../services/itemServices";
import { getByDeviceAndCheckSheetCode } from "../services/checkSheetDeviceServices";
import {
  createResults,
  updateResult,
  getResultsBySheetAndDate,
  getResultByResultId,
  confirmResult,
  updateConfirmNG,
} from "../services/checkResultServices";
import {
  createResultAction,
  getResultActionByResultId,
  updateResultAction,
  updateResultActionByResultId,
} from "../services/resultActionServices";
import { useStatus } from "../contexts/StatusContext";

const CheckSheet = () => {
  const { code } = useParams();
  const parts = code?.split("-") || [];
  const deviceCode = parts[0];
  const checkSheetCode = parts[1];
  const user = useContext(AuthContext);

  const [sheetDevice, setSheetDevice] = useState({});
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [values, setValues] = useState({});
  const [ngDetails, setNgDetails] = useState({});
  const [openDialogFor, setOpenDialogFor] = useState(null);
  const [openDialogNGInfo, setOpenDialogNGInfo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [initialized, setInitialized] = useState(false);
  // key: itemId, value: resultId
  const [resultMap, setResultMap] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [disabledItems, setDisabledItems] = useState({});

  // Context
  const { refreshStatus } = useStatus();

  // Roles
  const roles = user?.auth?.roles || [];
  const isAdmin = roles.includes("Admin");
  const isChecker = roles.includes("Checker");
  const isReChecker = roles.includes("ReChecker");
  const isConfirmer = roles.includes("Confirmer");
  const isApprover = roles.includes("Approver");

  // Base info builder
  const getBaseInfo = () => ({
    formNO: sheetDevice.formNO,
    sheetCode: sheetDevice.sheetCode,
    sheetName: sheetDevice.sheetName,
    deviceCode: sheetDevice.deviceCode,
    deviceName: sheetDevice.deviceName,
    frequency: sheetDevice.frequency,
    location: sheetDevice.location,
    checkedBy: user.auth.username,
    checkedDate: new Date().toISOString(),
    note: "",
  });

  const navigate = useNavigate();

  // Check if all items are filled
  const isComplete = useMemo(() => {
    return data
      .filter((item) => item.dataType !== null)
      .every((item) => {
        const val = values[item.itemId];
        return val !== null && val !== undefined && val !== "";
      });
  }, [data, values]);

  // Reset to default (empty) and update backend
  const handleValueDefault = async (itemId) => {
    setValues((prev) => ({ ...prev, [itemId]: "" }));
    const resultId = resultMap[itemId];
    if (!resultId) {
      console.error(`Không tìm thấy resultId cho itemId=${itemId}`);
      return;
    }
    try {
      await updateResult(resultId, {
        value: "",
      });
    } catch (err) {
      console.error(`Revert result ${itemId} failed:`, err);
    }
  };

  // Cancel NG dialog
  const handleCancelNg = () => {
    if (openDialogFor != null) {
      handleValueDefault(openDialogFor);
    }
    setOpenDialogFor(null);
    setAnchorEl(null);
  };

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

  // Initial load or create results once per day
  useEffect(() => {
    if (!sheetDevice.sheetCode) return;
    const today = new Date().toISOString().slice(0, 10);
    const initAsync = async () => {
      setLoading(true);
      try {
        const existing = await getResultsBySheetAndDate(
          sheetDevice.sheetCode,
          sheetDevice.deviceCode,
          today
        );

        if (existing && existing.length > 0) {
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
          setDisabledItems(disabledInit);
          setValues(vals);
        } else {
          // Chưa có kết quả hôm nay: tạo mới batch
          const toCreate = data.map((item) => ({
            ...getBaseInfo(),
            itemId: item.itemId,
            value: "",
          }));

          // Giả định API trả về mảng các đối tượng vừa tạo, có resultId
          const created = await createResults(toCreate);

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
      // console.log(" updateResult succeeded");
    } catch (err) {
      console.error(` updateResult ${resultId} failed:`, err);
      return; // dừng nếu update lỗi
    }

    // 3) Gọi refreshStatus
    try {
      // console.log("calling refreshStatus");
      await refreshStatus();
      // console.log("refreshStatus done");
    } catch (err) {
      // console.error("refreshStatus failed:", err);
    }

    // 4) Nếu NG thì show dialog
    if (newValue === "NG") {
      setOpenDialogFor(itemId);
      setAnchorEl(document.getElementById(`ng-button-${itemId}`));
    }
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
        {value === "NG" && (
          <Button
            id={`ng-button-${itemId}`}
            variant="outlined"
            size="small"
            onClick={(e) => handleOpenNGInfo(itemId, e.currentTarget)}
          >
            <Info fontSize="small" />
            <span className="ml-1">NG</span>
          </Button>
        )}
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

  // Save NG detail
  const handleSaveNgDetail = async (itemId, detail) => {
    const resultId = resultMap[itemId];
    const payload = {
      resultId,
      actionTaken: detail.ActionTaken,
      actionDate: detail.ActionDate,
      confirmedBy: detail.ConfirmedBy,
      confirmedDate: detail.ConfirmedDate,
      note: detail.Note,
    };

    if (!resultId) return;

    // 1) Update kết quả “NG”
    await updateResult(resultId, { value: "NG", ...getBaseInfo() });

    const existResultId = await getResultActionByResultId(resultId);

    // 2) Tạo/Cập nhật result action liên quan
    if (existResultId) {
      // Nếu đã có thì update
      await updateResultActionByResultId(resultId, payload);
    } else {
      await createResultAction(payload);
    }

    // 3) Cập nhật UI và đóng dialog
    setNgDetails((prev) => ({ ...prev, [itemId]: detail }));
    setOpenDialogFor(null);
    setAnchorEl(null);
  };

  // Handle complete
  const handleComplete = () => {
    console.log("All items OK, ready to finish!");

    // Bật Snackbar
    setOpenSnackbar(true);

    // Sau 1 giây thì chuyển trang
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleConfirm = async () => {
    // 1) Tạo mảng payload
    const toConfirm = Object.values(resultMap).map((resultId) => ({
      resultId: resultId,
      confirmedBy: user.auth.username,
    }));

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

  const handleConfirmNG = async () => {
    const itemId = openDialogFor;
    if (itemId != null) {
      const resultId = resultMap[itemId];

      try {
        // Gọi API updateResult để set isConfirm = true
        await updateConfirmNG(resultId, { isConfirmNG: true });

        // Cập nhật state để disable ngay
        setDisabledItems((prev) => ({
          ...prev,
          [itemId]: true,
        }));
      } catch (err) {
        console.error("Confirm NG failed:", err);
        // Có thể setError để hiển thị
      }
    }
    setOpenDialogFor(null);
    setAnchorEl(null);
  };

  const handleOpenNGInfo = async (itemId, targetEl) => {
    const resultId = resultMap[itemId];
    let detail = {};

    if (resultId) {
      // gọi API lấy detail đã lưu (nếu có)
      detail = await getResultActionByResultId(resultId);
    }

    // lưu vào state
    setNgDetails((prev) => ({ ...prev, [itemId]: detail || {} }));
    setOpenDialogNGInfo(itemId);
    setAnchorEl(targetEl);
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="p-4 space-y-6">
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
      {groupedData.map((parent) => (
        <section key={parent.itemId} className="border rounded-xl shadow p-4">
          <h2 className="font-semibold mb-2">{parent.content}</h2>
          <div className="space-y-3 pl-4">
            {parent.children.map((child) => renderNested(child))}
          </div>
        </section>
      ))}

      <div className="flex justify-center">
        {!isChecker ? (
          <Button
            variant="contained"
            color="primary"
            disabled={!isComplete}
            onClick={handleConfirm}
          >
            Xác nhận
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            disabled={!isComplete}
            onClick={handleComplete}
          >
            Chuyển hướng
          </Button>
        )}
      </div>

      {openDialogFor !== null && (
        <NgInfoConfirmDialog
          open
          anchorEl={anchorEl}
          item={data.find((i) => i.itemId === openDialogFor)}
          onSave={handleSaveNgDetail}
          onClose={handleCancelNg}
          onConfirm={handleConfirmNG}
          roles={roles}
          ngDetail={ngDetails[openDialogFor] || {}}
        />
      )}

      {openDialogNGInfo !== null && (
        <NgInfoDialog
          open
          anchorEl={anchorEl}
          item={data.find((i) => i.itemId === openDialogNGInfo)}
          resultId={resultMap[openDialogNGInfo]}
          ngDetail={ngDetails[openDialogNGInfo] || {}}
          onClose={() => {
            setOpenDialogNGInfo(null);
            setAnchorEl(null);
          }}
        />
      )}

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

export default CheckSheet;
