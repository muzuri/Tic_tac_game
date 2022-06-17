import { Controller, Get, Query, Session } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':board')
  async geBoard(
    @Query('board') board: string,
    @Session() session: Record<string, any>
  ) {

    const isFirst = session.visits == undefined ? true : false;
    // Check if it the first time you play the game
    if(isFirst) 
    {
      const board_returned = await this.appService.validateBoard(board, isFirst);
      session.lastreturned = board_returned;
      console.log(`The last returned session ${session.lastreturned}`);
      board = board_returned.toString();
    }
    // Check for other times of playing the game where session is from 1 up to 4
    else {  
      const board_returned = await this.appService.validateBoard1(board, session)
      session.lastreturned = board_returned;
      console.log(`The last returned visit is ${board_returned}`);
      board = board_returned.toString();
    }
    session.visits = session.visits ? session.visits + 1 : 1;
    return board
  }
}
