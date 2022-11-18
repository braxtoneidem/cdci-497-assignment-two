const got = require('got');
const prompt = require("prompt-sync")({ sigint: true });
const url = 'https://mjxemb5xq0.execute-api.us-west-1.amazonaws.com/prod';
async function main() {

    
    console.log('Hello, welcome to tic tac toe');
    
    let startupChoice = false;
    while(!startupChoice){
        console.log('Login (1)');
        console.log('Register (2)');
        
        const startPick = prompt("Please Choose: ");
        
        if(startPick == 1){
            console.log('Time to log in');
            logging_In();
            startupChoice = true
        } else if (startPick == 2) {
            console.log('Time to register');
            startupChoice = true
            
            let userRegistered = false;
            
            while(!userRegistered){
                const userName = prompt("Please Choose username: ");
                const email = prompt("Please Choose email: ");
                const password = prompt("Please Choose Password: ");
                
                const options = {
                    json: {
                    username: userName,
                    password: password,
                    email: email,
                    phoneNumber: '+15555555556'
                    },
                };
                
                try{
                    const res = await got.post(`${url}/users`, options);
                    
                    const resData = JSON.parse(res.body);
                    console.log(resData);
                    if (resData.email === email) {
                        userRegistered = true;
                        await logging_In();
                    }else {
                            console.log('invalid credentials asdfasdfa');
                    }  
                } catch(err){
                    const errorBody = JSON.parse(err.response.body);
                    console.log(`Error: ${errorBody.message}`);

                }
            }
            
        } else {
            console.log('That was not a valid answer, Please try again');
        }
    
    }
}
    
    
async function logging_In(){
    console.log(' ');
    
    let token = -1;
    let userLoggedIn = false;
    let curPlayer = '-1';
    while(!userLoggedIn){
        const userName = prompt("Please enter username: ");
        const password = prompt("Please enter Password: ");
        
        const options = {
                        json: {
                        username: userName,
                        password: password,
                        },
                    };
        
        try{
            const res = await got.post(`${url}/login`, options);
            
            const resData = JSON.parse(res.body);
            console.log(resData);
            if (resData.idToken) {
                console.log(`got token: ${resData.idToken}.`);
                token = resData.idToken;
                curPlayer = userName;
                userLoggedIn = true;
            }else {
                    console.log('invalid credentials asdfasdfa');
            }  
        } catch(err){
            const errorBody = JSON.parse(err.response.body);
            console.log(`Error: ${errorBody.message}`);
    
        }
    }
    
    
    console.log(' ');
    console.log('Welcome wonderful user');


    let gameChoice = false;
    while(!gameChoice){
        console.log('Create Game (1)');
        console.log('Join Game (2)');
        
        const gamePick = prompt("Please Choose: ");
        
        if(gamePick == 1){
            console.log('Time to create');
            gameChoice = true
            
            // //get user1 email
            // let user1Pass = false;
            // while(!user1Pass){
            //     const user1Email = prompt("Please enter your email: ");
            //     if(isEmail(user1Email)){
            //         console.log('noice');
            //         user1Pass = true;
            //     } else {
            //         console.log('that is not a great email');
            //     }
            // }
            
            // //get user2 email
            // let user2Pass = false;
            // let opponent = '  ';
            // while(!user2Pass){
            //     const user2Email = prompt("Please enter enemies username: ");
            //     if(isEmail(user2Email)){
            //         opponent = user2Email;
            //         console.log('they shall perish');
            //         user2Pass = true;
            //     } else {
            //         console.log('that is not a great email for them');
            //     }
            // }
            
            const user2Username = prompt("Please enter enemies username: ");
            
            const options = {
                    headers: {
    		            'Authorization': token,
    	            },
                    json: {
                        opponent: user2Username,
                    },
            };
        
            try{
                const res = await got.post(`${url}/games`, options);
                
                const resData = JSON.parse(res.body);
                console.log(resData);
                if (resData.idToken) {
                    console.log(`got token: ${resData.idToken}.`);
                    userLoggedIn = true;
                }else {
                        console.log('invalid credentials asdfasdfa');
                }  
            } catch(err){
                const errorBody = JSON.parse(err.response.body);
                console.log(errorBody);
                
                console.log(`Error: ${errorBody.message}`);
        
            }
            
            
        } else if (gamePick == 2) {
            console.log('Time to join');
            gameChoice = true
            let gameIdChoice = false;
            while(!gameIdChoice){
                
                const gameID = prompt("Please enter game ID given via email: ");
                
                let API = `${url}/games/${gameID}`;
            
                try{
                    const res = await got.get(API);
                    const resData = JSON.parse(res.body);
                    console.log(resData);
                    if (resData.gameId) {
                        console.log(`got gameId: ${resData.gameId}.`);
                        
                        //print board 
                        printBoard(resData);
                        
                        
                        let userMoved = false;
                        while(!userMoved){
                            const move = prompt("Please enter the number value of where you would like to move (1-9): ");
                            if(checkValidMove(move, resData)){
                                let mark = '-1';
                                // move--;!
                                if(curPlayer === resData.user1) {
                                    console.log('you are 1: ' + curPlayer);
                                    mark = 'X';
                                } else if (curPlayer === resData.user2){
                                    console.log('you are 2: ' + curPlayer);
                                    mark = 'O';
                                } else {
                                    console.log('you are an error');
                                }
                                const options = {
                                        headers: {
                        		            'Authorization': token,
                        	            },
                                        json: {
                                            board: resData.board,
	                                        mark: mark,
	                                        move: move
                                        },
                                };
                            
                                try{
                                    const res = await got.post(API, options);
                                    
                                    const resData = JSON.parse(res.body);
                                    console.log(resData);
                                    if (resData.idToken) {
                                        console.log(`got token: ${resData.idToken}.`);
                                        userLoggedIn = true;
                                        break;
                                    }else {
                                            console.log('invalid credentials asdfasdfa');
                                    }  
                                } catch(err){
                                    const errorBody = JSON.parse(err.response.body);
                                    console.log(errorBody);
                                    
                                    console.log(`Error: ${errorBody.message}`);
                            
                                }
                         
                            } else {
                                console.log('Not a valid move, please pic a number from 1-9 using the corrisponding board');
                                printBoard(resData);
                            }
                            
                        }
                        
                        gameIdChoice = true;
                    }else {
                            console.log('invalid gameID asdfasdfa');
                    }  
                } catch(err){
                    // const errorBody = JSON.parse(err.response);
                    // console.log(`Error: ${errorBody.message}`);
                    console.log(err);
                    console.log(err.response);
            
                }
            }
            
        } else {
            console.log('That was not a valid answer, Please try again');
        }
    }
}


function checkValidMove(move, resData){
    if((move < 9) && (move > -1)){
        if ((resData.board[move] === 'X') || (resData.board[move] === 'O')){
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function printBoard(resData){
    console.log(` ${resData.board[0]} | ${resData.board[1]} | ${resData.board[2]} \t 0 | 1 | 2`);
    console.log('------------ \t------------');
    console.log(` ${resData.board[3]} | ${resData.board[4]} | ${resData.board[5]} \t 3 | 4 | 5`);
    console.log('------------ \t------------');
    console.log(` ${resData.board[6]} | ${resData.board[7]} | ${resData.board[8]} \t 6 | 7 | 8`);
}


function between(min, max) {  
  return Math.floor(
    Math.random() * (max - min) + min
  )
}



//https://stackoverflow.com/questions/60737672/email-regex-pattern-in-nodejs
function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== '' && email.match(emailFormat)) { return true; }
    
    return false;
}



main();