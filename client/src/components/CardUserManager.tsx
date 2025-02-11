import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import useDeleteUser from "../services/deleteUser";
import "../styles/CardUserManager.css";
import { useState } from "react";
import adminBadge from "../assets/images/shield-avatar.png";
import ConfirmModal from "./ConfirmModal";

interface CardUserManagerProps {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string;
  is_admin: boolean;
  onEdit: () => void;
  onDelete: (deletedId: number) => void;
}

export default function CardUserManager({
  id,
  pseudo,
  email,
  avatar_url,
  is_admin,
  onEdit,
  onDelete,
}: CardUserManagerProps) {
  const [isShowingConfirm, setIsShowingConfirm] = useState(false);
  const [confirmInfo, setConfirmInfo] = useState({ title: "", message: "" });
  const deleteUser = useDeleteUser();

  const toggleConfirm = () => setIsShowingConfirm(!isShowingConfirm);

  const fullAvatarUrl = avatar_url.startsWith("http")
    ? avatar_url
    : `${import.meta.env.VITE_API_URL}${avatar_url}`;

  const showConfirm = (title: string, message: string) => {
    setConfirmInfo({ title, message });
    setIsShowingConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteUser(id);
      onDelete(id);
      toggleConfirm();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  const handleDelete = () => {
    showConfirm(
      "Confirmation de suppression",
      `Êtes-vous sûr de vouloir supprimer l'utilisateur "${pseudo}" ?`,
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
      <div
        className={
          id !== 1 ? "admin-card user-card" : "admin-card user-card-blocked"
        }
      >
        {is_admin ? (
          <div className="avatar-container">
            <img className="user-avatar-admin" src={fullAvatarUrl} alt="" />
            {is_admin && <img className="badge" src={adminBadge} alt="" />}
          </div>
        ) : (
          <img className="user-avatar" src={fullAvatarUrl} alt="" />
        )}
        <div className={id !== 1 ? "user-info" : "user-info-blocked"}>
          <p className="user-name">{pseudo}</p>
          <p className="user-email">{email}</p>
        </div>
        {id !== 1 && (
          <div className="user-actions">
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
        )}
      </div>
    </>
  );
}
