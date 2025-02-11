import { useEffect, useState } from "react";
import "../styles/ModalManager.css";
import ReactDOM from "react-dom";
import useModal from "../services/useModal";
import AlertModal from "./AlertModal";

type VideoData = {
  id: number;
  title: string;
  description: string;
  categories: number[];
  duration: string;
  video_url: string;
  date: string;
  views: number;
};

interface Category {
  id: number;
  name: string;
}

interface ModalVideoManagerProps {
  isShowing: boolean;
  hide: () => void;
  video?: VideoData;
  isEdit?: boolean;
  onSubmit: (video: VideoData) => void;
}

export default function ModalVideoManager({
  isShowing,
  hide,
  video,
  isEdit,
  onSubmit,
}: ModalVideoManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    video?.categories || [],
  );
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

  useEffect(() => {
    if (isShowing) {
      fetch("http://localhost:3310/api/categories")
        .then((response) => response.json())
        .then((data) => setCategories(data));
      if (video?.id) {
        fetch(`http://localhost:3310/api/videocategory/categories/${video.id}`)
          .then((response) => response.json())
          .then((data) =>
            setSelectedCategories(data.map((cat: Category) => cat.id)),
          );
      }
    }
    return () => document.body.classList.remove("modal-open");
  }, [isShowing, video]);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!formData.get("title")?.toString().trim()) {
      showAlert("Erreur", "Le titre est requis", "error");
      return;
    }

    if (!formData.get("description")?.toString().trim()) {
      showAlert("Erreur", "La description est requise", "error");
      return;
    }

    if (!formData.get("video_url")?.toString().trim() && !isEdit) {
      showAlert("Erreur", "L'URL de la vidéo est requis", "error");
      return;
    }

    const videoUrl = formData.get("video_url") as string;

    const videaUrlRegex =
      /^https:\/\/app\.videas\.fr\/embed\/media\/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\/$/;
    if (!isEdit && !videaUrlRegex.test(videoUrl)) {
      showAlert(
        "Erreur",
        `L'URL doit être un lien videas : https://app.videas.fr/embed/media/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX/`,
        "error",
      );
      return;
    }

    if (selectedCategories.length === 0) {
      showAlert(
        "Erreur",
        "Veuillez sélectionner au moins 1 catégorie",
        "error",
      );
      return;
    }

    const videoData: VideoData = {
      id: video?.id || 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      categories: selectedCategories,
      video_url: video?.video_url || videoUrl,
      duration: video?.duration || "",
      date: video?.date || "",
      views: video?.views || 0,
    };

    onSubmit(videoData);
    (event.target as HTMLFormElement).reset();
    setSelectedCategories([]);
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
                      {isEdit ? "Modifier" : "Ajouter"} une vidéo
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
                      <label htmlFor="video-title">Titre</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-input"
                        defaultValue={video?.title}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="video-description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        className="form-textarea"
                        defaultValue={video?.description}
                      />
                    </div>
                    {!isEdit && (
                      <div className="form-group">
                        <label htmlFor="video-video_url">Video</label>
                        <input
                          id="video_url"
                          name="video_url"
                          className="form-input"
                          defaultValue={video?.video_url}
                        />
                      </div>
                    )}

                    <div className="form-group">
                      <label htmlFor="video-description">Catégories</label>
                      <div>
                        {categories.map((category) => (
                          <label
                            key={category.id}
                            className="category-checkbox"
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category.id)}
                              onChange={() => handleCategoryChange(category.id)}
                            />{" "}
                            {category.name}
                          </label>
                        ))}
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
                        {isEdit ? "Enregistrer" : "Ajouter"}
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
