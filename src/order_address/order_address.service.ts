import { Injectable } from '@nestjs/common';
import { CreateOrderAddressDto } from './dto/create-order_address.dto';
import { UpdateOrderAddressDto } from './dto/update-order_address.dto';

@Injectable()
export class OrderAddressService {
  create(createOrderAddressDto: CreateOrderAddressDto) {
    return 'This action adds a new orderAddress';
  }

  findAll() {
    return `This action returns all orderAddress`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orderAddress`;
  }

  update(id: number, updateOrderAddressDto: UpdateOrderAddressDto) {
    return `This action updates a #${id} orderAddress`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderAddress`;
  }
}
