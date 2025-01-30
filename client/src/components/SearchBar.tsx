import MagnifyingGlassImg from "../assets/images/white-magnifying-glass.svg";
import "../styles/SearchBar.css";
import { useState } from "react";
import VideoCard from "./VideoCard";

interface Video {
  id: number;
  title: string;
  description: string;
  video_url: string;
  date: Date;
  duration: string;
  views: number;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<
    {
      id: number;
      title: string;
      description: string;
      duration: string;
      views: number;
      date: Date;
      video_url: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResults([]);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/search/${encodeURIComponent(query)}`,
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
      }
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError((err as Error).message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleSearch} className="form-search">
          <input
            type="text"
            placeholder="Rechercher un streamer, jeux vidéos..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit" disabled={loading} className="button-submit">
            <img
              src={MagnifyingGlassImg}
              alt="Magnifying glass"
              className="magnifying-glass"
            />
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="results-search">
        {results.map(
          (video: {
            id: number;
            title: string;
            description: string;
            duration: string;
            views: number;
            date: Date;
            video_url: string;
          }) => (
            <div key={video.id} className="result-item">
              <button
                type="button"
                onClick={() => setSelectedVideo(video)}
                style={{ all: "unset" }}
              >
                <img
                  src={`${video.video_url}thumbnail.jpg`}
                  alt={video.title}
                  className="picture-video-search"
                />
              </button>
              <h3 className="title-video-search">{video.title}</h3>
            </div>
          ),
        )}
      </div>

      <VideoCard video={selectedVideo ?? null} />
    </>
  );
}
