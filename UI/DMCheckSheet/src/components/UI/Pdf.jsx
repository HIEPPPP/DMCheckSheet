import { Button } from "@mui/material";
import React from "react";

const Pdf = (
  {
    rows,
    daysInMonth,
    deviceCode,
    sheetName,
    monthLabel,
    actions,
    approvedBy,
    confirmedMonthBy,
  },
  ref
) => {
  const monthString = monthLabel.split("-");
  const month = monthString[1];
  const year = monthString[0];

  return (
    <div>
      <div className="mt-2 p-4 text-xs bg-white rounded-sm">
        {/* === HEADER === */}
        <div className="flex justify-between items-center mb-4">
          {/* Legend bên trái */}
          <div className="border border-gray-600 p-2 text-[12px]">
            <div className="flex items-center">
              <span className="inline-block w-4">O</span>
              <span>Tốt</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4">X</span>
              <span>Cần chỉnh sửa</span>
            </div>
            <div className="flex items-center">
              <span className="inline-block w-4">/</span>
              <span>Ngày nghỉ, không check</span>
            </div>
          </div>

          {/* Title chính giữa */}
          <div className="text-center">
            <h1 className="text-xl font-bold">{sheetName}</h1>
            <h2 className="text-lg font-medium">Mã thiết bị: {deviceCode}</h2>
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

        {/* === TABLE 31 ngày === */}
        <div>
          <div className="overflow-auto border border-gray-600">
            <table className="w-full table-fixed border-collapse text-[12px]">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border p-1 w-6">#</th>
                  <th className="border p-1 w-32">Kiểm tra</th>
                  <th className="border p-1 w-64">Nội dung kiểm tra</th>
                  {Array.from({ length: daysInMonth }, (_, i) => (
                    <th key={i} className="border p-1 w-10 text-center">
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows?.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border p-1 text-center">{idx + 1}</td>
                    <td className="border p-1">{row.parentContent}</td>
                    <td className="border p-1">{row.content}</td>
                    <td className="border p-1 text-center"> </td>
                    {Array.from({ length: daysInMonth - 1 }, (_, i) => {
                      const key = `day${i + 2}`;
                      return (
                        <td key={i} className="border p-1 text-center">
                          {row[key] || ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* === TABLE NG === */}
        <div className="mt-6 overflow-auto border border-gray-600">
          <table className="w-full table-fixed border-collapse text-[12px]">
            <colgroup>
              <col style={{ width: "32px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "256px" }} />
              <col style={{ width: "256px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "96px" }} />
              <col style={{ width: "80px" }} />
              <col style={{ width: "96px" }} />
            </colgroup>
            <thead>
              {/* Row 1: group headers */}
              <tr className="bg-gray-200">
                <th colSpan={3} className="border p-1 text-center font-medium">
                  Chưa đạt
                </th>
                <th colSpan={2} className="border p-1 text-center font-medium">
                  Khắc phục
                </th>
                <th colSpan={3} className="border p-1 text-center font-medium">
                  Kiểm tra lại
                </th>
              </tr>
              {/* Row 2: individual headers */}
              <tr className="bg-gray-100">
                <th className="border p-1 w-1">Stt</th>
                <th className="border p-1 w-14">Ngày</th>
                <th className="border p-1">Nội dung chưa đạt</th>

                <th className="border p-1">Khắc phục</th>
                <th className="border p-1 w-20">Ngày</th>

                <th className="border p-1 w-24">Người kiểm tra</th>
                <th className="border p-1 w-20">Ngày</th>
                <th className="border p-1 w-24">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {actions?.map((action, i) => (
                <tr
                  key={i}
                  className="even:bg-white odd:bg-gray-50 hover:bg-gray-200"
                >
                  <td className="border p-1 text-center">{i + 1}</td>
                  <td className="border p-1">
                    {action.checkedDate?.toString().slice(0, 10)}
                  </td>
                  <td className="border p-1">{action.content}</td>

                  <td className="border p-1">{action.actionTaken}</td>
                  <td className="border p-1">
                    {action.actionDate?.toString().slice(0, 10)}
                  </td>

                  <td className="border p-1">{action.confirmedBy}</td>
                  <td className="border p-1">
                    {action.confirmedDate?.toString().slice(0, 10)}
                  </td>
                  <td className="border p-1">{action.note}</td>
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

export default Pdf;
