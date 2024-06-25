import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";
import Wishlist from "./Wishlist";
import Product from "./Product";

@Table
export default class Wishlist_Products extends Model {
  @ForeignKey(() => Wishlist)
  @Column(DataType.UUID)
  declare wishlistId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare productId: string;

  @Default(1)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare quantity: number;
}
