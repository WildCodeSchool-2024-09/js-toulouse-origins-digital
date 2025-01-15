import CarouselPrimary from "../components/CarouselPrimary";
import CarouselVideo from "../components/CarouselVideo";
import ForgotPassword from "../components/ForgotPassword";
import NavBar from "../components/NavBar";
import ResetPassword from "../components/ResetPassword";
import UserLogin from "../components/UserLogin";
import UserSignUp from "../components/UserSignUp";
import "../styles/HomePage.css";

export default function HomePage() {
  return (
    <>
      <UserLogin />
      <UserSignUp />
      <ForgotPassword />
      <ResetPassword />
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
