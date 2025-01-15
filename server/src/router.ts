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

router.get("/api/favorites", favoriteActions.read);
router.get("/api/favorites", favoriteActions.add);
router.get("/api/favorites", favoriteActions.remove);

router.get("/api/videoplaylist", videoPlaylistActions.read);
router.get("/api/videoplaylist", videoPlaylistActions.add);
router.get("/api/videoplaylist", videoPlaylistActions.remove);

router.get("/api/playlists", playlistsActions.read);
router.get("/api/playlists", playlistsActions.add);
router.get("/api/playlists", playlistsActions.remove);

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

/* ************************************************************************* */

export default router;
