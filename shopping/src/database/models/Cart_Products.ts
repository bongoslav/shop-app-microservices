import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Cart from "./Cart";
import Product from "./Product";

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

  @BelongsTo(() => Cart)
  declare cart: Cart;

  @BelongsTo(() => Product)
  declare product: Product;
}
