const jwt = require("jsonwebtoken");

// On vérifie que le token est valide
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "User Id non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ message: error | "Requête non authentifié !" });
  }
};
