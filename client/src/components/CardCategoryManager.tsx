import { useState } from "react";
import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import useDeleteCategory from "../services/deleteCategory";
import "../styles/CardCategoryManager.css";
import ConfirmModal from "./ConfirmModal";

interface CardCategoryManagerProps {
  id: number;
  name: string;
  description: string;
  url_image: string;
  onEdit: () => void;
  onDelete: (deletedId: number) => void;
  style?: React.CSSProperties;
  className?: string;
}

export default function CardCategoryManager({
  id,
  name,
  description,
  url_image,
  onEdit,
  onDelete,
  style,
  className,
}: CardCategoryManagerProps) {
  const [isShowingConfirm, setIsShowingConfirm] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState({ title: "", message: "" });
  const deleteCategory = useDeleteCategory();

  const toggleConfirm = () => setIsShowingConfirm(!isShowingConfirm);

  const fullImageUrl = url_image
    ? url_image.startsWith("http")
      ? url_image
      : `${import.meta.env.VITE_API_URL}${url_image}`
    : "";

  const showConfirm = (title: string, message: string) => {
    setConfirmInfo({ title, message });
    setIsShowingConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteCategory(id);
      onDelete(id);
      toggleConfirm();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleDelete = () => {
    showConfirm(
      "Confirmation de suppression",
      `Êtes-vous sûr de vouloir supprimer la catégorie "${name}" ?`,
    );
  };

  return (
    <>
      <ConfirmModal
        isShowing={isShowingConfirm}
        onClose={toggleConfirm}
        onConfirm={handleConfirmDelete}
        confirmInfo={confirmInfo}
      />
      <div className={`category-card ${className || ""}`} style={style}>
        <img className="category-avatar" src={fullImageUrl} alt="" />
        <div className="category-info">
          <p className="category-title">{name}</p>
          <p className="category-description">{description}</p>
        </div>
        <div className="category-actions">
          <img
            width={30}
            className="edit"
            src={editPicto}
            alt="Modifier"
            onClick={onEdit}
            onKeyDown={onEdit}
          />
          <img
            width={30}
            className="delete"
            src={deletePicto}
            alt="Supprimer"
            onClick={handleDelete}
            onKeyDown={handleDelete}
          />
        </div>
      </div>
    </>
  );
}
