import { Upload } from "lucide-react";
import "../styles/AdminModal.css";
import ReactDOM from "react-dom";

interface AdminModalProps {
  isShowing: boolean;
  hide: () => void;
}

export default function AdminModal({ isShowing, hide }: AdminModalProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modify-category-wrapper">
            <div className="category-form">
              <header className="modal-header">
                <h2 className="title-admin-modal">Modifier une catégorie</h2>
                <button
                  type="button"
                  className="modal-close-button"
                  onClick={hide}
                >
                  <span>&times;</span>
                </button>
              </header>
              <form>
                <div className="form-group">
                  <label htmlFor="category-name">Nom de la catégorie</label>
                  <input
                    type="text"
                    id="category-name"
                    name="name"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category-description">Description</label>
                  <textarea
                    id="category-description"
                    name="description"
                    className="form-textarea"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image-upload">Image</label>
                  <div className="image-upload-container">
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      id="image-upload"
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
                  <button className="btn btn-submit" type="button">
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
