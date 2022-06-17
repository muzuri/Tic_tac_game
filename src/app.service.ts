import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
  ){}

  checkValidation_request_characters(board: string){

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
  }
  // This function help us to place the o in the right place
  split_board(board: string, index: number){
    const board1 = board.split('');
    board1[index] = 'o'
    board = board1.join('');
    return board;
  }
  // This function help us to check the position of a specific element in the board
  check_position(board: string, element: string){
    var positions = [];
  for (let i=0; i< board.length; i++){
    if(board[i] === element){
       positions.push(i);
    }}
    return positions;
  }
  
  // This function help player 'o' to defend so that it can force
  // tie instead of losing the Game.
  // it will try to defend for each possible case in the board to avoid 'x' to win our server(player 'o')
  defend(board){
    if(board[0] =='x' && board[3] =='x' && board[6]==' '){
      board = this.split_board(board, 6);
    }
    if(board[6] =='x' && board[3] =='x' && board[0]==' '){
      board = this.split_board(board, 0);
    }
    if(board[0] =='x' && board[6] =='x' && board[3]==' '){
      board = this.split_board(board, 3);    }
    if(board[4] =='x' && board[2] =='x' && board[6]==' '){
      board = this.split_board(board, 6);
    }
    if(board[6] =='x' && board[2] =='x' && board[4]==' '){
      board = this.split_board(board, 4);
    }
    if(board[4] =='x' && board[6] =='x' && board[2]==' '){
      board = this.split_board(board, 2);
    }
    if(board[0] =='x' && board[1] =='x' && board[2] ==' '){
      board = this.split_board(board, 2);
    }
    if(board[0] =='x' && board[2] =='x' && board[1] ==' '){
      board = this.split_board(board, 1);
    }
    if(board[1] =='x' && board[2] =='x' && board[0] ==' '){
      board = this.split_board(board, 0);
    }
    if(board[0] =='x' && board[4] =='x' && board[8] ==' '){
      board = this.split_board(board, 8);
    }
    if(board[0] =='x' && board[8] =='x' && board[4] ==' '){
      board = this.split_board(board, 4);
    }
    if(board[8] =='x' && board[4] =='x' && board[0] ==' '){
      board = this.split_board(board, 0);
    }
    if(board[3] =='x' && board[4] =='x' && board[5] ==' '){
      board = this.split_board(board, 5);
    }
    if(board[3] =='x' && board[5] =='x' && board[4] ==' '){
      board = this.split_board(board, 4);
    }
    if(board[4] =='x' && board[5] =='x' && board[3] ==' '){
      board = this.split_board(board, 3);
    }
    if(board[6] =='x' && board[7] =='x' && board[8] ==' '){
      board = this.split_board(board, 8);
    }
    if(board[6] =='x' && board[8] =='x' && board[7] ==' '){
      board = this.split_board(board, 7);
    }
    if(board[7] =='x' && board[8] =='x' && board[6] ==' '){
      board = this.split_board(board, 6);
    }
    if(board[1] =='x' && board[4] =='x' && board[7]==' '){
      board = this.split_board(board, 7);
    }
    if(board[1] =='x' && board[7] =='x' && board[4]==' '){
      board = this.split_board(board, 4);
    }
    if(board[4] =='x' && board[7] =='x' && board[1]==' '){
      board = this.split_board(board, 1);
    }
    if(board[2] =='x' && board[5] =='x' && board[8]==' '){
      board = this.split_board(board, 8);
    }
    if(board[2] =='x' && board[8] =='x' && board[5]==' '){
      board = this.split_board(board, 5);
    }
    if(board[8] =='x' && board[5] =='x' && board[2]==' '){
      board = this.split_board(board, 2);
    }
    return board;
  }
  // The function (has_o_won) should check each opportunity to make o winning the game
  // because 'o' should always win.
  has_o_won(board:string, session: any){
    session.won = false;
    if(board[0] =='o' && board[3] =='o' && board[6]==' '){
      board = this.split_board(board, 6);
      session.won = true;
    }
    if(board[6] =='o' && board[3] =='o' && board[0]==' '){
      board = this.split_board(board, 0);
      session.won = true;
    }
    if(board[0] =='o' && board[6] =='o' && board[3]==' '){
      board = this.split_board(board, 3);
      session.won = true;
    }
  
    if(board[4] =='o' && board[2] =='o' && board[6]==' '){
      board = this.split_board(board, 6);
      session.won = true;
    }
    if(board[6] =='o' && board[2] =='o' && board[4]==' '){
      board = this.split_board(board, 4);
      session.won = true;
    }
    if(board[4] =='o' && board[6] =='o' && board[2]==' '){
      board = this.split_board(board, 2);
      session.won = true;
    }
    if(board[0] =='o' && board[1] =='o' && board[2] ==' '){
      board = this.split_board(board, 2);
      session.won = true;
    }
    if(board[0] =='o' && board[2] =='o' && board[1] ==' '){
      board = this.split_board(board, 1);
      session.won = true;
    }
    if(board[1] =='o' && board[2] =='o' && board[0] ==' '){
      board = this.split_board(board, 0);
      session.won = true;
    }
    if(board[0] =='o' && board[4] =='o' && board[8] ==' '){
      board = this.split_board(board, 8);
      session.won = true;
    }
    if(board[0] =='o' && board[8] =='o' && board[4] ==' '){
      board = this.split_board(board, 4);
      session.won = true;
    }
    if(board[8] =='o' && board[4] =='o' && board[0] ==' '){
      board = this.split_board(board, 0);
      session.won = true;
    }
    if(board[3] =='o' && board[4] =='o' && board[5] ==' '){
      board = this.split_board(board, 5);
      session.won = true;
    }
    if(board[3] =='o' && board[5] =='o' && board[4] ==' '){
      board = this.split_board(board, 4);
      session.won = true;
    }
    if(board[4] =='o' && board[5] =='o' && board[3] ==' '){
      board = this.split_board(board, 3);
      session.won = true;
    }
    if(board[6] =='o' && board[7] =='o' && board[8] ==' '){
      board = this.split_board(board, 8);
      session.won = true;
    }
    if(board[6] =='o' && board[8] =='o' && board[7] ==' '){
      board = this.split_board(board, 7);
      session.won = true;
    }
    if(board[7] =='o' && board[8] =='o' && board[6] ==' '){
      board = this.split_board(board, 6);
      session.won = true;
    }
    if(board[1] =='o' && board[4] =='o' && board[7]==' '){
      board = this.split_board(board, 7);
      session.won = true;
    }
    if(board[1] =='o' && board[7] =='o' && board[4]==' '){
      board = this.split_board(board, 4);
      session.won = true;
    }
    if(board[4] =='o' && board[7] =='o' && board[1]==' '){
      board = this.split_board(board, 1);
      session.won = true;
    }
    if(board[2] =='o' && board[5] =='o' && board[8]==' '){
      board = this.split_board(board, 8);
      session.won = true;
    }
    if(board[2] =='o' && board[8] =='o' && board[5]==' '){
      board = this.split_board(board, 5);
      session.won = true;
    }
    if(board[8] =='o' && board[5] =='o' && board[2]==' '){
      board = this.split_board(board, 2);
      session.won = true;
    }
    return board;
  }
  validateBoard(board: string, isFirst: boolean){
    this.checkValidation_request_characters(board);
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
        board = this.split_board(board, 2)
      }

    }
    return board;
  
  }
  
  validateBoard1(board: string, session){
    this.checkValidation_request_characters(board);
    var positions_x = this.check_position(board, 'x');
    var positions_o =  this.check_position(board, 'o');
    var positions_empty =  this.check_position(board, ' ');
    
    
    var positions_returned_x = this.check_position(session.lastreturned, 'x');
    var positions_returned_o =  this.check_position(session.lastreturned, 'o');

    const occupied_positions = positions_o.concat(positions_x);
    const occupied_returned_positions = positions_returned_o.concat(positions_returned_x);
    console.log(`x positions ${positions_x}`);
    console.log(`o positions ${positions_o}`);
    console.log(`empty positions ${positions_empty}`);
    console.log(`occupied positions ${occupied_positions}`);

  // Second move of the Game
  if(session.visits ==1){
    console.log(`we are on the session   ${session.visits}`)
    if(session.lastreturned === board)
    {
      throw new BadRequestException('Invalid Request');
    }
    if(positions_o.length !=1){
      throw new BadRequestException('Invalid request');
    }
    if(positions_o.length + 1 < positions_x.length || positions_x.length + 1 < positions_o.length){
      throw new BadRequestException('Invalid request');
    }
    board = this.defend(board);
    //board = this.check_tie(board);
    return board;
  }
    // The other remaining  move of the player
    if(session.visits ==2 || session.visits == 3 || session.visits == 4){
      console.log(`we are on the session   ${session.visits}`)

      if(occupied_positions.length <= occupied_returned_positions.length){
        throw new BadRequestException('Invalid Request');
      }

      if(occupied_returned_positions.length + 1 < occupied_positions.length){
        throw new BadRequestException('Invalid Request');
      }
    board = this.has_o_won(board, session);
    if(session.won){
      session.visits = undefined
      session.lastreturned = undefined
      console.log(`This is where we won`);
      return 'O won!!!';
    }
    else {
      board = this.defend(board);
      return board;
    }
  
    } 
}
}
