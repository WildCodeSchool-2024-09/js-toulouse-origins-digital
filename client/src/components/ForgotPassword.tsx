import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  return (
    <div className="modal-forgot-password">
      <h1 className="forgot-password-title">Mot de passe oublié ?</h1>
      <p className="forgot-password-text">
        Entrez votre adresse e-mail ci-dessous et nous vous enverrons un lien de
        confirmation pour réinitialiser votre mot de passe.{" "}
      </p>
      <div className="forgot-password">
        <input
          type="email"
          placeholder="Email*"
          className="email-input-forgot-password"
        />
        <button type="button" className="send-email-button">
          Envoyer
        </button>
        <p className="login-link-forgot-password">
          Retour à la page de connexion{" "}
          <a href="/login" className="login-link">
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
