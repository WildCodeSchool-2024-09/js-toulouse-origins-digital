import MagnifyingGlassImg from "../assets/images/white-magnifying-glass.svg";
import "../styles/SearchBar.css";

export default function SearchBar() {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Rechercher un streamer, jeux vidéos..."
        className="search-input"
      />
      <img
        src={MagnifyingGlassImg}
        alt="Magnifying glass"
        className="magnifying-glass"
      />
    </div>
  );
}
