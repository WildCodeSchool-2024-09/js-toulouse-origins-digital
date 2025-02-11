import { useState } from "react";

interface AlertInfo {
  title: string;
  message: string;
  type: "success" | "error" | "warning";
}

interface ConfirmInfo {
  title: string;
  message: string;
}

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    title: "",
    message: "",
    type: "error",
  });
  const [confirmInfo, setConfirmInfo] = useState<ConfirmInfo>({
    title: "",
    message: "",
  });

  function toggle(id?: number | null) {
    if (id !== undefined) {
      setEditingId(id);
    } else {
      setEditingId(null);
    }
    setIsShowing(!isShowing);
  }

  function showAlert(
    title: string,
    message: string,
    type: "success" | "error" | "warning",
  ) {
    setAlertInfo({ title, message, type });
    setIsShowing(!isShowing);
  }

  function showConfirm(title: string, message: string) {
    setConfirmInfo({ title, message });
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    editingId,
    alertInfo,
    confirmInfo,
    toggle,
    showAlert,
    showConfirm,
  };
};

export default useModal;
