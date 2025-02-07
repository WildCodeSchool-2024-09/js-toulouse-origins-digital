import * as argon2 from "argon2";
import type { RequestHandler } from "express";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../user/userRepository";

const login: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await userRepository.readByEmailWithPassword(req.body.email);
    if (!user) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }
    if (user == null) {
      res
        .status(422)
        .json({ message: "Utilisateur ou mot de passe incorrect." });
      return;
    }

    if (!user.hashed_password) {
      res
        .status(422)
        .json({ message: "Utilisateur ou mot de passe incorrect." });
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    if (verified) {
      const { hashed_password, ...userWithoutHashedPassword } = user;
      const myPayload: MyPayload = {
        sub: user.id.toString(),
      };

      const token = jwt.sign(myPayload, process.env.APP_SECRET as string, {
        expiresIn: "1h",
      });

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      });

      res.status(200).json({
        user: userWithoutHashedPassword,
      });
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      res.status(401).json({ message: "Accès non autorisé, token manquant" });
      return;
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

const logout: RequestHandler = (req, res) => {
  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Deconnexion réussie" });
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashed_password = hashedPassword;
    req.body.password = undefined;
    next();
  } catch (err) {
    next(err);
  }
};

const verifyAuth: RequestHandler = async (req, res) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      res.status(401).json({ message: "Non authentifié" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.APP_SECRET as string,
    ) as MyPayload;
    const user = await userRepository.read(Number(decoded.sub));

    if (!user) {
      res.status(401).json({ message: "Utilisateur non trouvé" });
      return;
    }

    res.json({
      id: user.id,
      pseudo: user.pseudo,
      email: user.email,
      avatar_url: user.avatar_url,
    });
  } catch (err) {
    res.status(401).json({ message: "Token invalide" });
  }
};

export default { login, hashPassword, verifyToken, logout, verifyAuth };
