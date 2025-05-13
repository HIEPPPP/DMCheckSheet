import React from "react";
import logo from "../../assets/img/logo.png";

const PdfNeeded = ({
  cols,
  daysInMonth,
  deviceCode,
  deviceName,
  sheetName,
  monthLabel,
  approvedBy,
  confirmedMonthBy,
}) => {
  const monthString = monthLabel.split("-");
  const month = monthString[1];
  const year = monthString[0];

  const formatViDateTime = (isoString) => {
    const date = new Date(isoString);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const pad = (num) => String(num).padStart(2, "0");

    return `${hour} giờ ${pad(minute)} phút ngày ${pad(day)} tháng ${pad(
      month
    )} năm ${year}`;
  };
  return (
    <div>
      <div className="mt-2 p-4 text-xs bg-white rounded-sm">
        {/* === HEADER === */}
        <div className="flex justify-between items-center mb-4">
          {/* Legend bên trái */}
          <div className="border border-gray-600 p-2 text-[12px]">
            <img src={logo} alt="" />
          </div>

          {/* Title chính giữa */}
          <div className="text-center">
            <h1 className="text-xl font-bold">{sheetName}</h1>
            <h2 className="text-lg font-medium">Mã thiết bị: {deviceCode}</h2>
            <h2 className="text-lg font-medium mt-2">
              Tên thiết bị: <span className="font-bold">{deviceName}</span>
            </h2>
            <div className="mt-1 italic text-sm">
              {`Tháng ${month} Năm ${year}`}{" "}
            </div>
          </div>

          {/* Phê duyệt / Xác nhận bên phải */}
          <div className="flex gap-4">
            <div className="border border-gray-600 p-2 text-[14px]">
              <div className="mb-2">Phê duyệt</div>
              <hr />
              <p className="p-2 font-bold">{approvedBy}</p>
            </div>
            <div className="border border-gray-600 p-2 text-[14px]">
              <div className="mb-2">Xác nhận</div>
              <hr />
              <p className="p-2 font-bold">{confirmedMonthBy}</p>
            </div>
          </div>
        </div>

        {/* === TABLE === */}
        <div className="mt-6 overflow-auto border border-gray-600">
          <table className="w-full table-fixed border-collapse text-[12px]">
            {/* <colgroup>
              <col style={{ width: "32px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "256px" }} />
              <col style={{ width: "256px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "96px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "96px" }} />
            </colgroup> */}
            <thead>
              {/* Row 1: group headers */}
              <tr className="bg-gray-200">
                <th colSpan={1} className="border p-1 text-center font-medium">
                  Thời gian
                </th>
                <th colSpan={3} className="border p-1 text-center font-medium">
                  Nhập
                </th>
                <th colSpan={5} className="border p-1 text-center font-medium">
                  Xuất
                </th>
              </tr>
              {/* Row 2: individual headers */}
              <tr className="bg-gray-100">
                <th className="border p-1 w-1"></th>

                <th className="border p-1 w-14">Số lượng nhập vào</th>
                <th className="border p-1">Tổng số sau nhập</th>
                <th className="border p-1">Xác nhận người quản lý tủ</th>

                <th className="border p-1 w-20">Số lượng lấy ra</th>
                <th className="border p-1 w-24">Tổng số còn lại</th>
                <th className="border p-1 w-20">Chữ ký người lấy</th>
                <th className="border p-1 w-24">Bộ phận</th>
                <th className="border p-1 w-24">Xác nhận người quản lý tủ</th>
              </tr>
            </thead>
            <tbody>
              {cols?.map((col, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border p-1 text-center">
                    {formatViDateTime(col.fileTime)}
                  </td>
                  <td className="border p-1 text-center">{col.qtyEnter}</td>
                  <td className="border p-1 text-center">{col.totalEnter}</td>
                  <td className="border p-1 text-center">{col.confirmedBy} </td>
                  <td className="border p-1 text-center">{col.qtyOut} </td>
                  <td className="border p-1 text-center">
                    {col.totalRemaining}{" "}
                  </td>
                  <td className="border p-1 text-center">{col.checkedBy} </td>
                  <td className="border p-1 text-center">{col.department} </td>
                  <td className="border p-1 text-center">{col.confirmedBy} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div />
    </div>
  );
};

export default PdfNeeded;
