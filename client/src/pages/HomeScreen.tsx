import { Link, useOutletContext } from "react-router-dom";
import bgImage from "../assets/images/bg-img-home-screen.jpeg";
import CarrouselAuto from "../components/CarrouselAuto";
import Header from "../components/Header";
import { useNav } from "../contexts/NavProvider";

type User = {
  id: number;
  pseudo: string;
  email: string;
  avatar_url: string;
};

type Auth = {
  user: User;
  token: string;
};
import "../styles/HomeScreen.css";
import UserLogin from "../components/UserLogin";

export default function HomeScreen() {
  const { isOpenLogin, setIsOpenLogin } = useNav();
  const { auth } = useOutletContext() as { auth: Auth };

  if (auth) {
    window.location.replace("/home");
    return null;
  }

  return (
    <>
      <Header />
      <div className="container">
        <section className="carrousel-section">
          <p className="text-home-screen intro">
            L'essentiel du gaming réuni : guides vidéos experts et actualités
            des sorties pour ne rien manquer de vos jeux préférés !
          </p>
          <div className="carrousel-container">
            <CarrouselAuto />
          </div>
        </section>
        <div className="background-and-subscription-section">
          <img className="bg-img" src={bgImage} alt="Set up gamer" />

          <section className="subscription-section">
            <h1 className="title-home-screen">Améliorez votre expérience !</h1>
            <p className="text-home-screen">
              Inscrivez-vous pour profiter d'un accès complet à toutes nos
              vidéos, y compris les dernières nouveautés, ou continuez sans
              inscription pour un aperçu limité !
            </p>
            <div className="connection-nav">
              <Link className="visitor-button text-button" to="/home">
                Je suis visiteur
              </Link>
              <button
                className="button-access"
                type="button"
                onClick={
                  !auth
                    ? () => setIsOpenLogin(!isOpenLogin)
                    : () => {
                        window.location.replace("/home");
                      }
                }
                onKeyDown={() => {
                  undefined;
                }}
              >
                <p className="text-button">
                  Je crée un compte <br />/ Je me connecte
                </p>
              </button>
            </div>
          </section>
        </div>
      </div>
      {isOpenLogin && <UserLogin />}
    </>
  );
}
