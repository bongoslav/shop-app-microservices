import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
} from "sequelize-typescript";
import Product from "./Product";
import Order from "./Order";

@Table
export default class Order_Products extends Model {
  @ForeignKey(() => Order)
  @Column(DataType.UUID)
  declare orderId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare productId: string;
}
