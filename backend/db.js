const mongoose = require("mongoose");

// Mongoose bağlantı URL'sini ayarlayın
const connectionString = "mongodb://0.0.0.0:27017/nodeapp-1";

// Mongoose bağlantı seçeneklerini ayarlayın
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
// Mongoose bağlantısını oluşturun
mongoose
  .connect(connectionString, mongooseOptions)
  .then(() => {
    console.log("MongoDB bağlantısı başarılı");
  })
  .catch((error) => {
    console.error("MongoDB bağlantı hatası:", error);
  });
