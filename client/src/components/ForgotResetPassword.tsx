import { useState } from "react";
import "../styles/AuthStyles.css";

interface ForgotResetProps {
  isForgot: boolean;
  switchToReset: () => void;
  switchToLogin: () => void;
}

export default function ForgotResetPassword({
  isForgot,
  switchToReset,
  switchToLogin,
}: ForgotResetProps) {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    setTimeout(() => {
      switchToReset();
    }, 200);
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="modal-user-login-signup">
        {isForgot ? (
          <div className="forgot-password">
            <h1 className="login-signup-title">Mot de passe oublié</h1>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="button"
              className="primary-button"
              onClick={handleEmailSubmit}
            >
              Confirmer le mail
            </button>
            <p className="switch-link">
              <button
                type="button"
                className="switch-button"
                onClick={switchToLogin}
              >
                Retour à la connexion
              </button>
            </p>
          </div>
        ) : (
          <div className="reset-password">
            <h1 className="login-signup-title">
              Réinitialiser le mot de passe
            </h1>
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              className="input-field"
            />
            <button type="button" className="primary-button">
              Réinitialiser le mot de passe
            </button>
            <p className="switch-link">
              <button
                type="button"
                className="switch-button"
                onClick={switchToLogin}
              >
                Retour à la connexion
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
