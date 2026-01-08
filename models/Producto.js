const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
  codigo: Number,
  nombre: String,
  precio: Number,
  stock: Number,
  imagen: String,
});

module.exports = mongoose.model("Producto", productoSchema);
