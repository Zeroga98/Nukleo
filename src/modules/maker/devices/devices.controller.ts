import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';

@Controller('maker/devices')
export class DevicesController {

  constructor(private devicesService: DevicesService) { }

  @Get('/get-all')
  public async getAll(
    @Response() res,
    @Request() req
    ) {
    let response = await this.devicesService.getAll(req.apikey)
    res.status(HttpStatus.OK).json(response)
  }

  @Get('/get-by-model/:model_id')
  public async getByModelId(
    @Response() res,
    @Param('model_id') modelId
    ) {
    const response = await this.devicesService.getByModelId(modelId)
    res.status(HttpStatus.OK).json(response)
  }

  @Post('/signup')
  public async signup( @Request() req, @Response() res) {
    //const devices = await this.devicesService.getMyDevices(req.apikey)
    res.status(HttpStatus.OK).json('ok')
  }

  @Post('/event-add')
  public async addEvent( @Request() req, @Response() res, 
    @Body('device_id') device_id,
    @Body('action_id') action_id
    ) {
    const response = await this.devicesService.addEvent(device_id, action_id)
    res.status(HttpStatus.OK).json(response)
  }

  @Post('/event-trigger')
  public async eventTrigger( @Request() req, @Response() res, 
    @Body('device_id') device_id,
    @Body('action_id') action_id
    ) {
    const response = await this.devicesService.addEvent(device_id, action_id)
    res.status(HttpStatus.OK).json(response)
  }
}