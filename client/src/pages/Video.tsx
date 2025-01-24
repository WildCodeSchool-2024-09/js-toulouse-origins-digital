import "../styles/Video.css";
import "../App.css";
import CarouselVideoPage from "../components/CarouselVideoPage";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

export default function Video() {
  const img = "/src/assets/images/video1.png";

  return (
    <>
      <Header />
      <div className="container watched-video">
        <img className="video" src={img} alt="video" />
        <h1 className="video-name">Video1</h1>
        <h2 className="video-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </h2>
      </div>
      <div className="recommended-video-section">
        <h1 className="recommanded-video-title">Vidéos Recommandées</h1>
        <hr className="video-hr" />
        <CarouselVideoPage />
      </div>
      <NavBar />
    </>
  );
}
