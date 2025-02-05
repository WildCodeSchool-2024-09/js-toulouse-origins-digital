import "../styles/UserModal.css";
import UserLogout from "./UserLogout";
import UserProfileSettings from "./UserProfileSettings";

export default function UserModal() {
  return (
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="user-login-out">
        <h1 className="login-signout-title">Mon profil</h1>
        <UserProfileSettings />
        <UserLogout />
      </div>
    </div>
  );
}
