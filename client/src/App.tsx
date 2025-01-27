import "./App.css";
import { Outlet } from "react-router-dom";
import { useNav } from "./contexts/NavProvider";

function App() {
  const { isOpenLogin, setIsOpenLogin } = useNav();

  return (
    <>
      <main
        onClick={isOpenLogin ? () => setIsOpenLogin(!isOpenLogin) : undefined}
        onKeyDown={isOpenLogin ? () => setIsOpenLogin(!isOpenLogin) : undefined}
      >
        <Outlet />
      </main>
    </>
  );
}

export default App;
