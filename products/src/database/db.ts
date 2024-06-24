import { Sequelize } from "sequelize-typescript";
import Product from "./models/Product";
import Category from "./models/Category";
import * as dotenv from "dotenv";
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

db.addModels([Product, Category]);

export default db;
