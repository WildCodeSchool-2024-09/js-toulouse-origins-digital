import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { useNav } from "./contexts/NavProvider";

type User = {
  id: number;
  pseudo: string;
  email: string;
};

type Auth = {
  user: User;
  token: string;
};

function App() {
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

  const { isOpenLogin, setIsOpenLogin } = useNav();

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

  const getCookie = useCallback((name: string) => {
    const cookieArr = document.cookie.split("; ");
    for (let i = 0; i < cookieArr.length; i++) {
      const cookie = cookieArr[i].split("=");
      if (cookie[0] === name) {
        return cookie[1];
      }
    }
    return null;
  }, []);

  useEffect(() => {
    const token = getCookie("token");
    const savedUser = localStorage.getItem("user");

    if (token && savedUser) {
      const user = JSON.parse(savedUser);
      setAuth({ user, token });
    } else {
      setAuth(null);
    }
  }, [getCookie]);

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
