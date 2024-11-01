import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Creating user' })
  @ApiResponse({
    status: 200,
    description: 'Create user',
    type: Object,
  })
  @Post('create')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'get all user' })
  @ApiResponse({
    status: 200,
    description: 'get user',
    type: Object,
  })
  @Get('get')
  findAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'get 1 user' })
  @ApiResponse({
    status: 200,
    description: 'get 1  user',
    type: Object,
  })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @ApiOperation({ summary: 'update user' })
  @ApiResponse({
    status: 200,
    description: 'update user',
    type: Object,
  })
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(+id, updateCustomerDto);
  }

  @ApiOperation({ summary: 'delete user' })
  @ApiResponse({
    status: 200,
    description: 'delete user',
    type: Object,
  })
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }

  @Get('activate/:link')
  async activateUser(@Param('link') link: string) {
    return this.customerService.activateUser(link);
  }
}
