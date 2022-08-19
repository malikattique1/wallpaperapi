const router8 = require("express").Router();
const { checkToken } = require("../../auth/token_validation");

const {
  createuser,
  login,
  getuserById,
  getuser,
  updateuser,
  deleteuser,
  editprofilepic
} = require("./users.controller");

router8.post("/",createuser);
// router8.post("/", checkToken, createuser);
// router8.get("/", getuser);
router8.get("/", checkToken, getuser);
// router8.patch("/:id", updateuser);
router8.patch("/", checkToken, updateuser);
// router8.delete("/", deleteuser);
router8.delete("/", checkToken, deleteuser);

// router8.get("/:id", getuserById);
router8.get("/:id", checkToken, getuserById);
router8.post("/login", login);
router8.post("/profile_pic", editprofilepic);

module.exports = router8;





