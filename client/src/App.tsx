import "./App.css";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
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
  const [auth, setAuth] = useState<Auth | null>(null);

  const { isOpenLogin, setIsOpenLogin } = useNav();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/verify-auth`,
          {
            credentials: "include",
          },
        );

        if (response.ok) {
          const userData = await response.json();
          setAuth({
            user: userData,
            token:
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth_token="))
                ?.split("=")[1] || "",
          });
        } else {
          setAuth(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setAuth(null);
        localStorage.removeItem("user");
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000 * 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (auth?.user) {
      localStorage.setItem("user", JSON.stringify(auth.user));
    } else {
      localStorage.removeItem("user");
    }
  }, [auth]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    }
  }, [location.pathname]);

  return (
    <main
      onClick={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
      onKeyDown={isOpenLogin ? () => setIsOpenLogin(false) : undefined}
    >
      <Outlet context={{ auth, setAuth }} />
    </main>
  );
}

export default App;
