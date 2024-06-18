import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { v4 as uuidv4 } from "uuid";

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
  @Column(DataType.STRING)
  declare banner: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare type: string;

  @AllowNull(false)
  @Column(DataType.NUMBER)
  declare unit: number;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  declare price: number;

  @AllowNull(false)
  @Column(DataType.BOOLEAN)
  declare available: boolean;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare supplier: string;
}
