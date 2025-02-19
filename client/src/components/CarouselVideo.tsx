import { useEffect, useRef, useState } from "react";
import "../styles/CarouselVideo.css";
import VideoCard from "./VideoCard";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: Date;
  views: number;
}

interface CarouselVideoProps {
  categoryId?: number | null;
}

interface Category {
  id: number;
  name: string;
}

function getVideasVideoId(url: string): string | null {
  const regExp =
    /^.*\/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}).*$/;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

function getVideasThumbnail(url: string): string {
  const videoId = getVideasVideoId(url);
  return videoId ? `https://app.videas.fr/media/${videoId}/thumbnail.jpg` : "";
}

export default function CarouselVideo({ categoryId }: CarouselVideoProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categoryVideos, setCategoryVideos] = useState<Video[]>([]);
  const [videoCategories, setVideoCategories] = useState<
    Record<number, Category[]>
  >([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const handleCloseVideo = () => setSelectedVideo(null);

  useEffect(() => {
    const endPoint = categoryId
      ? `http://localhost:3310/api/videocategory/videos/${categoryId}`
      : "http://localhost:3310/api/videos";
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategoryVideos(data);
          setVideos(data);
        } else {
          setCategoryVideos([]);
          setVideos([]);
        }
      })
      .catch((error) => console.error("Error", error));
  }, [categoryId]);

  useEffect(() => {
    if (videos.length > 0) {
      for (const video of videos) {
        fetch(`http://localhost:3310/api/videocategory/categories/${video.id}`)
          .then((response) => response.json())
          .then((data) => {
            setVideoCategories((prev) => ({
              ...prev,
              [video.id]: data,
            }));
          })
          .catch((error) => console.error("Error", error));
      }
    }
  }, [videos]);

  useEffect(() => {
    fetch("http://localhost:3310/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error", error));
  }, []);

  const handleScroll = (distance: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: distance, behavior: "smooth" });

      setTimeout(() => {
        const {
          scrollLeft,
          scrollWidth = 0,
          clientWidth,
        } = carouselRef.current ?? { scrollLeft: 0, clientWidth: 0 };
        setIsAtStart(scrollLeft === 0);
        setIsAtEnd(scrollLeft + (clientWidth ?? 0) >= scrollWidth);
      }, 300);
    }
  };

  const displayedVideos = categoryId ? categoryVideos : videos;

  if (displayedVideos.length === 0 && categoryId) {
    return (
      <div className="carousel-video">
        <p className="no-videos-message">
          Aucune vidéo disponible pour cette catégorie
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="carousel-container">
        <div
          className="container-scroll-button-left"
          onClick={() => handleScroll(-300)}
          onKeyDown={() => null}
        >
          <button
            type="button"
            className="scroll-button-left"
            disabled={isAtStart}
            onClick={() => handleScroll(-300)}
          >
            &#9664;
          </button>
        </div>

        <div className="carousel-video" ref={carouselRef}>
          {displayedVideos
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((video) => {
              const thumbnailUrl = getVideasThumbnail(video.video_url);
              const filteredCategories = categories.filter((cat) =>
                videoCategories[video.id]?.some(
                  (vc: Category) => vc.id === cat.id,
                ),
              );
              return (
                <div
                  key={video.id}
                  className="video-card"
                  onClick={() => setSelectedVideo(video)}
                  onKeyDown={() => setSelectedVideo(video)}
                >
                  <div>
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="image-video"
                    />
                  </div>
                  <h2 className="title-video">{video.title}</h2>
                  <div className="category-video-container">
                    {filteredCategories.map((category) => (
                      <p key={category.id} className="category-video">
                        {category.name}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div
          className="container-scroll-button-right"
          onClick={() => handleScroll(300)}
          onKeyDown={() => null}
        >
          <button
            type="button"
            className="scroll-button-right"
            disabled={isAtEnd}
            onClick={() => handleScroll(300)}
          >
            &#9654;
          </button>
        </div>
      </div>
      <VideoCard
        video={
          selectedVideo
            ? { ...selectedVideo, date: selectedVideo.date.toString() }
            : null
        }
        onClose={handleCloseVideo}
      />
    </>
  );
}
