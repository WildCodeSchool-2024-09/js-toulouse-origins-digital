import { useState } from "react";
import CarouselPrimary from "../components/CarouselPrimary";
import CarouselVideo from "../components/CarouselVideo";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import "../styles/HomePage.css";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    0,
  );

  const handleCategorySelect = (name: string, id: number) => {
    setSelectedCategory(name);
    setSelectedCategoryId(id);
  };

  return (
    <>
      <Header />
      <div className="container container-home-page ">
        <CarouselPrimary onCategorySelect={handleCategorySelect} />
        {selectedCategory && (
          <>
            <h2 id="category-videos" className="title-home-page">
              {selectedCategory} &#x27E9;
            </h2>
            <hr className="line" />
            <CarouselVideo categoryId={selectedCategoryId} />
          </>
        )}
        <h2 className="title-home-page">Toutes les vidéos &#x27E9;</h2>
        <hr className="line" />
        <CarouselVideo />
      </div>
      <NavBar />
      <div className="fill-the-gap" />
    </>
  );
}
