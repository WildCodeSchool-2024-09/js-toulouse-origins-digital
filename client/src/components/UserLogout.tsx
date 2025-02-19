import { useEffect, useState } from "react";
import "../styles/UserModal.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useNav } from "../contexts/NavProvider";
import { useSpreadProfileImage } from "../contexts/ProfileImageProvider";

type User = {
  id: number;
  pseudo: string;
  email: string;
};

type Auth = {
  user: User;
  token: string;
};

export default function UserLogout() {
  const localUser = localStorage.getItem("user");
  const parsedUser = localUser ? JSON.parse(localUser) : null;
  const { setAuth } = useOutletContext() as {
    setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
  };

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { setIsOpenLogin } = useNav();
  const { setSpreadProfileImage } = useSpreadProfileImage();

  const handleLogout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
        method: "POST",
        credentials: "include",
      });
      localStorage.clear();
      document.cookie =
        "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
      setSpreadProfileImage(null);
      setIsOpenLogin(false);
      setAuth(null);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
        navigate("/home");
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showModal, navigate]);

  const handleSuppressProfile = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${parsedUser.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (response.ok) {
        localStorage.clear();
        setSpreadProfileImage(null);
        setIsOpenLogin(false);
        setAuth(null);

        setShowModal(true);
      } else {
        console.error("Erreur lors de la suppression du compte");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de votre profil", error);
    }
  };

  return (
    <>
      <div>
        <button
          type="button"
          className="last-button disconnect"
          onClick={handleLogout}
        >
          Se déconnecter
        </button>
        <button
          type="button"
          className="last-button suppress"
          onClick={handleSuppressProfile}
        >
          Supprimer définitivement son compte
        </button>
      </div>
      {showModal && (
        <div className="confirmation-modal">
          <p>Votre compte a été supprimé avec succès.</p>
        </div>
      )}
    </>
  );
}
