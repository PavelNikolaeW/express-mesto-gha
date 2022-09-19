const router = require("express").Router();

const {
  getUsers,
  createUser,
  updateUser,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:id", getUsers);
router.post("/", createUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateUserAvatar);

module.exports = router;
