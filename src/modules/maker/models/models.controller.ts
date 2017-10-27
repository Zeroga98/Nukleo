import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post } from '@nestjs/common';
import { ModelsService } from './models.service';

@Controller('maker/models')
export class ModelsController {

  constructor(private modelsService: ModelsService) { }

  @Get('/get-all')
  public async getAll(
    @Response() res,
    @Request() req
    ) {
    let response = await this.modelsService.getAll(req.apikey)
    res.status(HttpStatus.OK).json(response)
  }

  @Get('/get-detail/:model_id')
  public async getDetail(
    @Response() res,
    @Param('model_id') modelId
    ) {
    const response = await this.modelsService.getDetail(modelId)
    res.status(HttpStatus.OK).json(response)
  }

  @Post('/signup')
  public async signup( @Request() req, @Response() res, 
    @Body('version') version,
    @Body('img') img,
    @Body('description') description
    ) {
    console.log(version);
    const response = await this.modelsService.insert(req.apikey, version, img, description)
    res.status(HttpStatus.OK).json(response)
  }
}
