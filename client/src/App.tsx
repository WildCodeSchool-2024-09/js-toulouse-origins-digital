import "./App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNav } from "./contexts/NavProvider";

type User = {
  id: number;
};

type Auth = {
  user: User;
  token: string;
};

function App() {
  // Charger l'authentification depuis localStorage
  const [auth, setAuth] = useState<Auth | null>(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });
  useEffect(() => {
    const expiry = localStorage.getItem("expiry");

    if (expiry && Date.now() > Number.parseInt(expiry)) {
      localStorage.clear();
    } else {
      localStorage.setItem("expiry", (Date.now() + 60 * 60 * 1000).toString());
    }
  }, []);

  // Gestion de l'état du menu ou modal de connexion
  const { isOpenLogin, setIsOpenLogin } = useNav();

  // Sauvegarder l'auth dans localStorage chaque fois qu'il change
  useEffect(() => {
    if (auth) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: auth?.user.id,
        }),
      );
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  return (
    <>
      <main
        // Si le menu est ouvert, on le ferme au clic ou au clavier
        onClick={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
        onKeyDown={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
      >
        {/* Outlet pour injecter les routes enfants, avec le contexte auth */}
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
