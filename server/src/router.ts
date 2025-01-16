import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import favoriteActions from "./modules/favorite/favoriteActions";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import playlistsActions from "./modules/playlists/playlistsActions";
import videoPlaylistActions from "./modules/videoplaylist/videoPlaylistActions";

router.get("/api/favorites/:userId", favoriteActions.read);
router.post("/api/favorites/:userId", favoriteActions.add);
router.delete("/api/favorites/:userId", favoriteActions.remove);

router.get("/api/videoplaylist/:playlistId", videoPlaylistActions.read);
router.post("/api/videoplaylist/:playlistId", videoPlaylistActions.add);
router.delete("/api/videoplaylist/:playlistId", videoPlaylistActions.remove);

router.get("/api/playlists/:userId", playlistsActions.read);
router.post("/api/playlists/:userId", playlistsActions.add);
router.delete("/api/playlists/:userId", playlistsActions.remove);

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Define category-related routes
import categoryActions from "./modules/category/categoryActions";

router.get("/api/categories", categoryActions.browse);
router.get("/api/categories/:id", categoryActions.read);
router.post("/api/categories", categoryActions.add);
router.put("/api/categories/:id", categoryActions.edit);
router.delete("/api/categories/:id", categoryActions.destroy);

import videoActions from "./modules/video/videoActions";
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
