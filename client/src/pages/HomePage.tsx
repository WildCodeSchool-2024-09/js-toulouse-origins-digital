import CarouselPrimary from "../components/CarouselPrimary";
import CarouselVideo from "../components/CarouselVideo";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <>
      <Header />
      <CarouselPrimary />
      <h2 className="title-home-page">Catégories &#x27E9;</h2>
      <hr className="line" />
      <CarouselVideo />
      <h2 className="title-home-page">Toutes les vidéos &#x27E9;</h2>
      <hr className="line" />
      <CarouselVideo />
      <NavBar />
    </>
  );
}
