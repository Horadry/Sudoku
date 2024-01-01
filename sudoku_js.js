
// Set beginner values
var numSelected = null;
var cellSelected = null;

var errors = 0;

var ERRORS = 3;

var game_over = 0;

var mycells = null;

var score = 0;
var minus_score = 0;



// Multiple gameboards 'menu card'

var gameboards = [[
	"3-749162-",
    "-41568379",
    "5693274-8",
    "75-6192-4",
    "12378-596",
    "49-253187",
    "9341-6852",
    "675832-41",
    "-12945763"
],[
	"-87491625",
    "24-568379",
    "569327-18",
    "7-8619234",
    "12-7845-6",
    "496-53187",
    "934176-52",
    "-75832941",
    "-12945-63"

],[
	"38-415296",
    "4927-3518",
    "5-6928437",
    "169-843-5",
    "7543968-1",
    "82-157649",
    "27-831964",
    "9-8672153",
    "63154-7-2"
],[
	"89137465-",
    "726158-43",
    "345-29178",
    "479586231",
    "-624-7895",
    "538912-67",
    "91386-724",
    "-8-243519",
    "2547-13-6"
]];

var solutions = [[
	"387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
],[
	"387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"

],[
	"387415296",
    "492763518",
    "516928437",
    "169284375",
    "754396821",
    "823157649",
    "275831964",
    "948672153",
    "631549782"
],[
	"891374652",
    "726158943",
    "345629178",
    "479586231",
    "162437895",
    "538912467",
    "913865724",
    "687243519",
    "254791386"
]];


 

// Gameboard random selection
new_random = Math.floor(Math.random() * 3);
console.log(new_random);
gameboard = gameboards[new_random];
solution = solutions[new_random];

// Create counter for placed numbers
var numcounter = Array(9).fill(0);

// Winner state
var winnerarray = Array(9).fill(9);	
var is_win = false;	
	
	
// Start everything
window.onload = function() {
    setGame();
}

// Timer for counting scores
let start_time = Date.now();



// Buttons open in new tab
function open_github() {
	window.open("https://www.github.com/Horadry/", "_blank").focus();
}

function open_linkedin() {
	
	window.open("https://www.linkedin.com/in/HorvathAdrienn/", "_blank").focus();
}



function setGame() {
	

	// New game button in navbar	
	btn_newgame = document.getElementById("btn_newgame");
	btn_newgame.addEventListener("click", newGame);
	
	// New game button if won
	btn_newgame2 = document.getElementById("btn_newgame2");
	btn_newgame2.addEventListener("click", newGame);
	
	// New game button if lost
	btn_newgame3 = document.getElementById("btn_newgame3");
	btn_newgame3.addEventListener("click", newGame);

	// Background music starts after first click on window
	window.addEventListener("click", event => {
		const main_audio = document.querySelector("audio");
		main_audio.volume = 0.4;
		main_audio.play();
	});

	
	
	// Create digits 1-9 for the digit-picker
	for (let i = 1; i <= 9; i++) {
		//<div id="1" class="number">1</div>
		// Set classname to "number"
		let number = document.createElement("div");
		// Set id and innertext to the created div-s
		number.id = i;
		number.innerText = i;
		number.classList.add("fade-in");
		number.addEventListener("click", selectNumber);
		
		// Add style
		number.classList.add("number");
		// Put "number" class style into "digits" div 
		document.getElementById("digits").appendChild(number);	
	}

	// Create gameboard
	for (let r = 0; r < 9; r++) {
		for (let c = 0; c < 9; c++) {
			// Create 9x9 elements
			let cell = document.createElement("div");
			// Create id from row and column indexes
			cell.id = r.toString() + "-" + c.toString();
			
			// Write innertext into some cells -- according to gameboards array
			if (gameboard[r][c] != "-") {
				cell.innerText = gameboard[r][c];
				// Add style to cells with beginner-innertext
				cell.classList.add("cell-start");
				cell.classList.add("fade-in");
				
				// Count value of digits on gameboard
				numcounter[parseInt(cell.innerText)-1]+=1;			
			}
			
			// Optical separator between 9x9 boxes
			if (r == 2 || r == 5) {
				cell.classList.add("horizontal-line");
			}
			if (c == 2 || c == 5) {
				cell.classList.add("vertical-line");
			}
			
			// Write the selected digit into the gameboard's selected cell
			cell.addEventListener("click", selectcell);

			// Style hierarhcy 
			cell.classList.add("cell");
			document.getElementById("gameboard").append(cell);			
		}
	}
	console.log(numcounter);

}


// Style for digit-picker 
// Add style to selected digit, removes style from previously selected digit
function selectNumber(){
	if (numSelected != null) {
		numSelected.classList.remove("number-selected");
	}

	numSelected = this;
	numSelected.classList.add("number-selected");
	
	// Highlight selected cells
	cell = document.getElementsByClassName("cell");
	for (let i = 0; i<81; i++){
		if (cell[i].innerText != numSelected.id){
			not_selected = cell[i];
			if (not_selected.classList.contains("mycells")){
				not_selected.classList.remove("mycells");
			}
		}
	}

	for (let i = 0; i<81; i++){			
		if (cell[i].innerText == numSelected.id){			
			mycells = cell[i];
			mycells.classList.add("mycells");
		}
			
	}
}


