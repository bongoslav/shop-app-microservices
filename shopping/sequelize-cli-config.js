const dotenv = require("dotenv");
const fs = require("fs");

const envPath = "./.env";

if (!fs.existsSync(envPath)) {
  console.error(".env not found!");
  process.exit(1);
}

dotenv.config({ path: envPath });

module.exports = {
  development: {
    database: process.env.SHOPPING_POSTGRES_DATABASE,
    username: process.env.SHOPPING_POSTGRES_USERNAME,
    password: process.env.SHOPPING_POSTGRES_PASSWORD,
    host: process.env.SHOPPING_POSTGRES_HOST,
    port: Number(process.env.SHOPPING_POSTGRES_PORT),
    dialect: "postgres",
    migrationStorageTableName: "Migrations",
    migrationTimestamps: true,
  },
};
