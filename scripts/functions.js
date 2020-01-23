/* ToDo:
- Finish stylizing ui
- Send to dad
*/

var currCell_x = 0;
var currCell_y = 0;

$(document).ready(function(e) {

    $(".blank").click(function(e) {
        var oTable = document.getElementsByClassName('grid')[0].getElementsByTagName("tbody")[0];
        oTable.rows[currCell_y].cells[currCell_x].style.backgroundColor = "white";
        currCell_x = e.target.cellIndex;
        currCell_y = e.target.parentNode.id;
        oTable.rows[currCell_y].cells[currCell_x].style.backgroundColor = "lightgrey";
    });

    $(".gwt-MenuItem").click(function(e) {
        if(e.target.innerHTML == "Clear") {
            clear_board();
        } else if(e.target.innerHTML == "Solve") {
            var board = build_board();
            console.log(solve_board(board));
            console.log(board);
            inject_board(board);
        } else if(e.target.innerHTML == "Help") {
            alert("How to Use:\nClick a cell and enter a digit.\nUse arrow keys to navigate as well.\nIf you enter a number in the wrong cell, replace with a 0 to empty it.\nOnce you have all numbers entered, press solve to solve the puzzle.\nPress the Clear button to empty the board.");
        }
    });
});

document.addEventListener('keydown', function(event) {
    var oTable = document.getElementsByClassName('grid')[0].getElementsByTagName("tbody")[0];
    oTable.rows[currCell_y].cells[currCell_x].style.backgroundColor = "white";
    var val = String.fromCharCode(event.keyCode);
    if(currCell_x >= 0 && currCell_x <= 8 && currCell_y >= 0 && currCell_y <= 8) {
        if(!isNaN(parseInt(val))) {
            oTable.rows[currCell_y].cells[currCell_x].innerHTML = parseInt(val);
        } else if(event.keyCode == 37 && currCell_x > 0) {
            currCell_x--;
        } else if(event.keyCode == 38 && currCell_y > 0) {
            currCell_y--;
        } else if(event.keyCode == 39 && currCell_x < 9) {
            currCell_x++;
        } else if(event.keyCode == 40 && currCell_y < 9) {
            currCell_y++;
        }
    }
    oTable.rows[currCell_y].cells[currCell_x].style.backgroundColor = "lightgrey";
});

function build_board() {

    var grid = [];
    var oTable = document.getElementsByClassName('grid')[0].getElementsByTagName("tbody")[0];
    var rowLength = oTable.rows.length;
  
    for (i = 0; i < rowLength; i++){

        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        var row = [];

        for(var j = 0; j < cellLength; j++){

            var cellVal = oCells.item(j).innerHTML;
            if(cellVal !== "&nbsp;") {
                row.push(parseInt(cellVal));
            } else {
                row.push(0);
            }
        }
        grid.push(row);
    }

    return grid;
}

function clear_board() {
    var oTable = document.getElementsByClassName('grid')[0].getElementsByTagName("tbody")[0];
    var rowLength = oTable.rows.length;
  
    for (i = 0; i < rowLength; i++){

        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;

        for(var j = 0; j < cellLength; j++){

            oCells.item(j).innerHTML = "&nbsp;";
        }
    }
}

function inject_board(board) {
    var oTable = document.getElementsByClassName('grid')[0].getElementsByTagName("tbody")[0];
    var rowLength = oTable.rows.length;
  
    for (i = 0; i < rowLength; i++){

        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;

        for(var j = 0; j < cellLength; j++){

            oCells.item(j).innerHTML = board[i][j];
        }
    }
}
