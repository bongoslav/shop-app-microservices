import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import Product from "./models/Product";
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

db.addModels([Product]);

export default db;
