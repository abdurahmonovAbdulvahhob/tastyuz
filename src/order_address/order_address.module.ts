import { Module } from '@nestjs/common';
import { OrderAddressService } from './order_address.service';
import { OrderAddressController } from './order_address.controller';

@Module({
  controllers: [OrderAddressController],
  providers: [OrderAddressService],
})
export class OrderAddressModule {}
