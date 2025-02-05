import { useEffect, useState } from "react";
import "../styles/ModalManager.css";
import ReactDOM from "react-dom";

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
  onSubmit: (video: VideoData) => void;
}

export default function ModalVideoManager({
  isShowing,
  hide,
  video,
  onSubmit,
}: ModalVideoManagerProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    video?.categories || [],
  );

  useEffect(() => {
    if (isShowing) {
      document.body.classList.add("modal-open");

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

    if (selectedCategories.length === 0) {
      alert("Veuillez sélectionner au moins 1 catégorie");
      return;
    }

    const formData = new FormData(event.currentTarget);

    const videoData: VideoData = {
      id: video?.id || 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      categories: selectedCategories,
      video_url: video?.video_url || "",
      duration: video?.duration || "",
      date: video?.date || "",
      views: video?.views || 0,
    };

    onSubmit(videoData);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modify-category-wrapper">
            <div className="category-form">
              <header className="modal-header">
                <h2 className="title-admin-modal">
                  {video ? "Modifier" : "Ajouter"} une vidéo
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

                <div className="form-group">
                  <label htmlFor="video-description">Catégories</label>
                  <div>
                    {categories.map((category) => (
                      <label key={category.id} className="category-checkbox">
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
                    {video ? "Enregistrer" : "Ajouter"}
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
