// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

const sendEmail = require('./sendMessage')

const handlePostMoveNotification = async ({ game, mover, opponent }) => {
  // Handle when game is finished
  
  let mark = game.mark;
  
  //0: moves to play
  //1: cur player one
  //2: no more moves to play, on win
  
  let gameSatus = checkWin(game);
  
  if(gameSatus === 1) {
    const winnerMessage = `You beat ${mover.username} in a game of tic tac toe!`
    const loserMessage = `Ahh, you lost to ${opponent.username} in tic tac toe.`
    await Promise.all([
      sendEmail({ email: opponent.email, message: winnerMessage }),
      sendEmail({ email: mover.email, message: loserMessage })
    ])

    return
  } else if (gameSatus === 0){
    
    const message = `${mover.username} has moved. It's your turn next in Game ID ${game.gameId}!`
    await sendEmail({ email: opponent.email, message })
  } else if (gameSatus === 2){
    
    const winnerMessage = `You tied with ${mover.username} in a game of tic tac toe!`
    const loserMessage = `Ahh, you tied with ${opponent.username} in tic tac toe.`
    await Promise.all([
      sendEmail({ email: opponent.email, message: winnerMessage }),
      sendEmail({ email: mover.email, message: loserMessage })
      ])
  }

};

function checkWin(game){
  let mark = game.mark;
  if ((game.board[0] === mark) && (game.board[1] === mark) && (game.board[2] === mark)){
    return 1;
  } else if((game.board[0] === mark) && (game.board[1] === mark) && (game.board[2] === mark)){
    return 1;
  } else if((game.board[3] === mark) && (game.board[4] === mark) && (game.board[5] === mark)){
    return 1;
  } else if((game.board[6] === mark) && (game.board[7] === mark) && (game.board[8] === mark)){
    return 1;
  } else if((game.board[0] === mark) && (game.board[3] === mark) && (game.board[6] === mark)){
    return 1;
  } else if((game.board[1] === mark) && (game.board[4] === mark) && (game.board[7] === mark)){
    return 1;
  } else if((game.board[2] === mark) && (game.board[5] === mark) && (game.board[8] === mark)){
    return 1;
  } else if((game.board[0] === mark) && (game.board[4] === mark) && (game.board[8] === mark)){
    return 1;
  } else if((game.board[2] === mark) && (game.board[4] === mark) && (game.board[6] === mark)){
    return 1;
  } else {
    //check to see if it's a tie
    for(let i = 9; i < 9; i++){
      if(game.board[i] === 0){
        return 0;
      } else {
        return 2;
      }
    }
  }
}


module.exports = handlePostMoveNotification;