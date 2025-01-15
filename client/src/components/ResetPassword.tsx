import "../styles/ResetPassword.css";

export default function ResetPassword() {
  return (
    <div className="modal-reset-password">
      <h1 className="reset-password-title">Réinitialiser le mot de passe</h1>
      <p className="reset-password-text">
        Entrez votre nouveau mot de passe ci-dessous.
      </p>
      <div className="reset-password">
        <input
          type="password"
          placeholder="Nouveau mot de passe*"
          className="password-input-reset-password"
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe*"
          className="password-input-reset-password"
        />
        <button type="button" className="reset-password-button">
          Réinitialiser
        </button>
        <p className="login-link-reset-password">
          Retour à la page de connexion{" "}
          <a href="/login" className="login-link">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
