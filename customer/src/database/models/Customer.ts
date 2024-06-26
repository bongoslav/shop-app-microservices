import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Address from "./Address";
import Wishlist from "./Wishlist";

export interface CustomerData {
  id: string;
  email: string;
  hashedPassword: string;
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
  declare email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare hashedPassword: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare lastName: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  declare phone: string;

  @BelongsToMany(
    () => Address,
    "Customers_Addresses",
    "customerId",
    "addressId"
  )
  declare addresses: Address[];

  @HasOne(() => Wishlist)
  declare wishlistId: string;
}
