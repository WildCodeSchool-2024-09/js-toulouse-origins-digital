import "../styles/CarrouselAuto.css";
import { useEffect, useRef, useState } from "react";
import carouselAuto1 from "../assets/images/carrousel-auto-1.jpg";
import carouselAuto2 from "../assets/images/carrousel-auto-2.png";
import carouselAuto3 from "../assets/images/carrousel-auto-3.png";
import carouselAuto4 from "../assets/images/carrousel-auto-4.png";
import carouselAuto5 from "../assets/images/carrousel-auto-5.jpg";

const images = [
  { id: 1, src: carouselAuto1, alt: "Slide 1" },
  { id: 2, src: carouselAuto2, alt: "Slide 2" },
  { id: 3, src: carouselAuto3, alt: "Slide 3" },
  { id: 4, src: carouselAuto4, alt: "Slide 4" },
  { id: 5, src: carouselAuto5, alt: "Slide 5" },
];

export default function CarrouselAuto() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const updateWindowSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", updateWindowSize);
    return () => window.removeEventListener("resize", updateWindowSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const interval = setInterval(() => {
        setAngle((prevAngle) => prevAngle - 72);
      }, 3000);
      return () => clearInterval(interval);
    }

    const track = trackRef.current;
    if (!track) return;

    let index = 0;
    const totalImages = images.length;
    const imageWidth = track.children[0].getBoundingClientRect().width;

    const moveCarousel = () => {
      index = (index + 1) % totalImages;
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateX(${-index * imageWidth}px)`;
    };

    const interval = setInterval(moveCarousel, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  return (
    <div className="carousel-auto">
      {!isMobile ? (
        <div
          className="carousel-track"
          style={{ transform: `rotateY(${angle}deg)` }}
        >
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              className="carousel-image"
              style={{
                transform: `rotateY(${index * 72}deg) translateZ(350px)`,
              }}
            />
          ))}
        </div>
      ) : (
        <div className="carousel-track-mobile" ref={trackRef}>
          {images.map((image) => (
            <img key={image.id} src={image.src} alt={image.alt} />
          ))}
        </div>
      )}
    </div>
  );
}
