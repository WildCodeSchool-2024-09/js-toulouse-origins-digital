import "../styles/Favorite.css";
import CarouselFavoriteVideo from "../components/CarousselFavoriteVideo";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

interface Favorite {
  id: number;
  title: string;
  url: string;
}

export default function Favorite() {
  return (
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
  );
}
