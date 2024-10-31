import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from './models/admin.model';
import { ActivateAdminDto } from './dto/activate-admin.dto';
import { DeactivateAdminDto } from './dto/deactivate-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Add new admin' })
  // @UseGuards(CreatorGuard)
  @ApiResponse({
    status: 201,
    description: 'Added',
    type: Admin,
  })
  @Post('create')
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Get all data' })
  // @UseGuards(CreatorGuard)
  @ApiResponse({
    status: 200,
    description: 'All admin value',
    type: [Admin],
  })
  @Get('get')
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'Get one data by Id' })
  // @UseGuards(AdminSelfGuard)
  @ApiResponse({
    status: 200,
    description: 'Get one by Id',
    type: Admin,
  })
  @Get('get/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update one data by Id' })
  // @UseGuards(AdminSelfGuard)
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: Admin,
  })
  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete one data by Id' })
  // @UseGuards(CreatorGuard)
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
    type: Number,
  })
  @Delete('delete/:id')
  // @UseGuards(CreatorGuard)
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @ApiOperation({ summary: 'Activate the admin' })
  // @UseGuards(CreatorGuard)
  @HttpCode(200)
  @Post('activate')
  activateAdmin(@Body() activateAdminDto: ActivateAdminDto) {
    return this.adminService.activateAdmin(activateAdminDto);
  }

  @ApiOperation({ summary: 'Deactivate the admin' })
  // @UseGuards(CreatorGuard)
  @HttpCode(200)
  @Post('deactivate')
  deactivateAdmin(@Body() deactivateAdminDto: DeactivateAdminDto) {
    return this.adminService.activateAdmin(deactivateAdminDto);
  }
}
