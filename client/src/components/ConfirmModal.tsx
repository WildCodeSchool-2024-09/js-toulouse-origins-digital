import ReactDOM from "react-dom";
import "../styles/AlertModal.css";
import "../styles/ConfirmModal.css";

interface ConfirmInfo {
  title: string;
  message: string;
}

interface ConfirmModalProps {
  isShowing: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmInfo: ConfirmInfo;
}

export default function ConfirmModal({
  isShowing,
  onClose,
  onConfirm,
  confirmInfo,
}: ConfirmModalProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="confirm-modal">
            <header className="modal-header">
              <h2 className="title-confirm-modal">{confirmInfo.title}</h2>
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
              >
                <span>&times;</span>
              </button>
            </header>
            <div className="modal-content">
              <p className="confirm-message">{confirmInfo.message}</p>
              <div className="confirm-buttons">
                <button
                  type="button"
                  className="btn btn-cancel"
                  onClick={onClose}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn btn-confirm"
                  onClick={onConfirm}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
