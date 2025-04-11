import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import BooleanToggleSwitch from "../components/BooleanToggleSwitch";
import { getItemBySheetCode } from "../services/itemServices";
import { getByDeviceAndCheckSheetCode } from "../services/checkSheetDeviceServices";
import { createResults } from "../services/checkResultServices";
import { AuthContext } from "../contexts/AuthContext";

const CheckSheet = () => {
  const { code } = useParams();
  const [deviceCode, checkSheetCode] = code.split("-");
  const [sheetDevice, setSheetDevice] = useState([]);
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [values, setValues] = useState({});

  const user = useContext(AuthContext);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getByDeviceAndCheckSheetCode(
          deviceCode,
          checkSheetCode
        );
        if (!res) {
          console.error(
            "Không tìm thấy dữ liệu cho mã qrData:",
            `${deviceCode} - ${checkSheetCode}`
          );
          return;
        }
        setSheetDevice(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, [deviceCode, checkSheetCode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getItemBySheetCode(sheetDevice.sheetCode);
        if (!res) {
          console.error("Không tìm thấy dữ liệu cho mã qrData:", qrData);
          return;
        }
        setData(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [sheetDevice]);

  useEffect(() => {
    const buildTree = (items) => {
      const map = new Map();
      const roots = [];

      items.forEach((item) => {
        item.children = [];
        map.set(item.itemId, item);
      });

      items.forEach((item) => {
        if (item.parentId && map.has(item.parentId)) {
          map.get(item.parentId).children.push(item);
        } else {
          roots.push(item);
        }
      });

      return roots;
    };

    const treeData = buildTree(data);
    setGroupedData(treeData);
  }, [data]);

  const handleValueChange = (itemId, newValue) => {
    setValues((prev) => ({
      ...prev,
      [itemId]: newValue,
    }));
  };

  const renderInputByType = (child) => {
    const { dataType, itemId } = child;
    const value = values[itemId] || "";

    switch (dataType) {
      case "BOOLEAN":
        return (
          <BooleanToggleSwitch
            defaultValue="-"
            onChange={(val) => handleValueChange(itemId, val)}
          />
        );
      case "TEXT":
        return (
          <TextField
            size="small"
            variant="outlined"
            value={value}
            onChange={(e) => handleValueChange(itemId, e.target.value)}
          />
        );
      case "NUMBER":
        return (
          <TextField
            size="small"
            type="number"
            variant="outlined"
            value={value}
            onChange={(e) => handleValueChange(itemId, e.target.value)}
          />
        );
      case "DATE":
        return (
          <TextField
            size="small"
            type="date"
            variant="outlined"
            value={value}
            onChange={(e) => handleValueChange(itemId, e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        );
      default:
        return <span>Chưa hỗ trợ kiểu: {dataType}</span>;
    }
  };

  const renderNestedChildren = (item) => {
    return (
      <div key={item.itemId} className="ml-4 space-y-2">
        <div className="flex items-center justify-between gap-4">
          <span>{item.content}</span>
          <div>{renderInputByType(item)}</div>
        </div>
        {item.children?.length > 0 && (
          <div className="pl-4 border-l border-gray-300">
            {item.children.map((child) => renderNestedChildren(child))}
          </div>
        )}
      </div>
    );
  };

  const handleSubmit = async () => {
    const now = new Date().toISOString();

    const baseInfo = {
      formNo: sheetDevice.formNo,
      sheetName: sheetDevice.sheetName,
      deviceCode: sheetDevice.deviceCode,
      deviceName: sheetDevice.deviceName,
      frequency: sheetDevice.frequency,
      location: sheetDevice.location,
      checkedDate: now,
      checkedBy: user.auth.username,
      note: "",
    };

    // Tạo mảng dữ liệu cần lưu
    const dataToSave = Object.entries(values).map(([itemId, value]) => ({
      ...baseInfo,
      value,
      itemId: parseInt(itemId),
    }));

    try {
      const res = await createResults(dataToSave);
      res != null
        ? alert("Lưu dữ liệu thành công")
        : alert("Lưu dữ liệu thất bại");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      alert("Lưu dữ liệu thất bại");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="font-bold text-4xl">{sheetDevice.sheetName}</h1>
        <div className="flex justify-between items-center mt-4">
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Mã thiết bị: {sheetDevice.deviceCode}
            </h2>
            <div className="flex items-center gap-4">
              <h2>Tên thiết bị: {sheetDevice.deviceName}</h2>
            </div>
          </div>
          <p>Người kiểm tra: {user.auth.fullName}</p>
        </div>
      </div>
      {groupedData.map((parent) => (
        <div key={parent.itemId} className="border rounded-xl shadow p-4">
          <h2 className="text-lg font-semibold mb-2">{parent.content}</h2>
          <div className="space-y-3 pl-4">
            {parent.children.map((child) => renderNestedChildren(child))}
          </div>
        </div>
      ))}

      <div className="text-center mt-10">
        <Button variant="contained" onClick={handleSubmit}>
          Hoàn thành
        </Button>
      </div>
    </div>
  );
};

export default CheckSheet;
