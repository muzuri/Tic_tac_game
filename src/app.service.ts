import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ){}
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
  const occupied_positions = positions_o.concat(positions_x);
  console.log(`x positions ${positions_x}`);
  console.log(`o positions ${positions_o}`);
  console.log(`empty positions ${positions_empty}`);
  console.log(`occupied positions ${occupied_positions}`);
  //console.log(isFirst);
  // check if is the first time player
    if(isFirst){
      if(positions_empty.length < 8 || positions_o.length>0 || positions_x.length>1){
        
            throw new BadRequestException('Invalid request');
      
      }
      if(!positions_x.includes(5)){
        board[5] === 'o'
      }
      else {
        board[2] == 'o'
      }

    }
    console.log(board);
    return board;
  
  }
  validateBoard1(board: string, session: number){

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
  //console.log(isFirst);
  // check if is the first time player
  if(session ==1){
    if(positions_o.length !=1){
      throw new BadRequestException('Invalid request');
    }

  }
    console.log(board);
    return board;
  
  }
  processGame(session: number, board: string){
 if(session >= 5){
  this.checkWinner(board)
 }
  }
  checkWinner(board: string){
        var checkSet = new Set()
        // possible vertical alignments
        if(board[0] && board[3] && board[6] && (Array.from(checkSet.add(board[0]).add(board[3]).add(board)).length === 1)){
          console.log(`${board[3]} Wins!!`);
          //this.endGame();
        }
        checkSet.clear();
        if(board[1] && board[4] && board[7] && (Array.from(checkSet.add(board[1]).add(board[4]).add(board[7])).length === 1)){
          console.log(`${board[4]} Wins!!`);
          //this.endGame();
        }
        checkSet.clear();
        if(board[2] && board[5] && board[8] && (Array.from(checkSet.add(board[2]).add(board[5]).add(board[8])).length === 1)){
          console.log(`${board[2]} Wins!!`);
          //this.endGame();
        }
        checkSet.clear();
        // possible horizontal alignments
        if(board[0] && board[1] && board[2] && (Array.from(checkSet.add(board[0]).add(board[1]).add(board[2])).length === 1)){
          console.log(`${board[1]} Wins!!`);
          //this.endGame();
        }
        checkSet.clear();
        if(board[3] && board[4] && board[5] && (Array.from(checkSet.add(board[3]).add(board[4]).add(board[5])).length === 1)){
          console.log(`${board[3]} Wins!!`);
         // this.endGame();
        }
        checkSet.clear();
        if(board[6] && board[7] && board[8] && (Array.from(checkSet.add(board[6]).add(board[7]).add(board[8])).length === 1)){
          console.log(`${board[8]} Wins!!`);
          //this.endGame(); please clear counter if exist
        }
        checkSet.clear();
        // possible diagonal alignments
        if((board[0] && board[4] && board[8] && (Array.from(checkSet.add(board[0]).add(board[4]).add(board[8])).length === 1)) || (board[2] && board[4] && board[6] && (Array.from(checkSet.add(board[2]).add(board[4]).add(board[6])).length === 1))){
          console.log(`${board[3]} Wins!!`);
          //this.endGame(); this clean counter if exist
        }
        checkSet.clear();

    return {
        board_size:board.length,
        board: board.toString().replace(/,/g,''),
        board1: board,
    }
  }
  }
