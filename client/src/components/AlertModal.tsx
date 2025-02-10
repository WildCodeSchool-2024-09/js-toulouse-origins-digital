import ReactDOM from "react-dom";
import "../styles/AlertModal.css";

interface AlertInfo {
  title: string;
  message: string;
  type: string;
}

interface AlertModalProps {
  isShowing: boolean;
  onClose: () => void;
  alertInfo: AlertInfo;
}

export default function AlertModal({
  isShowing,
  onClose,
  alertInfo,
}: AlertModalProps) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className="modal-overlay">
          <div className="alert-modal">
            <header className={`modal-header ${alertInfo.type}`}>
              <h2 className="title-alert-modal">{alertInfo.title}</h2>
              <button
                type="button"
                className="modal-close-button"
                onClick={onClose}
              >
                <span>&times;</span>
              </button>
            </header>
            <div className="modal-content">
              <p className="alert-message">{alertInfo.message}</p>
              <button
                type="button"
                className="btn btn-confirm"
                onClick={onClose}
              >
                OK
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
    : null;
}
