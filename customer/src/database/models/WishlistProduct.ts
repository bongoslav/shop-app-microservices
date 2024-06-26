import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  PrimaryKey,
  Default,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Wishlist from "./Wishlist";

// Minimal Product Reference method
@Table
export default class WishlistProduct extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @ForeignKey(() => Wishlist)
  @Column(DataType.UUID)
  declare wishlistId: string;

  @Column(DataType.UUID)
  declare productId: string;

  @AllowNull(false)
  @Default(1)
  @Column(DataType.INTEGER)
  declare quantity: number;

  @BelongsTo(() => Wishlist)
  declare wishlist: Wishlist;
}
