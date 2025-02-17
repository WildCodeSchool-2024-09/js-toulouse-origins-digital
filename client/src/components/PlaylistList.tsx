import type { Playlist } from "../types/types";

interface Props {
  playlists: Playlist[];
  onPlaylistClick: (playlist: Playlist) => void;
  onAddPlaylist: (e: React.FormEvent) => void;
  onDeletePlaylist: (playlistId: number) => void;
  playlistName: string;
  setPlaylistName: (name: string) => void;
}

const PlaylistList: React.FC<Props> = ({
  playlists,
  onPlaylistClick,
  onAddPlaylist,
  onDeletePlaylist,
  playlistName,
  setPlaylistName,
}) => (
  <div className="container-playlists">
    {playlists.map((playlist) => (
      <div key={playlist.id} className="playlist-card">
        <h2
          className="playlist-name"
          onClick={() => onPlaylistClick(playlist)}
          onKeyDown={() => {}}
          onKeyUp={() => {}}
        >
          {playlist.name}
        </h2>
        <button
          type="button"
          className="delete-playlist"
          onClick={() => onDeletePlaylist(playlist.id)}
        >
          &#10060;
        </button>
      </div>
    ))}
    <form onSubmit={onAddPlaylist} className="form-add-playlist">
      <input
        type="text"
        value={playlistName}
        onChange={(e) => setPlaylistName(e.target.value)}
        placeholder="Ajouter une playlist"
        className="input-add-playlist"
      />
      <button type="submit" className="button-add-playlist">
        Ajouter{" "}
      </button>
    </form>
  </div>
);

export default PlaylistList;
