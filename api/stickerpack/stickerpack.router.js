const router2 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");
const {
  createStickerpack,
  loginstickerpack,
  getStickerpackByCategory,
  getStickerpackByid,
  getStickerspack,
  updateStickerpack,
  deleteStickerpack
} = require("./stickerpack.controller");

// router2.post("/",createStickerpack);
router2.post("/", checkToken, createStickerpack);
// router2.get("/", getStickerspack);
router2.get("/", checkToken, getStickerspack);
// router2.patch("/:id", updateStickerpack);
// router2.patch("/:id", checkToken, updateStickerpack);
router2.patch("/", checkToken, updateStickerpack);

// router2.delete("/", deleteStickerpack);
router2.delete("/", checkToken, deleteStickerpack);

// router2.get("/:category", getStickerpackByCategory);
router2.get("/:category", checkToken, getStickerpackByCategory);
// router2.get("/details/:id", getStickerpackByid);
router2.get("/details/:id", checkToken, getStickerpackByid);
// router2.post("/login", loginstickerpack);

// module.exports = router;
module.exports = router2;

