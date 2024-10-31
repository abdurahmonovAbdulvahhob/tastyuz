import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { ProductCategoryModule } from './product_category/product_category.module';
import { ShipperModule } from './shipper/shipper.module';
import { ProductModule } from './product/product.module';
import { CustomerModule } from './customer/customer.module';
import { ProductRatingModule } from './product_rating/product_rating.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: +process.env.POSTGRES_PORT || 3001,
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'root2003',
      database: process.env.POSTGRES_DB || 'tastyuz',
      models: [],
      logging: false,
      autoLoadModels: true,
      sync: { alter: true },
    }),
    AdminModule,
    AuthModule,
    PaymentMethodModule,
    ProductCategoryModule,
    ShipperModule,
    ProductModule,
    CustomerModule,
    ProductRatingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
