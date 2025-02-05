import "../styles/Favorite.css";
import { useOutletContext } from "react-router-dom";
import CarouselFavoriteVideo from "../components/CarousselFavoriteVideo";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import AccessDenied from "./AccessDenied";

interface Favorite {
  id: number;
  title: string;
  url: string;
}

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

export default function Favorite() {
  const { auth } = useOutletContext() as { auth: Auth | null };

  return (
    <>
      {auth ? (
        <>
          <Header />
          <div className="favorite-container">
            <div className="favorite-section">
              <h2 className="title-fovarite-page">Favoris &#x27E9;</h2>
              <div className="filter-sort-out">
                <h3>Filtrer</h3>
                <h3>Trier</h3>
              </div>
            </div>
            <hr className="line" />
            <div className="favorite-video">
              <CarouselFavoriteVideo />
            </div>
            <NavBar />
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
