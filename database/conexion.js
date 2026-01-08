const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://prueba1:8944@clusterclase.nhb9gha.mongodb.net/MaquinaExpendedora?retryWrites=true&w=majority";

const conectarMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error MongoDB:", error);
  }
};

module.exports = conectarMongo;
