import "./App.css";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNav } from "./contexts/NavProvider";

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
  const [auth, setAuth] = useState({
    user: { id: 12, email: "prout@prout.prout", is_admin: false },
    token: "hcfkjn",
  } as Auth | null);
  const { isOpenLogin, setIsOpenLogin } = useNav();
  return (
    <>
      <main
        onClick={isOpenLogin ? () => setIsOpenLogin(!isOpenLogin) : undefined}
        onKeyDown={isOpenLogin ? () => setIsOpenLogin(!isOpenLogin) : undefined}
      >
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
