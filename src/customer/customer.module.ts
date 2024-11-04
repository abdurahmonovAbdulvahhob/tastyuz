import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import { AdminStrategy, UserStrategy } from '../common/strategies';


@Module({
  imports: [SequelizeModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [CustomerService,UserStrategy,AdminStrategy],
  exports: [CustomerService],
})
export class CustomerModule {}
