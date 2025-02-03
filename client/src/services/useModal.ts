import { useState } from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  function toggle(id?: number | null) {
    if (id !== undefined) {
      setEditingId(id);
    } else {
      setEditingId(null);
    }
    setIsShowing(!isShowing);
  }

  return {
    isShowing,
    editingId,
    toggle,
  };
};

export default useModal;
