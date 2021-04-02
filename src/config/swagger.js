module.exports = {
  v1: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Cartteira API",
        version: "1",
        description: "This is the API for using the cartteira app",
      },
      servers: [
        {
          url: "http://localhost:3333/api",
          description: "Development",
        },
        {
          url: "https://wode-cartteira.herokuapp.com/api",
          description: "Staging"
        },
      ],
    },
    apis: [
      "src/controllers/v1/*.js",
      "src/controllers/auth/*.js",
      "src/models/*.js",
    ],
  },
};
