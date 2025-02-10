import { useState } from "react";

interface AlertInfo {
  title: string;
  message: string;
  type: "success" | "error" | "warning";
}

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [alertInfo, setAlertInfo] = useState<AlertInfo>({
    title: "",
    message: "",
    type: "error",
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

  return {
    isShowing,
    editingId,
    alertInfo,
    toggle,
    showAlert,
  };
};

export default useModal;
