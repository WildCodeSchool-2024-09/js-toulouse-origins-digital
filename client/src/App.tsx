import "./App.css";
import { Outlet } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { useNav } from "./contexts/NavProvider";

function App() {
  const { isOpenLogin, setIsOpenLogin } = useNav();
  return (
    <FavoritesProvider>
      <main
        onClick={isOpenLogin ? () => setIsOpenLogin(!isOpenLogin) : undefined}
        onKeyDown={isOpenLogin ? () => setIsOpenLogin(!isOpenLogin) : undefined}
      >
        <Outlet />
      </main>
    </FavoritesProvider>
  );
}

export default App;
