import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  AllowNull,
  BelongsToMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";
import Order from "./Order";

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
  declare description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare banner: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare unit: number;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare price: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare supplier: string;

  @BelongsToMany(() => Cart, "Cart_Products", "productId", "cartId")
  declare carts: Cart[];

  @BelongsToMany(() => Order, "Orders_Products", "productId", "orderId")
  declare orders: Order[];
}
