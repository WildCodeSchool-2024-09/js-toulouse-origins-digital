import "../styles/UserLogin.css";
import { useState } from "react";

export default function UserLogin() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div
      className="modal-user-login-signup"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
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
          <a href="/forgot-password" className="forgot-password-link">
            Mot de passe oublié ?
          </a>
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
          <input type="text" placeholder="Pseudo*" className="input-field" />
          <input type="email" placeholder="Email*" className="input-field" />
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
  );
}
