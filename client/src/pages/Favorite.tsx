import "../styles/Favorite.css";
import { useState } from "react";
import CarouselFavoriteVideo from "../components/CarousselFavoriteVideo";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

const gameCategories = [
  { id: 1, name: "RPG" },
  { id: 2, name: "MMORPG" },
  { id: 3, name: "FPS" },
  { id: 4, name: "Battle Royal" },
  { id: 5, name: "Sport" },
  { id: 6, name: "Stratégie" },
  { id: 7, name: "Sandbox" },
  { id: 8, name: "Aventure" },
  { id: 9, name: "Combat" },
  { id: 10, name: "Indie" },
  { id: 11, name: "Moba" },
  { id: 12, name: "Simulation" },
];

export default function Favorite() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  return (
    <>
      <Header />
      <div className="favorite-container">
        <div className="favorite-section">
          <h2 className="title-fovarite-page">Favoris &#x27E9;</h2>
          <div className="filter-sort-out">
            <div className="filter-container">
              <button
                type="button"
                className="filter-button"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                Filtrer
              </button>
              {isFilterOpen && (
                <div className="filter-dropdown">
                  <div className="categories-list">
                    {gameCategories.map((category) => (
                      <label key={category.id} className="category-item">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleCategoryToggle(category.id)}
                        />
                        <span className="category-name">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <h3>Trier</h3>
          </div>
        </div>
        <hr className="line" />
        <div className="favorite-video">
          <CarouselFavoriteVideo selectedCategories={selectedCategories} />
        </div>
        <NavBar />
      </div>
    </>
  );
}
