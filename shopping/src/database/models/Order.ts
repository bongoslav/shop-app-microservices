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
import Product from "./Product";
import Orders_Products from "./Orders_Products";

@Table
export default class Order extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.UUID)
  declare customerId: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare amount: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare status: string;

  @BelongsToMany(() => Product, () => Orders_Products)
  declare products: Product[];
}
