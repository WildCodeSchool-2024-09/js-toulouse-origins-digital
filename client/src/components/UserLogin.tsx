import ForgotResetPassword from "./ForgotResetPassword";
import "../styles/UserLogin.css";
import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useNav } from "../contexts/NavProvider";

type User = {
  id: number;
};

type Auth = {
  user: User;
  token: string;
};

export default function UserLogin() {
  const { isOpenLogin, setIsOpenLogin } = useNav();
  const [currentView, setCurrentView] = useState<
    "login" | "forgotPassword" | "resetPassword"
  >("login");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState({
    pseudo: "",
    email: "",
    password: "",
    confirmPassword: "",
    is_admin: false,
    id: Number,
  });

  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setError(
        "Veuillez entrer un email valide au format prenom.nom@main.extension",
      );
    } else {
      setError("");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "email") {
      validateEmail(value);
    }
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubscriptionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError("");
    setResponseMessage("");

    if (user.password !== user.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        },
      );
      if (response.ok) {
        const responseData = await response.json();
        setResponseMessage(
          `Compte créé avec succès! pseudo:${responseData.pseudo}`,
        );
        setError("");

        setTimeout(() => setIsLogin(!isLogin), 1000);
      } else {
        const errorData = await response.json();
        setResponseMessage(
          errorData.message ||
            "Une erreur inconnue s'est produite. Veuillez réessayer.",
        );
      }
    } catch (error) {
      setResponseMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const handleConnexionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setResponseMessage("");

    if (!user.email || !user.password) {
      setResponseMessage("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: user.email,
            password: user.password,
          }),
        },
      );

      if (response.ok) {
        const user = await response.json();
        setAuth(user);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.id,
            pseudo: user.pseudo,
            email: user.email,
          }),
        );
        setIsOpenLogin(!isOpenLogin);
        navigate("/home");
        setResponseMessage("Connexion réussie !");
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.message || "Identifiants incorrects.");
      }
    } catch (error) {
      setResponseMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="modal-container">
      {currentView === "login" && (
        <div className="modal-overlay">
          <div
            className="modal-user-login-signup"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {isLogin ? (
              <form className="user-login" onSubmit={handleConnexionSubmit}>
                <h1 className="login-signup-title login-title">Connexion</h1>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="input-field"
                  value={user.email}
                  onChange={handleChange}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe"
                  className="input-field"
                  value={user.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="forgot-password-link"
                  onClick={() => setCurrentView("forgotPassword")}
                >
                  Mot de passe oublié ?
                </button>
                {responseMessage && (
                  <div
                    className={`modal-message ${
                      responseMessage.includes("erreur") ? "error" : "success"
                    }`}
                  >
                    {responseMessage}
                  </div>
                )}
                <button type="submit" className="primary-button">
                  Se connecter
                </button>
                <div className="switch-link">
                  <span>
                    {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                  </span>
                  <button
                    type="button"
                    className="switch-button"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "S'inscrire" : "Se connecter"}
                  </button>
                </div>
              </form>
            ) : (
              <form className="user-signup" onSubmit={handleSubscriptionSubmit}>
                <h1 className="login-signup-title login-title">
                  Je crée un compte
                </h1>
                <input
                  type="text"
                  name="pseudo"
                  placeholder="Pseudo*"
                  className="input-field"
                  value={user.pseudo}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  className="input-field"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Mot de passe*"
                  className="input-field"
                  value={user.password}
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le mot de passe*"
                  className="input-field"
                  value={user.confirmPassword || ""}
                  onChange={handleChange}
                  required
                />
                {error && <div className="modal-message error">{error}</div>}
                {responseMessage && (
                  <div
                    className={`modal-message ${
                      responseMessage.includes("erreur") ? "error" : "success"
                    }`}
                  >
                    {responseMessage}
                  </div>
                )}
                <button
                  type="submit"
                  className="primary-button"
                  disabled={user.password !== user.confirmPassword}
                >
                  S'inscrire
                </button>
                <div className="switch-link">
                  <span>
                    {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                  </span>
                  <button
                    type="button"
                    className="switch-button"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "S'inscrire" : "Se connecter"}
                  </button>
                </div>
              </form>
            )}
          </div>
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
