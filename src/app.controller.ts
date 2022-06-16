import { Controller, Get, Query, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import e, { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':board')
  async geBoard(
    @Query('board') board: string,
    @Session() session: Record<string, any>
  ) {

    const isFirst = session.visits == undefined ? true : false;
    console.log(`is it the first time player ${isFirst}`);
    if(isFirst) 
    {
      const board_returned = await this.appService.validateBoard(board, isFirst);
      session.lastreturned = board_returned;
      console.log(`this is the last1111 ${session.lastreturned}`);
    }
    else {
      
      console.log(`this is the last visit222 ${session.lastreturned}`);
      const board_returned = await this.appService.validateBoard1(board, session)
      session.lastreturned = board_returned;
      
    }
    session.visits = session.visits ? session.visits + 1 : 1;
    return board
  }
}
