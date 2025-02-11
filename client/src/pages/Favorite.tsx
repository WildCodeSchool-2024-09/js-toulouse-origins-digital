import "../styles/Favorite.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import SettingFavoriteVideo from "../components/SettingFavoriteVideo";
import { fetchFavorites } from "../services/favoriteService";
import AccessDenied from "./AccessDenied";

const sortOptions = [
  { id: "recent", name: "Plus récent" },
  { id: "oldest", name: "Plus ancien" },
  { id: "views", name: "Populaire" },
  { id: "less-views", name: "Moins populaire" },
  { id: "az", name: "A-Z" },
  { id: "za", name: "Z-A" },
];

type User = {
  id: number;
  email: string;
  is_admin: boolean;
};

type Auth = {
  user: User;
  token: string;
};

type Favorite = {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: string;
  views: number;
};

export default function Favorite() {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    [],
  );
  const { auth } = useOutletContext() as { auth: Auth | null };
  const userId = auth?.user.id;
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState<string>("recent");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error", error));
  }, []);

  useEffect(() => {
    if (userId) {
      fetchFavorites(userId)
        .then((favorites) => setFavorites(favorites))
        .catch((error) => console.error("Error fetching favorites:", error));
    }
  }, [userId]);

  const handleCategoryToggle = (categoryId: number) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".filter-container")) {
      setIsFilterOpen(false);
    }
    if (!target.closest(".sort-container")) {
      setIsSortOpen(false);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setIsFilterOpen(false);
  };

  const handleSortClick = (sortId: string) => {
    setSortBy(sortId);
    setIsSortOpen(false);
  };

  return (
    <>
      {auth ? (
        <>
          <Header />
          <section
            className="favorite-container"
            onClick={handleClickOutside}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsFilterOpen(false);
            }}
          >
            <div className="favorite-section">
              <h2 className="title-favorite-page">Favoris &#x27E9;</h2>
              <div className="filter-sort-out">
                <div className="filter-container">
                  <button
                    type="button"
                    className="filter-button"
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                  >
                    {selectedCategories.length > 0
                      ? "Filtres actifs"
                      : "Filtrer"}
                  </button>
                  {selectedCategories.length > 0 && (
                    <button
                      type="button"
                      className="reset-filter-button"
                      onClick={resetFilters}
                    >
                      Réinitialiser
                    </button>
                  )}
                  {isFilterOpen && (
                    <div className="filter-dropdown">
                      <div className="categories-list">
                        {categories?.map(
                          (category: { id: number; name: string }) => (
                            <label key={category.id} className="category-item">
                              <input
                                type="checkbox"
                                checked={selectedCategories.includes(
                                  category.id,
                                )}
                                onChange={() =>
                                  handleCategoryToggle(category.id)
                                }
                              />
                              <span className="category-name">
                                {category.name}
                              </span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div className="sort-container">
                  <button
                    type="button"
                    className="sort-button"
                    onClick={() => setIsSortOpen(!isSortOpen)}
                  >
                    {sortOptions.find((opt) => opt.id === sortBy)?.name ||
                      "Trier"}
                  </button>
                  {isSortOpen && (
                    <div className="sort-dropdown">
                      <div className="sort-list">
                        {sortOptions.map((option) => (
                          <button
                            key={option.id}
                            type="button"
                            className={`sort-item ${
                              sortBy === option.id ? "active" : ""
                            }`}
                            onClick={() => handleSortClick(option.id)}
                          >
                            {option.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <hr className="line" />
            <div className="favorite-video">
              <SettingFavoriteVideo
                selectedCategories={selectedCategories}
                sortBy={sortBy}
                favorites={favorites}
              />
            </div>
            <NavBar />
          </section>
        </>
      ) : (
        <AccessDenied />
      )}
    </>
  );
}
