import {
  Table,
  Column,
  Model,
  ForeignKey,
  DataType,
  AllowNull,
  Default,
} from "sequelize-typescript";
import Product from "./Product";
import Cart from "./Cart";

@Table
export default class Cart_Products extends Model {
  @ForeignKey(() => Cart)
  @Column(DataType.UUID)
  declare cartId: string;

  @ForeignKey(() => Product)
  @Column(DataType.UUID)
  declare productId: string;

  @Default(1)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare quantity: number;
}
