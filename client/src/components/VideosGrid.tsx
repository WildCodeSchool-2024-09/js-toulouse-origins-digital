import { useState } from "react";
import deleteIcon from "../assets/images/supprimer.png";
import type { Playlist, Video, VideoPlaylist } from "../types/types";
import VideoCard from "./VideoCard";
interface Props {
  videos: Video[];
  videoPlaylists: VideoPlaylist[];
  selectedPlaylist: Playlist;
  onBack: () => void;
  onDeleteVideo: (videoId: number) => void;
}

const VideosGrid: React.FC<Props> = ({
  videos,
  videoPlaylists,
  onBack,
  onDeleteVideo,
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  return (
    <>
      <VideoCard video={selectedVideo ?? null} />
      <div className="videos-grid">
        <button className="back-playlist-button" type="button" onClick={onBack}>
          Retour aux playlists
        </button>
        {videos.map((video) => (
          <div key={video.id} className="video-card-playlist">
            <h3 className="video-title-playlist">{video.title}</h3>
            <img
              src={`${video.video_url}thumbnail.jpg`}
              alt={video.title}
              className="picture-video-playlist"
              onClick={() => setSelectedVideo(video)}
              onKeyDown={() => setSelectedVideo(video)}
            />
            <button
              className="button-delete-video-playlist"
              type="button"
              onClick={() => {
                const playlist = videoPlaylists.find(
                  (vp) => vp.id_video === video.id,
                );
                if (playlist) {
                  onDeleteVideo(playlist.id);
                }
              }}
            >
              <img src={deleteIcon} alt="" className="delete-icon" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosGrid;
