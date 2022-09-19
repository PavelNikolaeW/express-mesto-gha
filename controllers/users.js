const User = require("../models/user");
const handleErrors = require("../errors/handleErrors");
const NotFoundError = require("../errors/NotFoundError");

module.exports.getUsers = (req, res) => {
  User.find(req.params.id ? { _id: req.params.id } : {})
    .then((users) => {
      res.send({ data: users });
    })
    .catch((err) => handleErrors(err, res));
};

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => res.send(user))
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avater } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avater },
    { new: true, runValidators: true }
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};
