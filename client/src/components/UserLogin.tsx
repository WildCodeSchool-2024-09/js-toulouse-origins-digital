import ForgotResetPassword from "./ForgotResetPassword";
import "../styles/UserLogin.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

export default function UserLogin() {
  const { auth } = useOutletContext() as { auth: Auth };
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
  });

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      alert(
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
    setUser({ ...user, [name]: value });
  };

  const handleSubscriptionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        },
      );
      if (response) {
        const responseData = await response.json();
        setResponseMessage(
          `Compte créé avec succès! pseudo:${responseData.pseudo}`,
        );
        navigate(`/users/${responseData.id}`);
      } else {
        setResponseMessage(
          "Une erreur inconnue s'est produite. Veuillez réessayer",
        );
      }
    } catch (error) {
      setResponseMessage("Une erreur s'est produite. Veuillez réessayer");
    }
  };

  const handleConnexionSubmit = () => {
    fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.token}`,
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((responseData) => {
        navigate(`/users/${responseData.id}`);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="modal-user-login-signup"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      {currentView === "login" && (
        <div className="modal-user-login-signup">
          {isLogin ? (
            <form className="user-login" onSubmit={handleConnexionSubmit}>
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
                {" "}
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
            </form>
          ) : (
            <form className="user-signup" onSubmit={handleSubscriptionSubmit}>
              <h1 className="login-signup-title">Je crée un compte</h1>
              <input
                type="text"
                name="Pseudo"
                placeholder="Pseudo*"
                className="input-field"
                value={user.pseudo}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="Email"
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
                name="password"
                placeholder="Confirmer le mot de passe*"
                className="input-field"
                value={user.password}
                onChange={handleChange}
                required
              />
              {error && <p style={{ color: "red" }}>{error}</p>}
              <button type="button" className="primary-button">
                S'inscrire
              </button>
              {responseMessage && (
                <p
                  className="response-message"
                  style={{ color: "green", marginTop: "10px" }}
                >
                  {responseMessage}
                </p>
              )}
              <p className="switch-link">
                Déjà un compte ?{" "}
                <button
                  type="submit"
                  className="switch-button"
                  onClick={() => setIsLogin(true)}
                >
                  Se connecter
                </button>
              </p>
            </form>
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
