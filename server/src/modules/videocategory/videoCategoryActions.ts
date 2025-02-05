import type { RequestHandler } from "express";
import videoCategoryRepository from "./videoCategoryRepository";

const readVideosByCategory: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number.parseInt(req.params.categoryId);
    const videos =
      await videoCategoryRepository.readVideosByCategory(categoryId);
    if (videos.length === 0) {
      res.status(404).json("No videos found");
    }
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const readCategoriesByVideo: RequestHandler = async (req, res, next) => {
  try {
    const videoId = Number.parseInt(req.params.videoId);
    const categories =
      await videoCategoryRepository.readCategoriesByVideo(videoId);
    if (categories.length === 0) {
      res.status(404).json(["No videos found"]);
    }
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number.parseInt(req.params.categoryId);
    if (Number.isNaN(categoryId)) {
      res.status(400).json("Invalid category ID");
    }
    const videoId = Number.parseInt(req.params.videoId);
    if (Number.isNaN(categoryId)) {
      res.status(400).json("Invalid video ID");
    }
    await videoCategoryRepository.create({
      id: 0,
      id_category: categoryId,
      id_video: videoId,
    });
    res.status(201).json("Video added to category");
  } catch (error) {
    next(error);
  }
};

const remove: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number.parseInt(req.params.categoryId);
    if (Number.isNaN(categoryId)) {
      res.status(400).json("Invalid category ID");
    }
    const videoId = Number.parseInt(req.params.videoId);
    if (Number.isNaN(videoId)) {
      res.status(400).json("Invalid video ID");
    }
    await videoCategoryRepository.delete({
      id: 0,
      id_category: categoryId,
      id_video: videoId,
    });
    res.status(200).json("Video removed from category");
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal server error");
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const videoId = Number.parseInt(req.params.id);
    const { categoryIds } = req.body;

    await videoCategoryRepository.updateCategories(videoId, categoryIds);
    res.status(200).json({ message: "Categories updated successfully" });
  } catch (error) {
    next(error);
  }
};

export default {
  readVideosByCategory,
  readCategoriesByVideo,
  add,
  remove,
  update,
};
