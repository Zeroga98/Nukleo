import { Controller, Get, Delete, Request, Response, Body, Param, HttpStatus, Post } from '@nestjs/common';
import { ActionService } from './actions.service';

@Controller('maker/actions')
export class ActionsController {

  constructor(private actionService: ActionService) { }

  @Post('/signup')
  public async signup( @Request() req, @Response() res, 
    @Body('model_id') fk_model,
    @Body('action_name') action_name,
    @Body('action_value') action_value
    ) {
    const response = await this.actionService.signup(fk_model, action_name, action_value);
    res.status(HttpStatus.OK).json(response)
  } 

  @Post('/delete')
  public async delete( @Request() req, @Response() res, 
    @Body('action_id') action_id
    ) {
    const response = await this.actionService.delete(action_id);
    res.status(HttpStatus.OK).json(response)
  } 

}
