import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  PrimaryKey,
  Default,
  AllowNull,
} from "sequelize-typescript";
import Customer from "./Customer";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";

@Table
export default class Product extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare banner: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare price: number;

  @ForeignKey(() => Cart)
  @Column(DataType.UUID)
  declare cartId: string;

  @BelongsTo(() => Cart, "cartId")
  declare cart: Cart;
}
