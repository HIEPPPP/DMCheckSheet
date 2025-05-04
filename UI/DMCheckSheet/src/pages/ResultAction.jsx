import React, { useContext, useEffect } from "react";
import ActionTable from "../components/UI/ActionTable";
import Notification from "../components/Notification";
import {
  getListResultActionNG,
  updateResultAction,
} from "../services/resultActionServices";
import ActionFormDialog from "../components/UI/ActionFormDialog";
import { AuthContext } from "../contexts/AuthContext";
import { updateResult } from "../services/checkResultServices";
import { useStatus } from "../contexts/StatusContext";

const ResultAction = () => {
  const [resultAction, setResultAction] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    actionId: null,
    resultId: null,
    actionTaken: "",
    actionDate: null,
    confirmedBy: "",
    confirmedDate: null,
  });
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "Cập nhật thành công",
    severity: "success",
  });
  const user = useContext(AuthContext);
  const userCode = user?.auth.username;

  const { refreshStatus } = useStatus();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getListResultActionNG();
        res && setResultAction(res);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, []);

  const handleOpenForm = (action = null) => {
    if (action) {
      setFormData(action); // Gán dữ liệu khi sửa
    } else {
      setFormData({
        resultId: null,
        actionTaken: "",
        actionDate: null,
        confirmedBy: "",
        confirmedDate: null,
        note: "",
      });
    }
    setOpen(true);
  };

  const handleSave = async () => {
    const today = new Date().toISOString().split("T")[0];
    if (formData.actionId) {
      // Cập nhật
      const payload = {
        resultId: formData.resultId,
        actionTaken: formData.actionTaken,
        actionDate: formData.actionDate ?? today,
        confirmedBy: formData.confirmedBy ?? userCode,
        confirmedDate: formData.confirmedDate ?? today,
        note: formData.note,
      };
      const resAction = await updateResultAction(formData.actionId, payload);
      const resValue = await updateResult(formData.resultId, {
        value: formData.value,
        updateAt: today,
        updateBy: userCode,
      });

      refreshStatus(); // Refresh trạng thái sau khi cập nhật

      if (resAction != null && resValue != null) {
        let listAction = await getListResultActionNG();
        listAction && setResultAction(listAction);
      }

      resAction != null
        ? setSnackbar({ open: true, message: "Cập nhật thành công" })
        : setSnackbar({
            open: true,
            message: "Cập nhật thất bại",
            severity: "error",
          });
    }

    setOpen(false);
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Danh sách nội dung NG</h1>

        <ActionTable resultAction={resultAction} onEdit={handleOpenForm} />

        <ActionFormDialog
          open={open}
          formData={formData}
          setFormData={setFormData}
          onClose={() => setOpen(false)}
          onSave={handleSave}
        ></ActionFormDialog>

        <Notification
          {...snackbar}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        ></Notification>
      </div>
    </div>
  );
};

export default ResultAction;
