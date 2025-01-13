import "../styles/UserLogin.css";

export default function UserLogin() {
  return (
    <div
      className="modal-user-login"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <h1 className="login-title">Je me connecte</h1>
      <div className="user-login">
        <input
          type="text"
          placeholder="Identifiant"
          className="pseudo-input-login"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="password-input-login"
        />
        <a href="/forgot-password" className="forgot-password-link">
          Mot de passe oublié ?
        </a>
        <button type="button" className="login-button">
          Se connecter
        </button>
        <p className="signup-link-login">
          Pas encore de compte ?{" "}
          <a href="/signup" className="signup-link">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  );
}
