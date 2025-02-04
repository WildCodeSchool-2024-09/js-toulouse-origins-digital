import type { RequestHandler } from "express";
import multer from "multer";
import cloudinary from "../../../services/cloudinaryConfig";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

const uploadFile: RequestHandler = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "avatars",
      });

      res.json({ url: result.secure_url });
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      res.status(500).json({ error: "Failed to upload image" });
    }
  });
};

export default { uploadFile };
