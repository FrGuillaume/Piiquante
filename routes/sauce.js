const express = require("express");
const router = express.Router();

const multer = require("../middleware/multer-config");
const auth = require("../middleware/auth");
const sauceCtrl = require("../controllers/sauce.js");
const likesCTRL = require("../controllers/like.js");

// On instaure toutes les routes possible pour l'API

// Route pour récupérer toutes les sauces
router.get("/", auth, sauceCtrl.getAllSauces);

// Route pour récupérer une sauce à partir de son id
router.get("/:id", auth, sauceCtrl.getOneSauce);

// Route pour créer une nouvelle sauce
router.post("/", auth, multer, sauceCtrl.createSauce);

// Route pour modifier une sauce à partir de son id
router.put("/:id", auth, multer, sauceCtrl.updateSauce);

// Route pour supprimer une sauce à partir de son id
router.delete("/:id", auth, sauceCtrl.deleteSauce);

// Route pour liker et disliker une sauce
router.post("/:id/like", auth, likesCTRL.addLikeOrDislike);

module.exports = router;
