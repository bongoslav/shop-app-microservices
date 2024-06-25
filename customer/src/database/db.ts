import { Sequelize } from "sequelize-typescript";
import Address from "./models/Address";
import Customer from "./models/Customer";
import Order from "./models/Order";
import Product from "./models/Product";
import Cart from "./models/Cart";
import Wishlist from "./models/Wishlist";
import * as dotenv from "dotenv";
import Wishlist_Products from "./models/Wishlist_Products";
import Cart_Products from "./models/Cart_Products";
import Order_Products from "./models/Order_Products";
dotenv.config();

const db = new Sequelize({
  database: process.env.CUSTOMER_POSTGRES_DATABASE,
  username: process.env.CUSTOMER_POSTGRES_USERNAME,
  password: process.env.CUSTOMER_POSTGRES_PASSWORD,
  host: process.env.CUSTOMER_POSTGRES_HOST,
  port: Number(process.env.CUSTOMER_POSTGRES_PORT),
  dialect: "postgres",
  logging: false,
});

db.addModels([
  Address,
  Customer,
  Order,
  Product,
  Cart,
  Wishlist,
  Wishlist_Products,
  Cart_Products,
  Order_Products,
]);

export default db;
