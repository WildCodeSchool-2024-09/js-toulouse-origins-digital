import "../styles/CarrouselAuto.css";
import { useEffect, useRef } from "react";
import carouselAuto1 from "../assets/images/carrousel-auto-1.jpg";
import carouselAuto2 from "../assets/images/carrousel-auto-2.png";
import carouselAuto3 from "../assets/images/carrousel-auto-3.png";
import carouselAuto4 from "../assets/images/carrousel-auto-4.png";
import carouselAuto5 from "../assets/images/carrousel-auto-5.jpg";

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

  const images = [
    { id: 1, src: carouselAuto1, alt: "Slide 1" },
    { id: 2, src: carouselAuto2, alt: "Slide 2" },
    { id: 3, src: carouselAuto3, alt: "Slide 3" },
    { id: 4, src: carouselAuto4, alt: "Slide 4" },
    { id: 5, src: carouselAuto5, alt: "Slide 5" },
  ];

  return (
    <div className="carousel-auto">
      <div className="carousel-track" ref={trackRef}>
        {images.concat(images).map((image, index) => (
          <img key={`${image.id}-${index}`} src={image.src} alt={image.alt} />
        ))}
      </div>
    </div>
  );
}
