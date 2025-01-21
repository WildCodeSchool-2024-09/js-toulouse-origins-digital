import { useEffect, useState } from "react";
import "../styles/CarouselVideo.css";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: Date;
  duration: string;
  views: number;
}

interface CarouselVideoProps {
  categoryId?: number;
}

interface Category {
  id: number;
  name: string;
}

function getYoutubeVideoId(url: string): string | null {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function getYoutubeThumbnail(url: string): string {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
}

export default function CarouselVideo({ categoryId }: CarouselVideoProps) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [categoryVideos, setCategoryVideos] = useState<Video[]>([]);
  const [videoCategories, setVideoCategories] = useState<
    Record<number, Category[]>
  >([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const endPoint = categoryId
      ? `http://localhost:3310/api/videocategory/videos/${categoryId}`
      : "http://localhost:3310/api/videos";
    fetch(endPoint)
      .then((response) => response.json())
      .then((data) => {
        setCategoryVideos(data);
        setVideos(data);
      })
      .catch((error) => console.error("Error", error));
  }, [categoryId]);

  useEffect(() => {
    if (videos.length > 0) {
      for (const video of videos) {
        fetch(`http://localhost:3310/api/videocategory/categories/${video.id}`)
          .then((response) => response.json())
          .then((data) =>
            setVideoCategories((prev) => ({
              ...prev,
              [video.id]: data,
            })),
          )
          .catch((error) => console.error("Error", error));
      }
    }
  }, [videos]);

  useEffect(() => {
    fetch("http://localhost:3310/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error", error));
  });

  const displayedVideos = categoryId ? categoryVideos : videos;

  return (
    <div className="carousel-video">
      {displayedVideos.map((video) => {
        const thumbnailUrl = getYoutubeThumbnail(video.video_url);
        const filteredCategories = categories.filter((cat) =>
          videoCategories[video.id]?.some((vc: Category) => vc.id === cat.id),
        );
        return (
          <div key={video.id} className="video-card">
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
  );
}
