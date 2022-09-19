const router = require("express").Router();

router.all("*", (res, req) => {
  res.status(404).send({ message: "Страница не найдена" });
});

module.exports = router
