import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import Product from "./models/Product";
dotenv.config();

const db = new Sequelize({
  database: process.env.PRODUCTS_POSTGRES_DATABASE,
  username: process.env.PRODUCTS_POSTGRES_USERNAME,
  password: process.env.PRODUCTS_POSTGRES_PASSWORD,
  host: process.env.PRODUCTS_POSTGRES_HOST,
  port: Number(process.env.PRODUCTS_POSTGRES_PORT),
  dialect: "postgres",
  logging: false,
});

db.addModels([Product]);

export default db;
