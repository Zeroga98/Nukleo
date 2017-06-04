import { Controller, Get, Delete, Request, Response, Param, HttpStatus } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('devices')
export class DeviceController {

    constructor(private deviceService: DeviceService) {}

    @Get()
    async getAllDevices (@Response() res) {
      const devices = await this.deviceService.getAllDevices()
      res.status(HttpStatus.OK).json(devices)
    }

    @Get('/:id')
    async getDevice(@Response() res,
                                 @Param('id') id) {       
      const device = await this.deviceService.getDevice(id)
      res.status(HttpStatus.OK).json(device)
    }

    @Delete('/:id')
    async deleteDevices(@Response() res,
                                        @Param('id') id) {       
      const device = await this.deviceService.deleteDevice(id)
      res.status(HttpStatus.OK).json(device)
    }
}
