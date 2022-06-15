import { Controller, Get, Query, Req, Res, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async findAll(@Session() session: Record<string, any>) { 
    let count = 0;
    if(session.id){
      count+=1
    }
    session.visits = session.visits ? session.visits + 1 : 1;
    return session.visits;
  }
  @Get(':board')
  async geBoard(
    @Query('board') board: string,
    @Session() session: Record<string, any>
  ) {

    const isFirst = session.visits == undefined ? true : false;
    console.log(`is it the first time player ${isFirst}`);
    const board1= await this.appService.validateBoard(board, isFirst);
    session.visits = session.visits ? session.visits + 1 : 1;
    const board2 = await this.appService.validateBoard1(board1, session.visits)
    session.visits = session.visits ? session.visits + 1 : 1;
    const board3 =  await this.appService.checkWinner(board2);

    
  }
}
