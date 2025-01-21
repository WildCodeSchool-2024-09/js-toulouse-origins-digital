import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/CarouselPrimary.css";
import { useEffect, useState } from "react";

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
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    fetch("http://localhost:3310/api/categories")
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

  return (
    <>
      <Carousel
        showThumbs={false}
        transitionTime={500}
        infiniteLoop={true}
        className="category-carousel"
        onChange={handleChange}
        swipeable={true}
        emulateTouch={true}
        swipeScrollTolerance={5}
        preventMovementUntilSwipeScrollTolerance={true}
      >
        {categories.map((category) => (
          <div key={category.id}>
            <div className="description-item">
              <h2 className="title-item">{category.name.toUpperCase()}</h2>
              <p className="legend-item">{category.description}</p>
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
    </>
  );
};

export default CarouselPrimary;
