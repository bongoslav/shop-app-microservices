import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsToMany,
  BelongsTo,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Customer from "./Customer";
import Product from "./Product";

@Table
export default class Wishlist extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  declare customerId: string;

  @BelongsTo(() => Customer)
  declare customer: Customer;

  @BelongsToMany(() => Product, "Wishlist_Products", "wishlistId", "productId")
  declare products: Product[];
}
