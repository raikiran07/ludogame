'use strict';
//selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
//trying to select the player
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
let activePlayer = 0;


//for playing audio file
var changePlayer = new Audio("playerchange.mp3");
var win = new Audio("won.mp3");
var roll = new Audio('roll.mp3');
var background = new Audio("background.mp3");
var collect = new Audio("collect.mp3");
var hold = new Audio("hold.mp3");

var clickNew = new Audio("click.mp3");

//state variable
let playing = true;

//background.play();
//scores of the players
let score = [0,0];

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
const diceEl = document.querySelector(".dice");
//playing the background music



//start function
const startGame = function(){
    
     score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
    
    player0El.classList.remove("player--winner");
    player1El.classList.remove("player--winner");
    
    player0El.classList.add("player--active");
    player1El.classList.remove("player--active");
    
    diceEl.classList.add("hidden");
    activePlayer = 0;
    playing = true;
    
    currentScore = 0;
    
    score = [0,0];
    
    diceEl.classList.add("hidden");
  background.play();

    
    
}
//starting the game
startGame();


//switching the active player
const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
        currentScore = 0;
        player0El.classList.toggle("player--active");
        player1El.classList.toggle("player--active");
        activePlayer = activePlayer === 0 ? 1 : 0;
}


//Rolling dice functionality
btnRoll.addEventListener("click",function(){
    if(playing){
        //1.generating a random dice roll
  background.play();
    const dice = Math.trunc(Math.random()*6)+1;
    
    //2.display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    roll.play();
    
    //playing the sound instantly
    roll.currentTime=0;
    //3.check for the roll dice 1
    if(dice!==1){
        //add dice to the current score
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        
    }
    else{
        //switch the player
        roll.pause();
        changePlayer.play();
        changePlayer.currentTime = 0;
//        document.getElementById(`current--${activePlayer}`).textContent = 0;
//        currentScore = 0;
//        player0El.classList.toggle("player--active");
//        player1El.classList.toggle("player--active");
//        activePlayer = activePlayer === 0 ? 1 : 0;
        switchPlayer();
        
        
       
        
    }
    

    
    }
    
});

btnHold.addEventListener("click",function(){
    
  if(playing){
//      collect.play();
//      currentTime=0;
       //1.add current score to the active player main score
    hold.play();
    hold.currentTime = 0;
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];
    console.log(score[activePlayer]);
    
   //2.check whether main score is atleat 100
    if(score[activePlayer]>=20){
        //Finish the game
        background.pause();
        win.play();
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        diceEl.classList.add("hidden");
        
    }
    else{
        
//        collect.currentTime = 0;
        
        switchPlayer();
    }
   
    
    //if yes, finish the game with winner as the active player
    
    
    //if No, switch the active player
    
  }
        
    
    

})


////new game button functionality
//btnNew.addEventListener("click",function(){
//console.log(activePlayer);
//score0El.textContent = 0;
//score1El.textContent = 0;
//currentScore = 0;
//diceEl.classList.add("hidden");
//document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
//
//    
//})
//
//
btnNew.addEventListener("click",function(){
    //starting score of players = 0
    clickNew.play();
    
    
   startGame();
   
    
})



