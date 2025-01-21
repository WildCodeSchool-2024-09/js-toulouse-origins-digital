import CarouselPrimary from "../components/CarouselPrimary";
import CarouselVideo from "../components/CarouselVideo";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="container container-home-page">
        <CarouselPrimary />
        <h2 className="title-home-page">Catégorie sélectionnée &#x27E9;</h2>
        <hr className="line" />
        <CarouselVideo categoryId={3} />
        <h2 className="title-home-page">Toutes les vidéos &#x27E9;</h2>
        <hr className="line" />
        <CarouselVideo />
      </div>
      <NavBar />
    </>
  );
}
