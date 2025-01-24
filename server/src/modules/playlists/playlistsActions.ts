import type { RequestHandler } from "express";
import PlaylistRepository from "./playlistsRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    if (Number.isNaN(userId)) {
      res.status(400).json("Invalid user ID");
      return;
    }
    const playlists = await PlaylistRepository.findPlaylistsByUserId(userId);
    if (playlists.length === 0) {
      res.status(404).json("No playlists found");
      return;
    }
    res.status(200).json({ playlists });
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    if (Number.isNaN(userId)) {
      res.status(400).json("Invalid user ID");
      return;
    }
    const playlistName = req.body.name;
    if (!playlistName) {
      res.status(400).json("Invalid playlist name");
      return;
    }
    await PlaylistRepository.createPlaylist({
      id: 0,
      id_user: userId,
      name: playlistName,
    });
    res.status(201).json("Playlist created");
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
    await PlaylistRepository.deletePlaylist({
      id: playlistId,
      id_user: 0,
      name: "",
    });
    res.status(200).json("Playlist deleted");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

export default { read, add, remove };
