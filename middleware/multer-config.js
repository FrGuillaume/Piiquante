const multer = require("multer");

// On initialise les extensions possibles pour les images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// On configure le stockage des images
const storage = multer.diskStorage({
  // On indique à multer que le dossier de destination est le dossier /images
  destination: (req, file, callback) => {
    callback(null, "images");
  },

  filename: (req, file, callback) => {
    // On indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now comme nom de fichier
    let name = file.originalname.split(" ").join("_");

    // On indique ensuite la constante dictionnaire de type MIME pour l'extension de fichier appropriée
    let extension = MIME_TYPES[file.mimetype];
    name = name.replace("." + extension, "_");
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).single("image");
