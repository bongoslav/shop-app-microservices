import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Address from "./Address";
import Customer from "./Customer";

@Table
export default class Customers_Addresses extends Model {
  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  declare customerId: string;

  @ForeignKey(() => Address)
  @Column(DataType.UUID)
  declare addressId: string;
}
