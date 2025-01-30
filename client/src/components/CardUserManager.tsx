import editPicto from "../assets/images/pencil-management.png";
import deletePicto from "../assets/images/trash-management.png";
import "../styles/CardUserManager.css";

interface CardUserManagerProps {
  pseudo: string;
  email: string;
  avatar_url: string;
  is_admin: boolean;
}

export default function CardUserManager({
  pseudo,
  email,
  avatar_url,
  is_admin,
}: CardUserManagerProps) {
  return (
    <div className="admin-card user-card">
      <img
        className={`${is_admin ? "user-avatar-admin" : "user-avatar"}`}
        src={avatar_url}
        alt=""
      />
      <div className="user-info">
        <p className="user-name">{pseudo}</p>
        <p className="user-email">{email}</p>
      </div>
      <div className="user-actions">
        <img width={30} className="edit" src={editPicto} alt="" />
        <img width={30} className="delete" src={deletePicto} alt="" />
      </div>
    </div>
  );
}
