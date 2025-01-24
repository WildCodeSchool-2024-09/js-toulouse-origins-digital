import type { RequestHandler } from "express";
import VideoAndPlaylistRepository from "./videoAndPlaylistRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const playlistId = Number.parseInt(req.params.playlistId, 10);

    if (Number.isNaN(playlistId) || playlistId === 0) {
      res.status(400).json("Invalid playlist ID");
      return;
    }
    const videoplaylist =
      await VideoAndPlaylistRepository.findVideosByPlaylistId(playlistId);

    if (videoplaylist.length === 0) {
      res.status(404).json("No videos found");
      return;
    }
    res.status(200).json({ videoplaylist });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const playlistId = Number.parseInt(req.params.playlistId, 10);
    if (Number.isNaN(playlistId)) {
      res.status(400).json("Invalid playlist ID");
    }
    const videoId = Number.parseInt(req.params.videoId, 10);
    if (Number.isNaN(videoId)) {
      res.status(400).json("Invalid video ID");
    }
    await VideoAndPlaylistRepository.createVideoPlaylist({
      id: 0,
      id_playlist: playlistId,
      id_video: videoId,
    });
    res.status(201).json("Video added to playlist");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const playlistId = Number.parseInt(req.params.id, 10);
    if (Number.isNaN(playlistId)) {
      res.status(400).json("Invalid playlist ID");
      return;
    }
    await VideoAndPlaylistRepository.deleteVideoPlaylist(playlistId);
    res.status(200).json("Video removed from playlist");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

export default { read, add, remove };
