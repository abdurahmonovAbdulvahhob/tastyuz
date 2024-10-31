import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../product/models/product.model';
import { ProductRating } from '../../product_rating/models/product_rating.model';

interface ICustomerCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  is_active: string;
}

@Table({ tableName: 'customer' })
export class Customer extends Model<Customer, ICustomerCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User's unique id(autoincrement)",
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: 'ID',
  })
  id: number;

  @ApiProperty({
    example: 'user1',
    description: "User's firstname ",
  })
  @Column({
    type: DataType.STRING,
  })
  first_name: string;

  @ApiProperty({
    example: 'user1',
    description: "User's lastname ",
  })
  @Column({
    type: DataType.STRING,
  })
  last_name: string;

  @ApiProperty({
    example: 'user@gmail.com',
    description: "User's email ",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'userpassword',
    description: "User's password ",
  })
  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ApiProperty({
    example: '+998900333422',
    description: "User's phone number",
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string;

  @ApiProperty({
    example: 'false',
    description:
      "User's activation(active,not active - boolean(true,false),defaultValue-false) ",
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @BelongsToMany(() => Product, () => ProductRating)
  products: Product[];
}