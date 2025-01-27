import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import categoryActions from "./modules/category/categoryActions";
import favoriteActions from "./modules/favorite/favoriteActions";
import itemActions from "./modules/item/itemActions";
import playlistsActions from "./modules/playlists/playlistsActions";
import videoActions from "./modules/video/videoActions";
import videoAndPlaylistActions from "./modules/videoPlaylist/videoAndPlaylistActions";
import videoCategoryActions from "./modules/videocategory/videoCategoryActions";

router.get("/api/favorites/:userId", favoriteActions.read);
router.post("/api/favorites/:userId", favoriteActions.add);
router.delete("/api/favorites/:userId", favoriteActions.remove);

router.get("/api/videoplaylist/:playlistId", videoAndPlaylistActions.read);
router.post(
  "/api/videoplaylist/:playlistId/:videoId",
  videoAndPlaylistActions.add,
);
router.delete("/api/videoplaylist/:id", videoAndPlaylistActions.remove);

router.get("/api/playlists/:userId", playlistsActions.read);
router.post("/api/playlists/:userId", playlistsActions.add);
router.delete("/api/playlists/:id", playlistsActions.remove);

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

router.get("/api/videos", videoActions.browse);
router.get("/api/videos/:id", videoActions.read);
router.post("/api/videos", videoActions.add);
router.put("/api/videos/:id", videoActions.edit);
router.delete("/api/videos/:id", videoActions.destroy);

import userActions from "./modules/user/userActions";
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.put("/api/users/:id", userActions.edit);
router.post("/api/users/", userActions.add);
router.delete("/api/users/:id", userActions.destroy);
/* ************************************************************************* */

export default router;
