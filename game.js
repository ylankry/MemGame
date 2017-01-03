var MyRows = 6; // number of rows
var MyCols = 5; // number of columns
var tempNum = []; // holds the numbers already chosen and added to the board
var matchArray = []; // array with all found matches
var different = 0; // two pictrue different condition 
var temp1; // first visible tile needs check
var temp2; // second visible tile needs check
var NumChoices = []; // holds the choosen numbers for the board acoording to the size of the board
var won; // winning condition

function createBoard(){
	won = 0; 
	var moves = 0;
	document.getElementById("MyMoves").innerHTML = moves; // show zero moves at start
	var matches = 0;
	document.getElementById("MyMatches").innerHTML = matches; // show zero matches at start
	matchArray = [];
	tempNum = [];
	$("#divMyTable").empty();
	var table = $('<table></table>'); // create the board table
	ChoiceArray(); // choose picture numbers according to number of tiles divided by two
	for(var i=0; i < MyRows; i++)
	{
		var row = $('<tr></tr>');
		for(var j=0; j < MyCols; j++)
		{
			var val = getNumber(); // get a random number from the array of chosen numbers
			var trueNum = parseInt(val, 10);
			var col = $('<td></td>');
			var addDiv = $('<div id="divMypic' + (val) + '"></div>');
			addDiv.addClass('picBackground');
			var addImg = $('<img id="pic' + (val) + '" src ="images/auto' + (trueNum) +'.jpg">');
			addImg.addClass('pic_style');
			addDiv.append(addImg);
			col.append(addDiv);
			row.append(col);
		}
		table.append(row);
	}
	$('#divMyTable').append(table);
	$(".pic_style").hide(); // hide all tiles
	$('.picBackground').click(function() { 
		if($(this).children(0).is(':visible') == false) // if the current tile is not visible 
		{
			if(different == 1) // if two pictures are not equal on the next click of hidden tile
			{				   // both visible pictures will become hidden
				$('#'+temp1).hide();
				$('#'+temp2).hide();
				different = 0;
			}
			if(($('.pic_style:visible').length) - 2*matches < 2) // if less then two tiles are visible
			{													 // not including matches
				$(this).children(0).show(); // show the tile
				moves++;
				document.getElementById("MyMoves").innerHTML = moves; // update moves
			}
			if($('.pic_style:visible').length - 2*matches == 2) // if exactly two tiles are visible
			{													// besides the matches
				var idarray = [];
				$('.pic_style:visible').each(function(){ idarray.push(this.id); }); // put all visible pictures id in an array
				idarray =  checkCurrentMatch(idarray); // return the the two pictures to check their equality
				temp1 = idarray[0]; 
				temp2 = idarray[1];
				var id1 = idarray[0].match(/\d+/)[0]; // get the number of the first id
				var id2 = idarray[1].match(/\d+/)[0]; // get the number of the second id
				
				if(id1 == id2) // check match
				{
					matches++; 
					document.getElementById("MyMatches").innerHTML = matches; //update matches
					matchArray.push(id1); // include match picture number in the match array 
				}
				else
				{
					different = 1; // two pictures are not equal
				}
			}
		}
		if($('.pic_style:visible').length == MyCols*MyRows && won == 0) //check win condition
		{
			setTimeout(WinCondition, 200);
		}
			
	});
	
}

function WinCondition(){ // if won the game alert win
	alert("You Won!");
	won = 1;
}

function checkCurrentMatch(idarray) // get an array of all visible pictures
{									// return the two pictures currently being checked for equality
	var check1;
	var check2;
	for(var i = 0; i < idarray.length; i++)
	{
		for(var j = 0; j < matchArray.length; j++)
		{
			if(i != -1)
				check1 = idarray[i].match(/\d+/)[0];
			check2 = matchArray[j];
			if(check1 == check2)
			{
				idarray.splice(i, 1);
				i--;
			}
		}
	}
	return idarray;
}

function ChoiceArray(){ // return number of choices according to the size of Num
	var Num = (MyCols*MyRows)/2;
	for(var k = 1; k <= Num; k++)
	{
		NumChoices.push(k);
	}
}

function getNumber(){ // returns a random number from the NumChoices array and add to it 'a' or 'b'
					  // so that two pictures will be the same
	var check = 0;
	var index = Math.floor(Math.random()*NumChoices.length);
	var draw = NumChoices[index]; 
		
	for(var i = 0; i < tempNum.length; i++)
	{
		if(draw == tempNum[i])
		{
			draw = draw + 'b';
			check = 1;
			NumChoices.splice(index, 1);
		}
	}
	if(check == 0)
	{
		tempNum.push(draw);
		draw = draw + 'a';
	}
	return draw;
};

$("document").ready(function() {
	
	$("#btnNewGame").click(function(){ // create the board when pressing "new game"
		createBoard();
	});
	
});	


