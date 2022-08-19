const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createwallpaper,
  getwallpaperbywallpapertype,
  getwallpaperbycategory,
  getcategorybywallpaper,
  getwallpapertype,
  getwallpapers,
  getcategories,

} = require("./wallpaper.controller");

router.get("/", checkToken, getwallpapers);
router.post("/", checkToken, createwallpaper);

router.get("/type/:id", checkToken, getwallpaperbywallpapertype);
router.get("/category/:id", checkToken, getwallpaperbycategory);
router.get("/wallpaperid/:id", checkToken, getcategorybywallpaper);
router.get("/wallpapertype", checkToken, getwallpapertype);
router.get("/categories", checkToken, getcategories);

module.exports = router;
