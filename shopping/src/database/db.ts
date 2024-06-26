import { Sequelize } from "sequelize-typescript";
import Order from "./models/Order";
import Product from "./models/Product";
import Cart from "./models/Cart";
import * as dotenv from "dotenv";
import Cart_Products from "./models/Cart_Products";
import Orders_Products from "./models/Orders_Products";
dotenv.config();

const db = new Sequelize({
  database: process.env.SHOPPING_POSTGRES_DATABASE,
  username: process.env.SHOPPING_POSTGRES_USERNAME,
  password: process.env.SHOPPING_POSTGRES_PASSWORD,
  host: process.env.SHOPPING_POSTGRES_HOST,
  port: Number(process.env.SHOPPING_POSTGRES_PORT),
  dialect: "postgres",
  logging: false,
});

db.addModels([Cart, Product, Order, Cart_Products, Orders_Products]);

export default db;
