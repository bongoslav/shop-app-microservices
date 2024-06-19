import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  ForeignKey,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";
import Product from "./Product";

@Table
export default class Carts_Product extends Model {
  @ForeignKey(() => Cart)
  @Column(DataType.UUID)
  declare cartId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare productId: string;

  @Default(1)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare quantity: number;
}
