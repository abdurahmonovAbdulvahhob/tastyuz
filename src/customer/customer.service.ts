import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './models/customer.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private customerModel: typeof Customer) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const hashedPassword = await bcrypt.hash(createCustomerDto.password, 3);
    const newUser = await this.customerModel.create({
      ...createCustomerDto,
      hashed_password: hashedPassword,
    });
    return newUser;
  }

  findAll() {
    return `This action returns all customer`;
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }

  async updateRefreshToken(
    id: number,
    hashed_refresh_token: string,
    activation_link: string,
  ) {
    const updatedCustomer = await this.customerModel.update(
      { hashed_refresh_token, activation_link },
      { where: { id }, returning: true },
    );

    return updatedCustomer[1][0];
  }

  async findUserByEmail(email: string) {
    return this.customerModel.findOne({
      where: { email },
    });
  }

  async activateUser(
    link: string,
  ): Promise<{ is_active: boolean; message: string }> {
    const user = await this.customerModel.findOne({
      where: { activation_link: link, is_active: false },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.is_active) {
      throw new BadRequestException('User already activated');
    }

    user.is_active = true;
    await user.save();

    return {
      is_active: user.is_active,
      message: 'User activated successfully',
    };
  }
}
