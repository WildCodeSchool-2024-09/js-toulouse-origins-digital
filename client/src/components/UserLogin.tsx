import ForgotResetPassword from "./ForgotResetPassword";
import "../styles/AuthStyles.css";
import { useState } from "react";

export default function UserLogin() {
  const [currentView, setCurrentView] = useState<
    "login" | "forgotPassword" | "resetPassword"
  >("login");
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {currentView === "login" && (
        <div className="modal-user-login-signup">
          {isLogin ? (
            <div className="user-login">
              <h1 className="login-signup-title">Je me connecte</h1>
              <input
                type="text"
                placeholder="Identifiant"
                className="input-field"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="input-field"
              />
              <button
                type="button"
                className="forgot-password-link"
                onClick={() => setCurrentView("forgotPassword")}
              >
                Mot de passe oublié ?
              </button>
              <button type="button" className="primary-button">
                Se connecter
              </button>
              <p className="switch-link">
                Pas encore de compte ?{" "}
                <button
                  type="button"
                  className="switch-button"
                  onClick={() => setIsLogin(false)}
                >
                  S'inscrire
                </button>
              </p>
            </div>
          ) : (
            <div className="user-signup">
              <h1 className="login-signup-title">Je crée un compte</h1>
              <input
                type="text"
                placeholder="Pseudo*"
                className="input-field"
              />
              <input
                type="email"
                placeholder="Email*"
                className="input-field"
              />
              <input
                type="password"
                placeholder="Mot de passe*"
                className="input-field"
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe*"
                className="input-field"
              />
              <button type="button" className="primary-button">
                S'inscrire
              </button>
              <p className="switch-link">
                Déjà un compte ?{" "}
                <button
                  type="button"
                  className="switch-button"
                  onClick={() => setIsLogin(true)}
                >
                  Se connecter
                </button>
              </p>
            </div>
          )}
        </div>
      )}

      {(currentView === "forgotPassword" ||
        currentView === "resetPassword") && (
        <ForgotResetPassword
          isForgot={currentView === "forgotPassword"}
          switchToReset={() => setCurrentView("resetPassword")}
          switchToLogin={() => setCurrentView("login")}
        />
      )}
    </div>
  );
}
