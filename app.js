/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
// STATE VARIABLE = the condition of a system-- need to remember something or the state -- is the game playing or not playing
*/

var scores, roundScore, activePlayer, gamePlaying, previousRoll;

init();


document.querySelector('.dice').style.display = 'none'; //dice will not show up when opening page

document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';


document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		//1.random number
	//var dice = Math.floor(Math.random() * 6) +1;
	var dice = debugDice();

	//2. display the result
	var diceDOM = document.querySelector('.dice');
	diceDOM.style.display = 'block';
	diceDOM.src = 'dice-' + dice + '.png';
	
	//3. update the round score if the rolled number was not 1
	if(dice !==1) { 		//!== not type coersion
		//add score
		if(previousRoll === 6 && dice === 6){
			previousRoll = 0; 
			scores[activePlayer] = 0;
			document.querySelector('#score-' + activePlayer).textContent = 0;
			nextPlayer();
		
		} else {
			previousRoll = dice;
			roundScore += dice;		//= roundScore = roundScore + dice 
			document.querySelector('#current-' + activePlayer).textContent = roundScore; 
		}
	} else { 
		//next player
		nextPlayer();	
	} 
	}
});

var rollNum = - 1;
function debugDice(){
	rollNum++;
	var rolls = [2, 2, 6, 6, 6];
	if(rollNum < rolls.length){
		return rolls[rollNum];
	} else {
		return Math.floor(Math.random() * 6) +1;
	}
}
	
document.querySelector('.btn-hold').addEventListener('click', function() {
	// add current score to global score
	scores[activePlayer] += roundScore;
	
	// update the UI
	document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
	
	//check if player won the game
	if (scores[activePlayer] >= 100) {
		document.querySelector('#name-' + activePlayer).textContent = 'Winner!'; 
		document.querySelector('.dice').style.display = 'none';
		document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
		document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
		gamePlaying = false;
	} else {
		nextPlayer();
	};
	
	//next player

});

function nextPlayer() {
		activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //turnery opperator //replaces if/else statement
		roundScore = 0;
		previousRoll = 0; 
		
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;
		
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		
		document.querySelector('.dice').style.display = 'none';
		//document.querySelector('.player-0-panel').classList.remove('active'); // = like a toggle.
		//document.querySelector('.player-1-panel').classList.add('active');
}   // annonymous function because it does not have a name (and within the code)

document.querySelector('.btn-new').addEventListener('click', init); 


function init() {
	scores = [0, 0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying= true;
	previousRoll= 0; 
	
	
	document.querySelector('.dice').style.display = 'none'; //dice will not show up when opening page

	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	
	document.querySelector('.player-0-panel').classList.add('active');
}




//document.querySelector('#current-' + activePlayer).textContent = dice;    //willl only set text SETTER

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'+ dice + '</em>' ; //will emphasise through html


//var x = document.querySelector('#score-0').textContent; 		//GETTER to read
//console.log(x);


























