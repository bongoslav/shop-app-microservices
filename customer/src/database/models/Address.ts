import {
  AllowNull,
  BelongsToMany,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Customer from "./Customer";

export interface AddressData {
  id: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

@Table
export default class Address extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare street: String;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare postalCode: String;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare city: String;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare country: String;

  @BelongsToMany(
    () => Customer,
    "Customers_Addresses",
    "addressId",
    "customerId"
  )
  declare customers: Customer[];
}
