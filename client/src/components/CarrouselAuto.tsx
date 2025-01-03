import "../styles/CarrouselAuto.css";
import { useEffect, useRef } from "react";
import img1 from "../assets/images/img-carrousel-1.jpg";
import img2 from "../assets/images/img-carrousel-2.png";
import img3 from "../assets/images/img-carrousel-3.png";
import img4 from "../assets/images/img-carrousel-4.png";
import img5 from "../assets/images/img-carrousel-5.jpg";

export default function CarrouselAuto() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const images = track.children;
    const totalImages = images.length;
    const imageWidth = images[0].getBoundingClientRect().width;

    let index = 0;

    const moveCarousel = () => {
      index++;
      track.style.transition = "transform 0.5s";
      track.style.transform = `translateX(${-index * imageWidth}px)`;

      if (index >= totalImages / 2) {
        setTimeout(() => {
          track.style.transition = "none";
          index = 0;
          track.style.transform = "translateX(0px)";
        }, 500);
      }
    };

    const interval = setInterval(moveCarousel, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel">
      <div className="carousel-track" ref={trackRef}>
        <img src={img1} alt="Slide 1" />
        <img src={img2} alt="Slide 2" />
        <img src={img3} alt="Slide 3" />
        <img src={img4} alt="Slide 4" />
        <img src={img5} alt="Slide 5" />
        <img src={img1} alt="Slide 1 Clone" />
        <img src={img2} alt="Slide 2 Clone" />
        <img src={img3} alt="Slide 3 Clone" />
        <img src={img4} alt="Slide 4 Clone" />
        <img src={img5} alt="Slide 5 Clone" />
      </div>
    </div>
  );
}
