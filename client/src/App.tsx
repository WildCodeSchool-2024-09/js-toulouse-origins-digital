import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useNav } from "./contexts/NavProvider";
import "./App.css";

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

function App() {
  const { isOpenLogin, setIsOpenLogin } = useNav();
  const [auth, setAuth] = useState<Auth | null>(null);

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

  useEffect(() => {
    if (auth) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth]);

  return (
    <>
      <main
        onClick={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
        onKeyDown={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
      >
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
