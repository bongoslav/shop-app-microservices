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
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
    migrationStorageTableName: "Migrations",
    migrationTimestamps: true,
  },
};
