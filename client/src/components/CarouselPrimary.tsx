import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/CarouselPrimary.css";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

interface Category {
  id: number;
  name: string;
  url_image: string;
  description: string;
}

interface CarouselPrimaryProps {
  onCategorySelect: (name: string, id: number) => void;
}

const CarouselPrimary = ({ onCategorySelect }: CarouselPrimaryProps) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error", error));
  }, []);

  const handleChange = (index: number) => {
    if (categories[index]) {
      const category = categories[index];
      onCategorySelect(category.name, category.id);
    }
  };

  const handleExplore = (category: Category) => {
    onCategorySelect(category.name, category.id);
  };

  if (categories.length === 0) {
    return null;
  }

  return (
    <div>
      <Carousel
        showThumbs={true}
        transitionTime={500}
        infiniteLoop={true}
        className="category-carousel"
        onChange={handleChange}
        showArrows={!isTabletOrMobile}
        selectedItem={0}
        emulateTouch={true}
        swipeable={true}
        showStatus={false}
        showIndicators={isTabletOrMobile}
        renderThumbs={() =>
          categories.map((category) => (
            <div key={category.id} className="thumb-container">
              <img
                key={category.id}
                src={category.url_image}
                alt={category.name}
                className="thumb-image"
                data-title={category.name}
              />
              <p className="thumb-title">{category.name}</p>
            </div>
          ))
        }
      >
        {categories.map((category) => (
          <div key={category.id} className="carousel-primary-items">
            <div className="description-item">
              <h2 className="title-item">{category.name}</h2>
              <p className="legend-item">{category.description}</p>
              {!isTabletOrMobile && (
                <a href="#category-videos">
                  <button
                    type="button"
                    className="explore-button"
                    onClick={() => handleExplore(category)}
                  >
                    Explorer les vidéos
                  </button>
                </a>
              )}
            </div>
            <div className="picture-border">
              <img
                src={category.url_image}
                alt={category.name}
                className="image-items"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselPrimary;
