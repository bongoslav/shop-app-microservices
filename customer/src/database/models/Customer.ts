import {
  AllowNull,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Cart from "./Cart";
import Address from "./Address";

export interface CustomerData {
  id: string;
  email: string;
  hashedPassword: string;
  salt: string;
  phone: string;
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
  @ForeignKey(() => Cart)
  @Column(DataType.UUID)
  declare cartId: string;

  @BelongsToMany(
    () => Address,
    "Customers_Addresses",
    "customerId",
    "addressId"
  )
  declare addresses: Address[];

  @BelongsTo(() => Cart, "cartId")
  declare cart: Cart[];
}
