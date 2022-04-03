const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// On instaure le modèle d'un utilisateur grâce à mongoose
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
