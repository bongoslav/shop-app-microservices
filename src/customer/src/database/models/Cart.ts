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
import Customer from "./Customer";
import Product from "./Product";
import { v4 as uuidv4 } from "uuid";

@Table
export default class Cart extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare unit: number;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  declare customerId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare productId: string;

  @BelongsTo(() => Customer, "customerId")
  declare customer: Customer;

  @BelongsTo(() => Product, "productId")
  declare product: Product;
}
