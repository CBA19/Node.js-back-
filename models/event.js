const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const eventSchema = mongoose.Schema({
    lieu: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    date_event: { type: Date, required: true },
    titre:{ type: String, required: true },
    participe:{ type: Number },
    interesse:{ type: Number },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }

});

eventSchema.plugin(uniqueValidator);

module.exports = mongoose.model("event", eventSchema);