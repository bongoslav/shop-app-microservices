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
import { v4 as uuidv4 } from "uuid";
import Customer from "./Customer";
import Product from "./Product";

@Table
export default class Wishlist extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull
  @Column(DataType.STRING)
  declare description: string;

  @AllowNull
  @Column(DataType.STRING)
  declare banner: string;

  @AllowNull
  @Column(DataType.BOOLEAN)
  declare available: boolean;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare price: number;

  @ForeignKey(() => Customer)
  @Column(DataType.UUID)
  declare customerId: string;

  @BelongsToMany(() => Product, "Wishlist_Products", "wishlistId", "productId")
  declare products: Product[];
}
