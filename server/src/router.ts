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

/* ************************************************************************* */

export default router;
