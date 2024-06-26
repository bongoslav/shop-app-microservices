import { Sequelize } from "sequelize-typescript";
import Address from "./models/Address";
import Customer from "./models/Customer";
import Wishlist from "./models/Wishlist";
import WishlistProduct from "./models/WishlistProduct";
import * as dotenv from "dotenv";
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

db.addModels([Address, Customer, Wishlist, WishlistProduct]);

export default db;
