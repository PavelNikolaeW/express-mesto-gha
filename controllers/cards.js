const { handleErrors } = require("../errors/handleErrors");

const Card = require("../models/card");

module.exports.getCard = (req, res, next) => {
  Card.find({})
    .populate(["owner", "likes"])
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

module.exports.createCard = (req, res, next) => {
  console.dir(req.method);
  Card.create({ ...req.body, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => handleErrors(err, res));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .populate(["owner"])
    .then((card) => {
      if (req.user._id === card.owner._id)
        return Card.findByIdAndDelete(card._id);
      res.send({ message: "Карточка не удалена" });
    })
    .then(() => res.send({ message: "Карточка удалена" }))
    .catch((err) => handleErrors(err, res));
};

module.exports.likesCard = (req, res, next) => {
  const action = req.method === "PUT" ? "$addToSet" : "$pull";
  Card.findOneAndUpdate(
    req.params.id,
    { [action]: { likes: req.user._id } },
    { new: true }
  )
    .populate(["owner", "likes"])
    .then((card) => {
      if (!card) {
        res.send({ message: "Карточка не найдена" });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => handleErrors(err, res));
};
