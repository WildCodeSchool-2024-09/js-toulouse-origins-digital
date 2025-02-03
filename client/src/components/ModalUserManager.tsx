import { Upload } from "lucide-react";
import "../styles/ModalManager.css";
import { useEffect } from "react";
import ReactDOM from "react-dom";

type UserData = {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string;
  is_admin: boolean;
};

interface ModalUserManagerProps {
  isShowing: boolean;
  hide: () => void;
  user?: UserData;
  onSubmit: (user: UserData) => void;
}

export default function ModalUserManager({
  isShowing,
  hide,
  user,
  onSubmit,
}: ModalUserManagerProps) {
  useEffect(() => {
    if (isShowing) {
      document.body.classList.add("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isShowing]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const userData: UserData = {
      id: user?.id || 0,
      pseudo: formData.get("pseudo") as string,
      email: formData.get("email") as string,
      is_admin: formData.get("is_admin") === "on",
      avatar_url: user?.avatar_url || "",
    };

    onSubmit(userData);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modify-category-wrapper">
            <div className="category-form">
              <header className="modal-header">
                <h2 className="title-admin-modal">Modifier un utilisateur</h2>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </header>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="user-pseudo">Pseudo</label>
                  <input
                    type="text"
                    id="pseudo"
                    name="pseudo"
                    className="form-input"
                    defaultValue={user?.pseudo}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="user-email">E-mail</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-input"
                    defaultValue={user?.email}
                  />
                </div>
                <div className="toggle-switch-container">
                  <label className="toggle-switch">
                    <input
                      id="is_admin"
                      name="is_admin"
                      type="checkbox"
                      defaultChecked={user?.is_admin}
                    />
                    <span
                      className="slider"
                      aria-label="toggle switch indicator"
                    />
                  </label>
                  <span className="toggle-label">Administrateur</span>
                </div>
                <div className="form-group">
                  <label htmlFor="image-upload">Image</label>
                  <div className="image-upload-container">
                    {user?.avatar_url && (
                      <div className="current-image">
                        <img
                          src={user.avatar_url}
                          alt="Current"
                          style={{ maxWidth: "200px", marginBottom: "10px" }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      id="avatar_url"
                      name="avatar_url"
                    />
                    <label htmlFor="image-upload">
                      <Upload className="image-upload-icon" />
                      <p className="upload-text">Uploder une image</p>
                      <p className="upload-subtext">PNG, JPG jusqu'à 10MB</p>
                    </label>
                  </div>
                </div>
                <div className="form-buttons">
                  <button
                    className="btn btn-cancel"
                    type="button"
                    onClick={hide}
                  >
                    Annuler
                  </button>
                  <button className="btn btn-submit" type="submit">
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
