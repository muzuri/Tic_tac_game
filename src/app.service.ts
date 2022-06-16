import { BadRequestException, HttpException, HttpStatus, Injectable, Session } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ){}

  split_board(board: string, index: number){
    const board1 = board.split('');
    board1[index] = 'o'
    board = board1.join('');
    return board
  }
  validateBoard(board: string, isFirst: boolean){

    const allowedChar = ['x','o',' '];
    console.log(`number of characters in the request ${board.length}`);
    if(board.length !==9){
        throw new BadRequestException('Invalid request for board')
    }
    Array.from(board).map(board => {
    
    if(!(allowedChar.includes(board)))
    {
        throw new BadRequestException('Characters should be valid');
    }
    })
    var positions_x = [];
    var positions_o = [];
    var positions_empty = []; 
  for (let i=0; i< board.length; i++){
    if(board[i] === 'o'){
       positions_o.push(i);
    }}
  for (let i=0; i< board.length; i++){
    if(board[i] === 'x'){
        positions_x.push(i);
      }}
  for (let i=0; i< board.length; i++){
    if(board[i] === ' '){
          positions_empty.push(i);
    }}

  // First move of the game
    if(isFirst){
      console.log('This is the first');
      if(positions_empty.length < 8 || positions_o.length>0 || positions_x.length>1){
        
            throw new BadRequestException('Invalid request');
      
      }
      if(!positions_x.includes(4)){
        const board1 = board.split('');
        board1[4] = 'o'
        board = board1.join('');
      }
      else {
        this.split_board(board, 2)
      }

    }
    console.log(`this is the console ${board}`);
    return board;
  
  }
  
  validateBoard1(board: string, session){

    var positions_x = [];
    var positions_o = [];
    var positions_empty = []; 
  for (let i=0; i< board.length; i++){
    if(board[i] === 'o'){
       positions_o.push(i);
    }}
  for (let i=0; i< board.length; i++){
    if(board[i] === 'x'){
        positions_x.push(i);
      }}
  for (let i=0; i< board.length; i++){
    if(board[i] === ' '){
          positions_empty.push(i);
    }}
  const occupied_positions = positions_o.concat(positions_x);
  console.log(`x positions ${positions_x}`);
  console.log(`o positions ${positions_o}`);
  console.log(`empty positions ${positions_empty}`);
  console.log(`occupied positions ${occupied_positions}`);

  // Second move of the Game
  if(session.visits ==1){
    console.log(`we are on the session   ${session.visits}`)
    console.log(session.lastreturned,"===", board);
    if(session.lastreturned === board || positions_o.length !=1)
    {
      throw new BadRequestException('Invalid Request');
    }
    if(positions_o.length !=1){
      throw new BadRequestException('Invalid request');
    }
    if(board[0] =='x' && board[3] =='x' && board[6]!='o'){
      const board1 = board.split('');
        board1[6] = 'o'
        board = board1.join('');
    }
    if(board[4] =='x' && board[2] =='x' && board[6]!='o'){
      const board1 = board.split('');
      board1[6] = 'o'
      board = board1.join('');    }
      if(board[0] =='x' && board[9] =='x' && board[4] =='o'){
        const board1 = board.split('');
        board1[2] = 'o'
        board = board1.join('');    }
    if(board[4] =='x' && board[0] =='x'){
      const board1 = board.split('');
      board1[6] = 'o'
      board = board1.join('');    }

  }
    // Third move of the player
    if(session.visits ==2){
      console.log(`we are on the session   ${session.visits}`)
      console.log(session.lastreturned,"===", board);
      if(session.lastreturned === board || positions_o.length !=2 ||
         positions_x.length<session.lastreturned.length)
      {
        throw new BadRequestException('Invalid Request');
      }
      if(board[0] =='x' && board[1] =='x' && board[2]!='o'){
        this.split_board(board, 2);
      }
      if(board[4] =='x' && board[2] =='x' && board[6]!='o'){
        this.split_board(board, 6);
      }
      if(board[1] =='x' && board[2] =='x' && board[0]=='o'){
        this.split_board(board, 0);
      }
      if(board[4] =='x' && board[0] =='x'){
        this.split_board(board, 8);
      }
      
      const board1 = board.split('');
      board1[5] = 'o'
      board = board1.join('');
  
    }
    if(session.visits >= 3){

 
      var checkSet = new Set()
      // possible vertical alignments
      if(board[0] && board[3] && board[6] && (Array.from(checkSet.add(board[0]).add(board[3]).add(board)).length === 1)){
        console.log(`${board[3]} Wins!!`);
        session.visits=0;
      }
      checkSet.clear();
      if(board[1] && board[4] && board[7] && (Array.from(checkSet.add(board[1]).add(board[4]).add(board[7])).length === 1)){
        console.log(`${board[4]} Wins!!`);
        session.visits =0;
      }
      checkSet.clear();
      if(board[2] && board[5] && board[8] && (Array.from(checkSet.add(board[2]).add(board[5]).add(board[8])).length === 1)){
        console.log(`${board[2]} Wins!!`);
        session.visits =0;
      }
      checkSet.clear();
      // possible horizontal alignments
      if(board[0] && board[1] && board[2] && (Array.from(checkSet.add(board[0]).add(board[1]).add(board[2])).length === 1)){
        console.log(`${board[1]} Wins!!`);
        session.visits = 0;
      }
      checkSet.clear();
      if(board[3] && board[4] && board[5] && (Array.from(checkSet.add(board[3]).add(board[4]).add(board[5])).length === 1)){
        console.log(`${board[3]} Wins!!`);
       session.visits
      }
      checkSet.clear();
      if(board[6] && board[7] && board[8] && (Array.from(checkSet.add(board[6]).add(board[7]).add(board[8])).length === 1)){
        console.log(`${board[8]} Wins!!`);
        session.visits;
      }
      checkSet.clear();
      // possible diagonal alignments
      if((board[0] && board[4] && board[8] && (Array.from(checkSet.add(board[0]).add(board[4]).add(board[8])).length === 1)) || (board[2] && board[4] && board[6] && (Array.from(checkSet.add(board[2]).add(board[4]).add(board[6])).length === 1))){
        console.log(`${board[3]} Wins!!`);
        session.visits = 0;
      }
      checkSet.clear();

  return {
      board_size:board.length,
      board: board.toString().replace(/,/g,''),
      board1: board,
  
}
  
  }
  if(session.visits == 0){
    throw new HttpException("Game is over", HttpStatus.FORBIDDEN);
  }
}
}
