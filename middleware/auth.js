const jwt = require("jsonwebtoken");

// On vérifie que le token est valide
module.exports = (req, res, next) => {
  // On utilise try et catch pour éviter les problèmes qui peuvent se produire
  try {
    // On extrait le token du header Authorization de la requête
    const token = req.headers.authorization.split(" ")[1];

    // On décode avec jwt le token que le token est valide
    const decodedToken = jwt.verify(token, process.env.TOKEN);

    // On extrait l'Id utilsiateur du token
    const userId = decodedToken.userId;

    // On vérifie que le token est bien celui de l'id utilisateur
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: error | "Requête non authentifié !" });
  }
};
