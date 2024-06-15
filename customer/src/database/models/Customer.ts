import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";
import Address from "./Address";
import Wishlist from "./Wishlist";
import Order from "./Order";

export interface CustomerData {
  id: string;
  email: string;
  hashedPassword: string;
  salt: string;
  phone: string;
  cartId: string;
  wishlistId: string;
}

@Table
export default class Customer extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare email: String;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare hashedPassword: String;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare salt: String;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare phone: String;

  @AllowNull(false)
  @ForeignKey(() => Wishlist)
  @Column(DataType.UUID)
  declare wishlistId: string;

  @BelongsToMany(
    () => Address,
    "Customers_Addresses",
    "customerId",
    "addressId"
  )
  declare addresses: Address[];

  @HasOne(() => Cart, "cartId")
  declare cart: Cart;

  @HasOne(() => Wishlist, "wishlistId")
  declare wishlist: Wishlist;

  @HasMany(() => Order, "customerId")
  declare orders: Order[];
}
