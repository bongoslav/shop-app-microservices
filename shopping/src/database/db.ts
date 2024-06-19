import { Sequelize } from "sequelize-typescript";
import Order from "./models/Order";
import Product from "./models/Product";
import Cart from "./models/Cart";
import * as dotenv from "dotenv";
import Carts_Product from "./models/Carts_Product";
dotenv.config();

const db = new Sequelize({
  database: process.env.POSTGRES_DATABASE,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  dialect: "postgres",
  logging: false,
});

db.addModels([Cart, Product, Order, Carts_Product]);

export default db;
