import "../styles/UserSignUp.css";

export default function UserSignUp() {
  return (
    <div className="modal-user-signup">
      <h1 className="signup-title">Je crée un compte</h1>
      <div className="user-signup">
        <input
          type="text"
          placeholder="Pseudo*"
          className="pseudo-input-signup"
        />
        <input
          type="email"
          placeholder="Email*"
          className="email-input-signup"
        />
        <input
          type="password"
          placeholder="Mot de passe*"
          className="password-input-signup"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe*"
          className="confirm-password-input-signup"
        />
        <button type="button" className="signup-button">
          S'inscrire
        </button>
        <p className="login-link-signup">
          Déjà un compte ?{" "}
          <a href="/login" className="login-link">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
