import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Customer from "./Customer";
import WishlistProduct from "./WishlistProduct";

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

  @HasMany(() => WishlistProduct)
  declare products: WishlistProduct[];
}
