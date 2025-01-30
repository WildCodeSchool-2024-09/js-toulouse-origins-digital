import { useState } from "react";
import imgProfile from "../assets/images/user-solid.svg";
import "../styles/UserLogout.css";
import { useNavigate, useOutletContext } from "react-router-dom";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

export default function UserLogout() {
  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };
  const navigate = useNavigate();

  const [Password, setPassword] = useState(false);
  const [Pseudo, setPseudo] = useState(false);
  const [Email, setEmail] = useState(false);

  const togglePassword = () => setPassword((visible) => !visible);
  const togglePseudo = () => setPseudo((visible) => !visible);
  const toggleEmail = () => setEmail((visible) => !visible);

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });

      setAuth(null);
      navigate("/home");
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <div className="user-login-out">
        <h1 className="login-signup-title">Mon profil</h1>
        <button type="button" className="first-button">
          Modifier l'image
        </button>
        <img src={imgProfile} alt="Profile" className="profile-picture" />
        <button type="button" className="first-button" onClick={togglePassword}>
          {Password
            ? "Fermer l'onglet mot de passe "
            : "Changer le mot de passe"}
        </button>
        {Password && (
          <div>
            <input
              type="password"
              placeholder="Nouveau mot de passe*"
              className="input-area"
            />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe*"
              className="input-area"
            />
            <button type="button" className="input-area button">
              Valider
            </button>
          </div>
        )}
        <button type="button" className="first-button" onClick={togglePseudo}>
          {Pseudo ? "Fermer l'onglet pseudo" : "Changer de pseudo"}
        </button>
        {Pseudo && (
          <div>
            <input type="text" placeholder="Pseudo*" className="input-area" />
            <button type="button" className="input-area button">
              Valider
            </button>
          </div>
        )}
        <button type="button" className="first-button" onClick={toggleEmail}>
          {Email ? "Fermer l'onglet email" : "Changer l'adresse email"}
        </button>
        {Email && (
          <div>
            <input
              type="text"
              placeholder="Nouvel email*"
              className="input-area"
            />
            <input
              type="text"
              placeholder="Confirmation du nouvel email*"
              className="input-area"
            />
            <button type="button" className="input-area button">
              Valider
            </button>
          </div>
        )}
        <button type="button" className="last-button" onClick={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
