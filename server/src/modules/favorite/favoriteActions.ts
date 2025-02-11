import type { RequestHandler } from "express";
import FavoriteRepository from "./favoriteRepository";

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    if (Number.isNaN(userId)) {
      res.status(400).json("Invalid user ID");
      return;
    }
    const favorites = await FavoriteRepository.findFavoritesByUserId(userId);
    if (favorites.length === 0) {
      res.status(200).json({ favorites: [] });
      return;
    }
    res.status(200).json({ favorites });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};
const add: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    const videoId = Number.parseInt(req.params.itemId, 10);
    if (Number.isNaN(userId) || Number.isNaN(videoId)) {
      res.status(400).json("Invalid ID");
      return;
    }
    await FavoriteRepository.createFavorite({
      id: 0,
      id_user: userId,
      id_video: videoId,
    });
    res.status(201).json("Favorite added");
  } catch (err) {
    res.status(500).json("Internal server error");
  }
};
const remove: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.userId, 10);
    const videoId = Number.parseInt(req.params.itemId, 10);
    if (Number.isNaN(userId) || Number.isNaN(videoId)) {
      res.status(400).json("Invalid ID");
      return;
    }
    await FavoriteRepository.deleteFavorite({
      id: 0,
      id_user: userId,
      id_video: videoId,
    });
    res.status(200).json("Favorite removed");
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal server error");
  }
};

export default { read, add, remove };
