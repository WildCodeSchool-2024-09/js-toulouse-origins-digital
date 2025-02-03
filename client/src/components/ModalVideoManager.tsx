import { useEffect } from "react";
import "../styles/ModalManager.css";
import ReactDOM from "react-dom";

type VideoData = {
  id: number;
  title: string;
  description: string;
};

interface ModalVideoManagerProps {
  isShowing: boolean;
  hide: () => void;
  video?: VideoData;
  onSubmit: (user: VideoData) => void;
}

export default function ModalVideoManager({
  isShowing,
  hide,
  video,
  onSubmit,
}: ModalVideoManagerProps) {
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

    const videoData: VideoData = {
      id: video?.id || 0,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
    };
    onSubmit(videoData);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="modify-category-wrapper">
            <div className="category-form">
              <header className="modal-header">
                <h2 className="title-admin-modal">Modifier une vidéo</h2>
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
