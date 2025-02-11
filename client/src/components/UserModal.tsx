import { useEffect } from "react";
import "../styles/UserModal.css";
import UserLogout from "./UserLogout";
import UserProfileSettings from "./UserProfileSettings";

type UserModalProps = {
  isOpenLogin: boolean;
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserModal({
  isOpenLogin,
  setIsOpenLogin,
}: UserModalProps) {
  useEffect(() => {
    if (isOpenLogin) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpenLogin]);

  return (
    <>
      {isOpenLogin && (
        <div className="modal-overlay">
          <div
            className="modal-container"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="user-login-out">
              <button
                type="button"
                className="close"
                onClick={() => setIsOpenLogin(false)}
              >
                <span>&times;</span>
              </button>
              <h1 className="login-signout-title">Mon profil</h1>
              <UserProfileSettings />
              <UserLogout />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
