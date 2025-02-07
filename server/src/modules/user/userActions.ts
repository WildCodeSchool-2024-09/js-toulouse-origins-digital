import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);
    const user = await userRepository.read(userId);

    if (user != null) {
      res.status(200).json(user);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const dbUser = await userRepository.read(Number(req.params.id));

    const user = {
      id: Number(req.params.id),
      email: req.body.email,
      pseudo: req.body.pseudo,
      is_admin:
        req.body.is_admin !== undefined ? req.body.is_admin : dbUser?.is_admin,
      avatar_url: req.body.avatar_url,
    };

    const affectedRows = await userRepository.update(user);
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
    const newUser = {
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      pseudo: req.body.pseudo,
      is_admin: req.body.is_admin,
      avatar_url: req.body.avatar_url,
    };
    const insertId = await userRepository.create(newUser);
    const response = await userRepository.read(insertId);
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    await userRepository.delete(userId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

const uploadAvatar: RequestHandler = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "Aucun fichier téléchargé" });
      return;
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    const userId = Number(req.params.id);

    const affectedRows = await userRepository.updateProfileImage(
      userId,
      avatarUrl,
    );

    if (affectedRows === 0) {
      res.status(404).json({ error: "Utilisateur non trouvé" });
      return;
    }

    res.status(200).json({ avatar_url: avatarUrl });
    return;
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image", error);
    res.status(500).json({
      error: "Une erreur est survenue lors du téléchargement de l'image",
    });
    return;
  }
};

export default { browse, read, edit, add, destroy, upload, uploadAvatar };
