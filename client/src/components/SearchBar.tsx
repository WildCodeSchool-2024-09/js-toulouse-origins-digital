import MagnifyingGlassImg from "../assets/images/white-magnifying-glass.svg";
import "../styles/SearchBar.css";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [results, setResults] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleCloseVideo = () => setSelectedVideo(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setLoading(true);
    setError("");

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

  const debouncedSearch = useCallback(
    debounce(async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/videos/search/${encodeURIComponent(searchQuery)}`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la recherche");
        }
        const data = await response.json();
        setResults(data);
      } catch (err) {
        setError((err as Error).message || "Erreur inconnue");
      }
    }, 300),
    [],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showSuggestions) {
      debouncedSearch(query);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [query, debouncedSearch, showSuggestions]);

  return (
    <div className="search-container">
      {showSuggestions && (
        <div
          className="overlay"
          onClick={() => setShowSuggestions(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") setShowSuggestions(false);
          }}
          role="button"
          tabIndex={0}
        />
      )}

      <div className="search-bar" ref={searchBarRef}>
        <form onSubmit={handleSearch} className="form-search">
          <input
            type="text"
            placeholder="Rechercher une vidéo..."
            className="search-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
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

        {showSuggestions && query && results.length > 0 && (
          <div className="suggestions-container filter-dropdown">
            {results.slice(0, 5).map((video) => (
              <div
                key={video.id}
                className="suggestion-item"
                onClick={() => {
                  setSelectedVideo(video);
                  setShowSuggestions(false);
                  setQuery("");
                }}
                onKeyDown={() => null}
              >
                <img
                  src={`${video.video_url}thumbnail.jpg`}
                  alt={video.title}
                  className="suggestion-thumbnail"
                />
                <div className="suggestion-details">
                  <h4 className="suggestion-title">{video.title}</h4>
                  <p className="suggestion-description">
                    {video.description.slice(0, 60)}...
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="results-search">
        {results.map((video) => (
          <div key={video.id} className="result-item">
            <img
              src={`${video.video_url}thumbnail.jpg`}
              alt={video.title}
              className="picture-video-search"
              onClick={() => setSelectedVideo(video)}
              onKeyDown={() => null}
            />
            <h3 className="title-video-search">{video.title}</h3>
            <p className="description-video-search">
              {video.description.slice(0, 60)}...
            </p>
          </div>
        ))}
      </div>

      <VideoCard video={selectedVideo} onClose={handleCloseVideo} />
    </div>
  );
}
