import type { RequestHandler } from "express";
import videoRepository from "./videoRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const videos = await videoRepository.readAll();
    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};
const search: RequestHandler = async (req, res, next) => {
  try {
    const videos = await videoRepository.search(req.params.term as string);

    res.status(200).json(videos);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const videoId = Number.parseInt(req.params.id);
    const video = await videoRepository.read(videoId);

    if (video != null) {
      res.status(200).json({ video });
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const video = {
      id: Number(req.params.id),
      title: req.body.title,
      video_url: req.body.video_url,
      description: req.body.description,
      date: req.body.date,
      views: req.body.views,
    };
    const affectedRows = await videoRepository.update(video);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const incrementViews: RequestHandler = async (req, res, next) => {
  try {
    const videoId = Number(req.params.id);
    const affectedRows = await videoRepository.incrementViews(videoId);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newVideo = {
      title: req.body.title,
      video_url: req.body.video_url,
      description: req.body.description,
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
      views: 0,
    };

    const insertId = await videoRepository.create(newVideo);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const videoId = Number(req.params.id);
    const affectedRows = await videoRepository.delete(videoId);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};
export default { browse, read, edit, add, destroy, search, incrementViews };
