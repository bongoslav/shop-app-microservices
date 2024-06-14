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
import { v4 as uuidv4 } from "uuid";
import Customer from "./Customer";

@Table
export default class Order extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare amount: number;

  @AllowNull(false)
  @Default(DataType.NOW)
  @Column(DataType.DATE)
  declare date: Date;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  declare customerId: string;

  @BelongsTo(() => Customer, "customerId")
  declare customer: Customer;
}
