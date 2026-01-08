const mongoose = require("mongoose");

const dineroSchema = new mongoose.Schema({
  denominacion: Number,
  cantidad: Number,
});

module.exports = mongoose.model("Dinero", dineroSchema);
