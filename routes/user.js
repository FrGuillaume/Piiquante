const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const rateLimit = require("express-rate-limit");
const passwordValidator = require("../middleware/passwordValidator");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Trop de comptes ont été créer sur la même adresse ",
});

// Route pour enregistrer un nouvel utilisateur
router.post(
  "/signup",
  passwordValidator,
  createAccountLimiter,
  userCtrl.signup
);

// Route pour se connecter
router.post("/login", apiLimiter, userCtrl.login);

module.exports = router;