// Write number into gameboard
function selectcell() {
	// Write number into gameboard only if digit is selected
	if (numSelected) {
		if (this.innerText != "") {
			return;
		}
		// Only if the game is not over
		if (game_over == 0){

			// Get cell coordinates from id 
			// "0-0" --> ["0", "0"] 
			let coords = this.id.split("-");
			let r = parseInt(coords[0]);
			let c = parseInt(coords[1]);

			// Place number
			if (solution[r][c] == numSelected.id) {
				this.innerText = numSelected.id;
				this.classList.add("mycells");
				// The number of the digit has increased by 1 
				numcounter[parseInt(this.innerText)-1]+=1;
				console.log(numcounter);
				
				// Correct number sound effect
				var correct_num_sfx = new Audio();
				correct_num_sfx.src = "audio/correct_num.mp3";
				correct_num_sfx.volume = 0.2;
				correct_num_sfx.play();
				

				// Scores
				let placed_time = Date.now();
				cell_time = placed_time - start_time;
				if (cell_time<=10000){
					score+=950;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if (10000<cell_time<=20000){
					score+=500;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(20000<cell_time<=40000){
					score+=300;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(40000<cell_time<=60000){
					score+=200;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(60000<cell_time<=120000){
					score+=180;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(120000<cell_time<=180000){
					score+=175;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(180000<cell_time<=240000){
					score+=170;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(240000<cell_time<=300000){
					score+=160;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(300000<cell_time<=360000){
					score+=150;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(360000<cell_time<=420000){
					score+=125;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(420000<cell_time<=480000){
					score+=100;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(480000<cell_time<=540000){
					score+=75;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else if(540000<cell_time<=600000){
					score+=50;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}else{
					score+=25;
					document.getElementById("gamereport").innerText=String(score)+" XP";
					console.log(score);
				}
				
				
				// Winner music and score
				if (numcounter.every((el, ix) => el === winnerarray[ix])){
					console.log("equal");
					
					unhide = document.getElementById("container_w");
					unhide.classList.add("unhide");
					
					// Start winner music 
					var winner_sfx = new Audio();
					winner_sfx.src = "audio/winner.mp3";
					winner_sfx.volume = 0.4;
					winner_sfx.play();
					
					// Time bonus
					let endTime = Date.now();
					let timeSpan = endTime - start_time;
					console.log("Időmérés eredménye: ", timeSpan);
					let time_bonus = parseInt((1800000-timeSpan)/250);	
					console.log("Time bonus: ", time_bonus);

					// Winner score
					winner_score = score + time_bonus;
					console.log(winner_score);
					document.getElementById("insert_xp").innerText=String(winner_score)+" XP";

				}else{
					// If not every digit is placed, the game continues
					console.log("not equal");
				}
				
				// If one digit has been used at all, the digit dissapears from the digit-picker
				if (numcounter[parseInt(this.innerText)-1] == 9){
					ready_digit = document.getElementById(this.innerText);
					ready_digit.classList.add("ready-digit");
					ready_digit.classList.remove("fade-in");
					
				}
				

				
				
			}
			else {
				// Counting errors if the number is wrong 
				errors += 1;

				
				// Red effect flashes on cell when the number is wrong
				temp_red = this;
				temp_red.classList.add("wrong-number");
				// Wrong number sound effect
				if (errors != 3){
					var heart_minus_sfx = new Audio();
					heart_minus_sfx.src = "audio/heart_minus.mp3";
					heart_minus_sfx.volume = 0.1;
					heart_minus_sfx.play();
				}
				setTimeout(function() {
					temp_red.classList.remove("wrong-number");
				}, 300);

				
				
				// Decrease number of hearts
				if (errors == 1){
					document.getElementById("heartsimg").src="img/2_heart.png";
					score_minus = 1500;
					if (score > score_minus){
						score-=score_minus;
						
					}else{
						score = 0;
					}
					document.getElementById("gamereport").innerText=String(score)+" XP";
				}else if (errors == 2){
					document.getElementById("heartsimg").src="img/1_heart.png"
					score_minus = 3200;
					if (score > score_minus){
						score-=score_minus;
					}else{
						score = 0;
					}
					document.getElementById("gamereport").innerText=String(score)+" XP";
				}else if(errors == 3){
					document.getElementById("heartsimg").src="img/0_heart.png"
					document.getElementById("gamereport").innerText="GAME OVER!";

					// Looser sound effect
					var lost_sfx = new Audio();
					lost_sfx.src = "audio/lost.mp3";
					lost_sfx.volume = 0.3;
					lost_sfx.play();
					
					// Measure time
					let endTime = Date.now();
					
					// Looser window appears
					unhide = document.getElementById("container_l");
					
					
					unhide.classList.add("unhide");
					game_over = 1;
					gameboard = document.getElementById("gameboard");
					gameboard.classList.add("fade-out");
					digits = document.getElementById("digits");
					digits.classList.add("fade-out");
					navbar = document.getElementById("navbar");
					navbar.classList.add("fade-out");

					
				}else{
					document.getElementById("heartsimg").src="img/3_heart.png"
					
				}
			}
		}
	}		
}


// New game
function newGame(){
	window.location.reload();	
}

// Game over
function gameOver(){
	game_over = 1;
}
