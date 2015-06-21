playGame(elements);
var elements = [["Hydrogen", "H", 1.01, 1, "nonmetal", 1, 0, 0],
				["Oxygen", "O", 16.00, 8, "nonmetal", 2, 2, 0], 
				["Carbon", "C", 12.01, 6, "nonmetal", 2, 2, 0], 
				["Nitrogen", "N", 1.01, 7, "nonmetal", 2, 2, 0], 
				["Helium", "He", 1.01, 2, "nonmetal", 1, 0, 0]];
var elems;
var playGame = function(elements){
	elems = [new Elem(elements[0]), new Elem(elements[1]), new Elem(elements[2]), new Elem(elements[3]), new Elem(elements[4])];
	var numqs = prompt("How many times do you want to be quizzed?");
	var maxScore = numqs * 3;
	var score = 0;
	while(numqs-- > 0){
		score += quiz(Math.floor(Math.random() * elements.length));
	}
	console.log("You earned a total score of " + score + " out of a max score of " + maxScore);
}

var quiz = function(e){
	console.log("Your element is : " + e.name + "(" + e.abbr + ") with mass: " + e.mass);
	score += (prompt("What is this element's proton count?") === e.protons) ? 1 : 0;
	score += (prompt("What group does this electron fall under\na)nonmetal\nb)metal\nc)metalloid") === e.group) ? 1 : 0;
	score += (prompt("How many electron shells does this element fill(fully or partially)") === e.shellcount) ? 1 : 0;
	score += (prompt("How electronegative is this element? 0 = low\n1 = medium\n2 = high") === e.electroneg) ? 1 : 0;
	score += (prompt("Does this element occur naturally? Enter 0 if it does, or 1 otherwise") === e.natural) ? 1 : 0;
	console.log("You earned: " + score + " points for this element!");
}

function Elem(arr){
	this.name = arr[0];
	this.abbr = arr[1];
	this.mass = arr[2];
	this.protons = arr[3];
	this.group = arr[4];
	this.shellcount = arr[5];
	this.electroneg = arr[6];
	this.natural = arr[7];
}