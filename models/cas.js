const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const casSchema = mongoose.Schema({
    localisation: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    created_at: { type: Date, required: true }

});

casSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Cas", casSchema);