import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";
import Category from "./Category";

@Table
export default class Product extends Model {
  @PrimaryKey
  @Default(uuidv4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare price: number;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare stock: number;

  @AllowNull(true)
  @Column(DataType.ARRAY(DataType.STRING))
  declare photos: string[];

  @AllowNull(false)
  @Column(DataType.STRING)
  declare supplier: string;

  @AllowNull(false)
  @ForeignKey(() => Category)
  @Column(DataType.UUID)
  declare categoryId: string;

  @BelongsTo(() => Category)
  declare category: Category;
}
