import { Sequelize } from "sequelize-typescript";
import Address from "./models/Address";
import Customer from "./models/Customer";
import Order from "./models/Order";
import Product from "./models/Product";
import Cart from "./models/Cart";
import Wishlist from "./models/Wishlist";
import * as dotenv from "dotenv";
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

db.addModels([Address, Customer, Order, Product, Cart, Wishlist]);

export default db;
