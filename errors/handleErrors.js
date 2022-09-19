function handleErrors(err, res) {
  if (err.name === "NotFoundError") {
    res.status(404).send({ message: err.message });
  } else if (err.name === "ValidationError") {
    res.status(500).send({ message: "Ошибка сервера" });
  } else if (err.name === "CastError") {
    res.status(400).send({ message: "Переданы нверные данные" });
  }
}

module.exports = handleErrors;
