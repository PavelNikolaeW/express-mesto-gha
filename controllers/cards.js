const handleErrors = require("../errors/handleErrors");
const NotFoundError = require("../errors/NotFoundError")
const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

module.exports.createCard = (req, res) => {
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findById(req.params.id)
    .populate(["owner"])
    .then((card) => {
      if (req.user._id === card.owner._id) return Card.findByIdAndDelete(card._id);
      throw new NotFoundError("Карточка не найдена");
    })
    .then(() => res.send({ message: "Карточка удалена" }))
    .catch((err) => handleErrors(err, res));
};

module.exports.likesCard = (req, res) => {
  const action = req.method === "PUT" ? "$addToSet" : "$pull";
  Card.findByIdAndUpdate(
    req.params.id,
    { [action]: { likes: req.user._id } },
    { new: true },
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError("Карточка не найдена");
      }
    })
    .catch((err) => handleErrors(err, res));
};
