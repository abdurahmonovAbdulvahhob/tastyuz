import { Module } from '@nestjs/common';
import { ShipperService } from './shipper.service';
import { ShipperController } from './shipper.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Shipper } from './models/shipper.model';

@Module({
  imports: [SequelizeModule.forFeature([Shipper])],
  controllers: [ShipperController],
  providers: [ShipperService],
})
export class ShipperModule {}
