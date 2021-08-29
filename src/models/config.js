//Configuração do banco de dados
module.exports = (async () => {
  const mongoose = require("mongoose");

  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
})();
