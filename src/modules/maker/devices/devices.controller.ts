import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('')
export class DevicesController {

  constructor(private devicesService: DevicesService) { }

  @Get('/get-by-id')
  public async getById(
    @Response() res,
    @Body('apikey') apikey
    ) {
    //const response = await this.devicesService.pairDevice(device, apikey, latitude, longitude)
    res.status(HttpStatus.OK).json("OK")
  }

  @Get('/get-all')
  public async getAll(
    @Response() res,
    @Body('apikey') apikey
    ) {
    //const response = await this.devicesService.pairDevice(device, apikey, latitude, longitude)
    res.status(HttpStatus.OK).json("Bien")
  }

  @Post('/signup')
  public async signup( @Request() req, @Response() res) {
    //const devices = await this.devicesService.getMyDevices(req.apikey)
    res.status(HttpStatus.OK).json('ok')
  }
}
