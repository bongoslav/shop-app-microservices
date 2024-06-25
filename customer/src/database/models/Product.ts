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
import Wishlist from "./Wishlist";
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
  @Column(DataType.NUMBER)
  declare price: number;

  @BelongsToMany(() => Cart, "Cart_Products", "productId", "cartId")
  declare carts: Cart[];

  @BelongsToMany(() => Wishlist, "Wishlist_Products", "productId", "wishlistId")
  declare wishlists: Wishlist[];

  @BelongsToMany(() => Order, "Order_Products", "productId", "orderId")
  declare orders: Order[];
}
