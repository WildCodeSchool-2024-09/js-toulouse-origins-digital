import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import imgProfile from "../assets/images/user-solid.svg";
import "../styles/UserLogin.css";

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

  const [Password, setPassword] = useState(false);
  const [Pseudo, setPseudo] = useState(false);
  const [Email, setEmail] = useState(false);

  const togglePassword = () => setPassword((visible) => !visible);
  const togglePseudo = () => setPseudo((visible) => !visible);
  const toggleEmail = () => setEmail((visible) => !visible);

  return (
    <div>
      <div className="user-login">
        <h1 className="login-signup-title">Mon profil</h1>
        <button type="button" className="primary-button">
          Modifier l'image
        </button>
        <img
          src={imgProfile}
          alt="Profile"
          className="nav-icon-profile-style"
        />
        <button
          type="button"
          className="primary-button"
          onClick={togglePassword}
        >
          {Password ? "Fermer" : "Changer le mot de passe"}
        </button>
        {Password && (
          <div>
            <input
              type="password"
              placeholder="Nouveau mot de passe*"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Confirmer le nouveau mot de passe*"
              className="input-field"
            />
            <button type="button" className="primary-button">
              Valider
            </button>
          </div>
        )}
        <button type="button" className="primary-button" onClick={togglePseudo}>
          {Pseudo ? "Fermer" : "Changer de pseudo"}
        </button>
        {Pseudo && (
          <div>
            <input type="text" placeholder="Pseudo*" className="input-field" />
            <button type="button" className="primary-button">
              Valider
            </button>
          </div>
        )}
        <button type="button" className="primary-button" onClick={toggleEmail}>
          {Email ? "Fermer" : "Changer l'adresse email"}
        </button>
        {Email && (
          <div>
            <input
              type="text"
              placeholder="Nouvel email*"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Confirmation du nouvel email*"
              className="input-field"
            />
            <button type="button" className="primary-button">
              Valider
            </button>
          </div>
        )}
        <button
          type="button"
          className="primary-button"
          onClick={() => {
            setAuth(null);
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}
