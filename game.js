var MyRows = 5;
var MyCols = 6;
var uniqueRandoms = [];

function populateArray()
{
	for(var i = 1; i < 16; i++)
		uniqueRandoms.push(i);
	for(var x = 1; x < 16; x++)
		uniqueRandoms.push(x);
}
		
function createBoard(){
	var moves = 0;
	var matches = 0;
	$("#divMyTable").empty();
	populateArray();
	var table = $('<table></table>');
	for(var i=0; i < MyRows; i++)
	{
		var row = $('<tr></tr>');
		for(var j=0; j < MyCols; j++)
		{
			var val = getNumber();		
			var col = $('<td></td>');
			var addDiv = $('<div id="divMypic' + (val) + '"></div>');
			addDiv.addClass('picBackground');
			var addImg = $('<img id="pic' + (val) + '" src ="images/auto' + (val) +'.jpg">');
			addImg.addClass('pic_style');
			addDiv.append(addImg);
			col.append(addDiv);
			row.append(col);
		}
		table.append(row);
	}
	$('#divMyTable').append(table);
	$(".pic_style").hide();
	$('.picBackground').click(function() {
		if(($('.pic_style:visible').length) - matches < 2)
		{
			if($(this).children(0).is(':visible') == false )
			{
				$(this).children(0).show();
				moves++;
			}
				
		}
		else if($('.pic_style:visible').length == 2 && $(this).children(0).is(':visible') == false )
		{
			//var x = document.getElementById("debug");
			var idarray = [];
			$('.pic_style:visible').each(function(){ idarray.push(this.id); });
			var id1 = idarray[0];
			var id2 = idarray[1];
			if(id1 != id2)
			{
				$('#'+id1).hide();
				$('#'+id2).hide();
			}
			else
				matches++;
			$(this).children(0).show();
			moves++;
		}
	});
	
	uniqueRandoms = [];
}

function init(){
	
	
}

function getNumber() {
    if (uniqueRandoms.length == 0) {
        throw "No numbers left";
    }
    var index = Math.floor(uniqueRandoms.length * Math.random());
    var drawn = uniqueRandoms.splice(index, 1);
    return drawn[0];
};

$("document").ready(function() {
	
	$("#btnNewGame").click(function(){
		createBoard();
	});
});	


