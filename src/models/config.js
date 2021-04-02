//Configuração do banco de dados
module.exports = (async () => {
  const mongoose = require("mongoose");

  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_CREDS}${process.env.DB_HOST}${process.env.DB_PORT}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
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
