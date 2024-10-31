import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ProductCategory } from "../../product_category/models/product_category.model";
import { Customer } from "../../customer/models/customer.model";
import { ProductRating } from "../../product_rating/models/product_rating.model";

interface IProductCreationAttr{
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
  stock: number;
  average_rating: number;
}

@Table({ tableName: 'product' })
export class Product extends Model<Product, IProductCreationAttr> {
  @ApiProperty({
    example: 1,
    description: 'Product ID',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Cake',
    description: 'Name of the product',
  })
  @Column({
    type: DataType.STRING(100),
  })
  name: string;

  @ApiProperty({
    example: 'This is a cake',
    description: 'Description of the product',
  })
  @Column({
    type: DataType.STRING(1000),
  })
  description: string;

  @ApiProperty({
    example: 1000,
    description: 'Price of the product',
  })
  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @ApiProperty({
    example: 'cake.jpg',
    description: 'Image of the product',
  })
  @Column({
    type: DataType.STRING(100),
  })
  image: string;

  @ApiProperty({
    example: 1,
    description: 'Category ID of the product',
  })
  @ForeignKey(() => ProductCategory)
  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;

  @ApiProperty({
    example: 100,
    description: 'Stock of the product',
  })
  @Column({
    type: DataType.INTEGER,
  })
  stock: number;

  @ApiProperty({
    example: 4.5,
    description: 'Average rating of the product',
  })
  @Column({
    type: DataType.DECIMAL,
  })
  average_rating: number;

  // Add other relevant fields and relationships here
  @BelongsTo(() => ProductCategory)
  product_category: ProductCategory;

  @BelongsToMany(() => Customer, () => ProductRating)
  customers: Customer[];
}