import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('')
export class DevicesController {

    constructor(private devicesService: DevicesService) {}

    @Post('/pair')
    public async pairDevice (
      @Response() res,
      @Body('device') device,
      @Body('apikey') apikey,
      @Body('latitude') latitude,
      @Body('longitude') longitude
      ) {
      const response = await this.devicesService.pairDevice(device, apikey, latitude, longitude)
      res.status(HttpStatus.OK).json(response)
    }

    @Get('/customer/devices')
    public async getMyDevices (@Request() req, @Response() res) {
      const devices = await this.devicesService.getMyDevices(req.apikey)
      res.status(HttpStatus.OK).json(devices)
    }

    @Get('/customer/device/:id')
    async getDevice(
      @Request() req,
      @Response() res,
      @Param('id') deviceId)
    {       
      const device = await this.devicesService.getDevice(req.apikey, deviceId)
      res.status(HttpStatus.OK).json(device)
    }

   @Get('/customer/device/:id/actions')
    async getDeviceActions(
      @Response() res,
      @Param('id') id)
    {       
      const actions = await this.devicesService.getDeviceActions(id)
      res.status(HttpStatus.OK).json(actions)
    }
}
