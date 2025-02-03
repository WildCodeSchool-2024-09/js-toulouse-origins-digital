import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import useDeleteUser from "../services/deleteUser";
import "../styles/CardUserManager.css";
import adminBadge from "../assets/images/shield-avatar.png";

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
  const deleteUser = useDeleteUser();

  const fullAvatarUrl = avatar_url.startsWith("http")
    ? avatar_url
    : `${import.meta.env.VITE_API_URL}${avatar_url}`;

  const handleDelete = async () => {
    if (
      window.confirm(
        `Êtes-vous sûr de vouloir supprimer l'utilisateur "${pseudo}" ?`,
      )
    ) {
      const success = await deleteUser(id);
      if (success) {
        onDelete(id);
      }
    }
  };
  return (
    <div className="admin-card user-card">
      {is_admin ? (
        <div className="avatar-container">
          <img className="user-avatar-admin" src={fullAvatarUrl} alt="" />
          {is_admin && <img className="badge" src={adminBadge} alt="" />}
        </div>
      ) : (
        <img className="user-avatar" src={fullAvatarUrl} alt="" />
      )}
      <div className="user-info">
        <p className="user-name">{pseudo}</p>
        <p className="user-email">{email}</p>
      </div>
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
    </div>
  );
}
