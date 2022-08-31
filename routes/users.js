const router = require("express").Router();

const {
  getUser,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", getUser);
router.get("/:id", getUser);
router.post("/", createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
