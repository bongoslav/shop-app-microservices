import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  AllowNull,
  BelongsToMany,
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

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  declare customerId: string;

  @BelongsToMany(() => Product, "Cart_Products", "cartId", "productId")
  declare products: Product[];
}
