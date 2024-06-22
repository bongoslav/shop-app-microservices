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
    database: process.env.CUSTOMER_POSTGRES_DATABASE,
    username: process.env.CUSTOMER_POSTGRES_USERNAME,
    password: process.env.CUSTOMER_POSTGRES_PASSWORD,
    host: process.env.CUSTOMER_POSTGRES_HOST,
    port: Number(process.env.CUSTOMER_POSTGRES_PORT),
    dialect: "postgres",
    migrationStorageTableName: "Migrations",
    migrationTimestamps: true,
  },
};
