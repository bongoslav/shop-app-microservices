import {
  AllowNull,
  Column,
  DataType,
  Table,
  ForeignKey,
  PrimaryKey,
  BelongsTo,
  Model,
} from "sequelize-typescript";
import Customer from "./Customer";
import Address from "./Address";

export interface CustomersAddressesData {
  customerId: string;
  addressId: string;
}

@Table
export default class Customers_Addresses extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.UUID)
  @ForeignKey(() => Customer)
  declare customerId: string;

  @PrimaryKey
  @AllowNull(false)
  @Column(DataType.STRING)
  @ForeignKey(() => Address)
  declare addressId: string;

  @BelongsTo(() => Customer, "customerId")
  declare customer: Customer;

  @BelongsTo(() => Address, "addressId")
  declare address: Address;
}
