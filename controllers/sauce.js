const Sauce = require("../models/Sauce");
const User = require("../models/User");
const fs = require("fs");

// Récupérer toutes mes sauces
exports.getAllSauces = (req, res, next) => {
  // On utilise la méthode find() pour obtenir la liste complète des sauces trouvées dans la base de donnée
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// Récupérer une sauce grâce à son id
exports.getOneSauce = (req, res, next) => {
  // On utilise la méthode findOne() pour récupérer une seule sauce grâce à son id unique
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

// Créer une nouvelle sauce
exports.createSauce = (req, res, next) => {
  // On stocke les données envoyées par le frontend sous forme de form-data dans une variable
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;

  // On créé une novelle instance du modèle Sauce
  const sauce = new Sauce({
    ...sauceObject,
    // On indique la route pour l'image
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersdisLiked: [" "],
  });
  sauce
    // On sauvegarde la sauce dans la base de donnée
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ message: error }));
};

// Modifier une sauce
exports.updateSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      res.status(404).json({
        error: new Error("Objet non trouvé !"),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(403).json({
        error: new Error("unauthorized request !"),
      });
    }
  });
  // On vérifie si la modification contient une image
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(res.status(200).json({ message: "Sauce modifiée" }))
    .catch((error) => res.status(400).json({ error }));
};

// Supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }).then((sauce) => {
    if (!sauce) {
      res.status(404).json({
        error: new Error("Objet non trouvé !"),
      });
    }
    if (sauce.userId !== req.auth.userId) {
      return res.status(403).json({
        error: new Error("unauthorized request !"),
      });
    }
  });

  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(res.status(200).json({ message: "Sauce supprimée" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};
