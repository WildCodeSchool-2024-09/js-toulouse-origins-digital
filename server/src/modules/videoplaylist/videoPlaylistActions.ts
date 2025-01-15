import type { RequestHandler } from "express";
import VideoPlaylistRepository from "./videoPlaylistRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const playlistId = Number.parseInt(req.params.playlistId, 10);
    if (Number.isNaN(playlistId)) {
      res.status(400).json("Invalid playlist ID");
    }
    const videos =
      await VideoPlaylistRepository.findVideosByPlaylistId(playlistId);
    if (videos.length === 0) {
      res.status(404).json("No videos found");
    }
    res.status(200).json({ videos });
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
    await VideoPlaylistRepository.createVideoPlaylist({
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
    const playlistId = Number.parseInt(req.params.playlistId, 10);
    if (Number.isNaN(playlistId)) {
      res.status(400).json("Invalid playlist ID");
    }
    const videoId = Number.parseInt(req.params.videoId, 10);
    if (Number.isNaN(videoId)) {
      res.status(400).json("Invalid video ID");
    }
    await VideoPlaylistRepository.deleteVideoPlaylist({
      id: 0,
      id_playlist: playlistId,
      id_video: videoId,
    });
    res.status(200).json("Video removed from playlist");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

export default { read, add, remove };
