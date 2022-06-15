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
    //console.log(session)
    //console.log(count);
    session.visits = session.visits ? session.visits + 1 : 1;
    return session.visits;
  }
  @Get(':board')
  async geBoard(
    @Query('board') board: string,
    @Session() session: Record<string, any>
  ) {
    // if(session.sessionID){
    //   count+= count
    // }
    //console.log(session)
    // console.log(`this is a session before validateBoard ${session.visits}`);
   // console.log(`this is a se ${session.visits}`);
    const isFirst = session.visits == undefined ? true : false;
    console.log(`This the first time player ${isFirst}`);
    const board1= await this.appService.validateBoard(board, isFirst);
   // console.log(`this is a session after validateBoard ${session.visits}`);
    // if(session.visits == undefined){
    //    console.log('it is the first time request')
    //    return 'is the first time request'
    // }
    await this.appService.processGame(board1);
    session.visits = session.visits ? session.visits + 1 : 1;
    // if(session.visits ==8){
    //   session.visits =0;
    //   return true
    //  //console.log(session.visits)
    // }
   
    //console.log(session.visits);
    console.log(`this is a session after processGame ${session.visits}`);
    // session.visits = 0;
    // console.log("after setting up session to 0")
    // console.log(session.visits)

    
  }
}
