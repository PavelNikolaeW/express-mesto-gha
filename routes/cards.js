const router = require("express").Router();

const { getCards: getCard, createCard, likesCard } = require("../controllers/cards");

router.get("/", getCard);
router.post("/", createCard);
router.put("/:id/likes", likesCard);
router.delete("/:id/likes", likesCard);

module.exports = router;
