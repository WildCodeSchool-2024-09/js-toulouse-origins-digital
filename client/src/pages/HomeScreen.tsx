import "../styles/HomeScreen.css";
import bgImage from "../assets/images/bg-img-home-screen.jpeg";
import CarrouselAuto from "../components/CarrouselAuto";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <>
      <Header />
      <div>
        <section className="carrousel-section">
          <p className="text-home-screen intro">
            Plongez dans l'univers des jeux vidéos : découvrez nos guides vidéos
            pour maitriser vos jeux préférés et déjouer tous les défis !
          </p>
          <CarrouselAuto />
        </section>
        <img className="bg-img" src={bgImage} alt="Set up gamer" />
        <section className="subscription-section">
          <h1 className="title-home-screen">Améliorez votre expérience !</h1>
          <p className="text-home-screen">
            Inscrivez-vous pour profiter d'un accès complet à toutes nos vidéos,
            y compris les dernières nouveautés, ou continuez sans inscription
            pour un aperçu limité !
          </p>
          <div className="connection-nav">
            <Link to="/video">
              <button className="button-access" type="button">
                Je suis visiteur
              </button>
            </Link>
            <button className="button-access" type="button">
              Je crée un compte / Je me connecte
            </button>
          </div>
        </section>
      </div>
      <NavBar />
    </>
  );
}
