import type { RequestHandler } from "express";
import categoryRepository from "./categoryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryRepository.readAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number.parseInt(req.params.id);
    const category = await categoryRepository.read(categoryId);

    if (category != null) {
      res.status(200).json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const category = {
      id: Number(req.params.id),
      name: req.body.name,
      url_image: req.body.url_image,
      description: req.body.description,
    };
    const affectedRows = await categoryRepository.update(category);
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
    const newCategory = {
      name: req.body.name,
      url_image: req.body.url_image,
      description: req.body.description,
    };

    const insertId = await categoryRepository.create(newCategory);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const categoryId = Number(req.params.id);
    await categoryRepository.delete(categoryId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
