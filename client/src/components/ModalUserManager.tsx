import { Upload } from "lucide-react";
import "../styles/ModalManager.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { uploadFile } from "../services/uploadService";
import useModal from "../services/useModal";
import AlertModal from "./AlertModal";

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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    isShowing: isShowingAlert,
    alertInfo,
    toggle: toggleAlert,
    showAlert,
  } = useModal();

  useEffect(() => {
    if (isShowing) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isShowing]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);

    try {
      const formData = new FormData(event.currentTarget);
      if (!formData.get("pseudo")?.toString().trim()) {
        showAlert("Erreur", "Le pseudo est requis", "error");
        return;
      }
      if (!formData.get("email")?.toString().trim()) {
        showAlert("Erreur", "L'email est requis", "error");
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.get("email")?.toString() || "")) {
        showAlert("Erreur", "Veuillez entrer un email valide", "error");
        return;
      }

      const avatarFile = (
        event.currentTarget.querySelector("#avatar_url") as HTMLInputElement
      ).files?.[0];

      let avatar_url = user?.avatar_url;

      if (avatarFile) {
        avatar_url = await uploadFile(avatarFile);
      }

      const userData: UserData = {
        id: user?.id || 0,
        pseudo: formData.get("pseudo") as string,
        email: formData.get("email") as string,
        is_admin: formData.get("is_admin") === "on",
        avatar_url: avatar_url || "",
      };

      await onSubmit(userData);
      setPreviewUrl(null);
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <AlertModal
        isShowing={isShowingAlert}
        onClose={toggleAlert}
        alertInfo={alertInfo}
      />
      {isShowing
        ? ReactDOM.createPortal(
            <div className="modal-overlay">
              <div className="modify-category-wrapper">
                <div className="category-form">
                  <header className="modal-header">
                    <h2 className="title-admin-modal">
                      Modifier un utilisateur
                    </h2>
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
                        {(previewUrl || user?.avatar_url) && (
                          <div className="current-image">
                            <img
                              src={previewUrl || user?.avatar_url}
                              alt="Preview"
                              style={{
                                maxWidth: "200px",
                                marginBottom: "10px",
                              }}
                            />
                          </div>
                        )}
                        <input
                          type="file"
                          accept=".png,.jpg,.jpeg"
                          className="hidden"
                          id="avatar_url"
                          name="avatar_url"
                          onChange={handleFileChange}
                        />
                        <label htmlFor="avatar_url" className="upload-label">
                          <Upload className="image-upload-icon" />
                          <p className="upload-text">
                            {isUploading
                              ? "Téléchargement..."
                              : "Uploader une image"}
                          </p>
                          <p className="upload-subtext">
                            PNG, JPG jusqu'à 10MB
                          </p>
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
        : null}
    </>
  );
}
