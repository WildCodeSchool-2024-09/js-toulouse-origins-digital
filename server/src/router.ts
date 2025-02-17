import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authActions from "./modules/auth/authActions";
import categoryActions from "./modules/category/categoryActions";
import favoriteActions from "./modules/favorite/favoriteActions";
import itemActions from "./modules/item/itemActions";
import playlistsActions from "./modules/playlists/playlistsActions";
import uploadActions from "./modules/upload/uploadActions";
import userActions from "./modules/user/userActions";
import videoActions from "./modules/video/videoActions";
import videoAndPlaylistActions from "./modules/videoPlaylist/videoAndPlaylistActions";
import videoCategoryActions from "./modules/videocategory/videoCategoryActions";

router.post("/api/upload", uploadActions.uploadFile);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.add);
router.put("/api/categories/:id", categoryActions.edit);
router.delete("/api/categories/:id", categoryActions.destroy);

router.get(
  "/api/videocategory/videos/:categoryId",
  videoCategoryActions.readVideosByCategory,
);
router.get(
  "/api/videocategory/categories/:videoId",
  videoCategoryActions.readCategoriesByVideo,
);
router.post("/api/videocategory/:categoryId", videoCategoryActions.add);
router.delete("/api/videocategory/:categoryId", videoCategoryActions.remove);
router.put("/api/videocategory/:id", videoCategoryActions.update);

router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/users/", authActions.hashPassword, userActions.add);
router.post("/api/users/login", authActions.login);
router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
router.post("/api/videos", videoActions.add);
router.put("/api/videos/:id", videoActions.edit);
router.put("/api/videos/views/:id", videoActions.incrementViews);
router.delete("/api/videos/:id", videoActions.destroy);
router.get("/api/videos/search/:term", videoActions.search);
router.delete("/api/users/:id", userActions.destroy);
router.put("/api/users/:id", userActions.edit);
router.get("/api/verify-auth", authActions.verifyAuth);
router.post(
  "/api/videoplaylist/:playlistId/:videoId",
  videoAndPlaylistActions.add,
);
router.delete("/api/videoplaylist/:id", videoAndPlaylistActions.remove);

router.use(authActions.verifyToken);

router.get("/api/favorites/:userId", favoriteActions.read);
router.post("/api/favorites/:userId/:itemId", favoriteActions.add);
router.delete("/api/favorites/:userId/:itemId", favoriteActions.remove);

router.post(
  "/api/users/:id/upload-avatar",
  userActions.upload.single("avatar_url"),
  userActions.uploadAvatar,
);

router.post("/api/users/logout", authActions.logout, userActions.edit);

router.get("/api/videoplaylist/:playlistId", videoAndPlaylistActions.read);

router.get("/api/playlists/:userId", playlistsActions.read);
router.post("/api/playlists/:userId", playlistsActions.add);
router.delete("/api/playlists/:id", playlistsActions.remove);

export default router;
