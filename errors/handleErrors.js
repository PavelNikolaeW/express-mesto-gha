function handleErrors(err, res) {
  console.log('kek');
  if (err.name === "NotFoundError") {
    res.status(404).send({ message: "Страница не найдена" });
  } else if (err.name === "ValidationError") {
    res.status(500).send({ message: "Ошибка сервера" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Переданы нверные данные" });
  }
}

module.exports = handleErrors;
