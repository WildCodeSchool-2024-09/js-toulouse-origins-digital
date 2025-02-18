import { Link, useMatch, useOutletContext } from "react-router-dom";
import controller from "../assets/images/controller.svg";
import "../styles/Header.css";
import { useEffect, useState } from "react";

type User = {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string;
};

type Auth = {
  user: User;
  token: string;
};

export default function Header() {
  const [admin, setAdmin] = useState(false);
  const { auth } = useOutletContext() as { auth: Auth | null };

  const isAdminRoute = useMatch("/admin");

  useEffect(() => {
    const isAdmin = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/`,
          {
            method: "GET",
            headers: { "Content-type": "application/json" },
            credentials: "include",
          },
        );
        const data = await response.json();
        const userData = data.find((el: User) => el.id === auth?.user.id);

        if (userData.is_admin === 1) {
          setAdmin(true);
        }
        if (userData.is_admin === 0) {
          setAdmin(false);
        }
      } catch (error) {
        console.error();
      }
    };
    isAdmin();
  }, [auth]);

  return (
    <div className="header-container">
      <div className="logo-header">
        <Link to="/home" className="logo-header">
          <img src={controller} alt="Controller" className="logo-icon" />
          <h1>JESTONE</h1>
        </Link>
      </div>
      {admin ? (
        <div className="swipe-view">
          {!isAdminRoute ? (
            <Link to="/admin" className="view-text">
              Vue admin
            </Link>
          ) : (
            <Link to="/home" className="view-text">
              Vue utilisateur
            </Link>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
