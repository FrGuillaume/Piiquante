const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
const path = require("path");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const stuffSauces = require("./routes/sauce.js");
const userRoutes = require("./routes/user");

require("dotenv").config();

// Prévenir les attaque DOS
app.use(express.json({ limit: "10kb" }));

// Connection à MongoDB
mongoose
  .connect(process.env.DB_MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Helmet
app.use(helmet());

// Ajout des cors dans le Header
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Contrer les injections NoSQL
app.use(mongoSanitize());

// Contrer les menaces XSS
app.use(xss());

// Gestion de la ressourece image de façon statique
app.use("/images", express.static(path.join(__dirname, "images")));

// Route pour les sauces
app.use("/api/sauces", stuffSauces);

// Route pour les utilisateurs
app.use("/api/auth", userRoutes);

module.exports = app;
