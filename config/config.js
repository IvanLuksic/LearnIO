require("dotenv").config();

module.exports= {
  "development": {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        rejectUnauthorized: false

      }
    },
    logging: console.log
  },
  "production": {
    use_env_variable: "DATABASE_URL",
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        rejectUnauthorized: false

      }
    }
  },
}
