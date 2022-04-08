const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// On instaure le modèle d'un utilisateur grâce à mongoose
const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Veuillez entrer votre adresse email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Veuillez entrer une adresse email correcte",
    ],
  },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
