import { Upload } from "lucide-react";
import "../styles/ModalManager.css";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { uploadFile } from "../services/uploadService";

type CategoryData = {
  id: number;
  name: string;
  description: string;
  url_image: string;
};

interface ModalCategoryManagerProps {
  isShowing: boolean;
  hide: () => void;
  category?: CategoryData;
  onSubmit: (category: CategoryData) => void;
}

export default function ModalCategoryManager({
  isShowing,
  hide,
  category,
  onSubmit,
}: ModalCategoryManagerProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isShowing) {
      document.body.classList.add("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
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
      const imageFile = (
        event.currentTarget.querySelector("#url_image") as HTMLInputElement
      ).files?.[0];

      let url_image = category?.url_image;

      if (imageFile) {
        url_image = await uploadFile(imageFile);
      }

      const categoryData: CategoryData = {
        id: category?.id || 0,
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        url_image: url_image || "",
      };

      await onSubmit(categoryData);
      hide();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modify-category-wrapper">
            <div className="category-form">
              <header className="modal-header">
                <h2 className="title-admin-modal">
                  {category ? "Modifier" : "Ajouter"} une catégorie
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
                  <label htmlFor="category-name">Nom de la catégorie</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    defaultValue={category?.name}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category-description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    className="form-textarea"
                    defaultValue={category?.description}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image-upload">Image</label>
                  <div className="image-upload-container">
                    {(previewUrl || category?.url_image) && (
                      <div className="current-image">
                        <img
                          src={previewUrl || category?.url_image}
                          alt="Preview"
                          style={{ maxWidth: "200px", marginBottom: "10px" }}
                        />
                      </div>
                    )}
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      id="url_image"
                      name="url_image"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="url_image" className="upload-label">
                      <Upload className="image-upload-icon" />
                      <p className="upload-text">
                        {isUploading
                          ? "Téléchargement..."
                          : "Uploader une image"}
                      </p>
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
