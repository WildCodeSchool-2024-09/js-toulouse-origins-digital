import "./App.css";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { useNav } from "./contexts/NavProvider";

type User = {
  id: number;
  pseudo: string;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

function App() {
  const [auth, setAuth] = useState(null as Auth | null);
  const { isOpenLogin, setIsOpenLogin } = useNav();

  useEffect(() => {
    const expiry = localStorage.getItem("expiry");

    if (expiry && Date.now() > Number.parseInt(expiry)) {
      localStorage.clear();
    } else {
      localStorage.setItem("expiry", (Date.now() + 60 * 60 * 1000).toString());
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: auth?.user.id,
          pseudo: auth?.user.pseudo,
          email: auth?.user.email,
        }),
      );
    } else {
      localStorage.removeItem("auth");
    }
  }, [auth]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/me`,
          { credentials: "include" },
        );

        if (response.ok) {
          const user = await response.json();
          setAuth({ user, token: "auth_token" });
        } else {
          setAuth(null);
        }
      } catch (error) {
        console.error("Erreur de récupération de l'utilisateur :", error);
        setAuth(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <FavoritesProvider>
      <main
        onClick={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
        onKeyDown={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
      >
        <Outlet context={{ auth, setAuth }} />
      </main>
    </FavoritesProvider>
  );
}

export default App;
