"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 11
   Review Assignment

   Author: Noah Schatz
   Date:   02/27/26

   Global Variables
   ================
   
   allCells
      References the TD cells within the Hitori table grid.   
      
   Function List
   =============

   startUp()
      Run when the web page is loaded; displays puzzle 1
      and loads the event handlers for the web page buttons.
      
   setupPuzzle()
      Sets up a new puzzle, adding the event handlers for
      every puzzle cell.      

   switchPuzzle(e)
      Swaps one puzzle for another based on the button being clicked
      by the user. Confirms the change before swapping in the
      new puzzle.

   findErrors()
      Highlights the errors in the Hitori puzzle in a red font.
      
   showSolution()
      Shows the solution to the Hitori puzzle
    
   checkSolution()
      Checks the current user's puzzle to verify whether it contains
      the complete and correct solution.

   drawHitori(numbers, blocks, rating)
      Returns a text string of the HTML code to
      display a Hitori puzzle table based on the contents of
      the numbers, blocks, and rating parameters.
	
*/

// Declares the global allCells variable, used to store an array of the puzzle cells
let allCells;

window.onload = startUp;

// Runs the startUp() function when the page is loaded by the browser
function startUp() {
document.getElementById("puzzleTitle").innerHTML = "Puzzle 1";
   document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);

// Adds an event handler to each button when the button is clicked
let puzzleButtons = document.getElementsByClassName("puzzles");
for (let puzzleButton of puzzleButtons) {
   puzzleButton.addEventListener('click', switchPuzzle);
}

// Calls the setupPuzzle() function that defines the initial appearance of the first puzzle

setupPuzzle();

document.getElementById("check").addEventListener('click', findErrors);
document.getElementById("solve").addEventListener('click', showSolution);
}

   function switchPuzzle(e) {
   if (confirm("You will lose all of your work on the puzzle! Continue?")) {
   const puzzleID = e.target.id;
   document.getElementById("puzzleTitle").innerHTML = e.target.value;

      switch (puzzleID) {
   case "puzzle1":
      document.getElementById("puzzle").innerHTML = drawHitori(hitori1Numbers, hitori1Blocks, hitori1Rating);
      setupPuzzle();
      break;
     case "puzzle2":
      document.getElementById("puzzle").innerHTML = drawHitori(hitori2Numbers, hitori2Blocks, hitori2Rating);
      setupPuzzle();
      break;
   case "puzzle3":
      document.getElementById("puzzle").innerHTML = drawHitori(hitori3Numbers, hitori3Blocks, hitori3Rating);
       setupPuzzle();
      break;
   }
   }
}

function setupPuzzle() {
   allCells = document.querySelectorAll("td");

   // Set puzzle tiles to default
   allCells.forEach((cell) => {
      cell.style.backgroundColor = 'white';
      cell.style.color = 'black';
      cell.style.borderRadius = '0';

      // Detects if user clicks tile while pressing keys
      cell.addEventListener('mousedown', (e) => {
         if (e.shiftKey) {
            cell.style.backgroundColor = 'white';
            cell.style.color = 'black';
            cell.style.borderRadius = '0';
         } else if (e.altKey) {
            cell.style.backgroundColor = 'black';
            cell.style.color = 'white';
            cell.style.borderRadius = '0';
         } else {
            cell.style.backgroundColor = 'rgb(101, 101, 101)';
            cell.style.color = 'white';
            cell.style.borderRadius = '50%';
         }

         e.preventDefault();
      })

      // Change cursor based off key

      cell.addEventListener('mouseover', (e) => {
         if (e.shiftKey) {
            cell.style.cursor = 'url(./img/jpf_eraser.png), alias';
         } else if (e.altKey) {
            cell.style.cursor = 'url(./img/jpf_block.png), cell';
         } else {
            cell.style.cursor = 'url(./img/jpf_circle.png), pointer';
         }
      })

      // Check if puzzle corrent
      cell.addEventListener('mouseup', checkSolution);
   })
}

function findErrors() {
   allCells.forEach((cell) => {
      if ((cell.className === 'blocks' && cell.style.backgroundColor === 'rgb(101, 101, 101)') || (cell.className === 'circles' && cell.style.backgroundColor === 'black')) {
         cell.style.color = 'red';
      }
   })

   // Change font color after 1 second
   setTimeout(() => {
      allCells.forEach((cell) => {
         if (cell.style.color === 'red') cell.style.color = 'white';
      })
   }, 1000)
}




         
/* ================================================================= */

function checkSolution() {
   /* Set the initial solved state of the puzzle to true */
   let solved = true;

   /* Loop through the puzzle cells, exiting when an incorrect
      cell is found, setting the solved variable to false */

   for (let i = 0; i < allCells.length; i++) {
      const cellColor = allCells[i].style.backgroundColor;
      const cellClass = allCells[i].className;

      /* A cell is incorrect if it is in the block class and is not black
         or in the circle class and is not white */
      if ((cellClass === "blocks" && cellColor !== "rgb(0, 0, 0)") || 
           (cellClass === "circles" && cellColor !== "rgb(101, 101, 101)")) {
         solved = false;
         break;
      }
   }

   /* If solved is still true after the loop, display an alert box */
   if (solved) alert("Congratulations! You solved the puzzle!");
}

function showSolution() {
   for (let i = 0; i < allCells.length; i++) {
      allCells[i].style.color = "";
      allCells[i].style.backgroundColor = "";
      allCells[i].style.borderRadius = "";
   }
}

function drawHitori(numbers, blocks, rating) {

   /* Initial HTML String for the Hitori Puzzle */
   let htmlString;

   /* numbers is a multidimensional array containing the
      Hitori numbers; blocks is a corresponding 
      multidimensional array containing the location of the
      blocks which are indicated by the # character.
      Non-blocking cells are indicated by a blank character.
  */

   /* Create a Web table with the id, hitoriGrid, containing
      the numeric values. Blocks cells have the class name,
      blocks. Non-blocking cells have the class name, circles
  */

   const totalRows = numbers.length;
   const totalCols = numbers[0].length;
   htmlString = "<table id='hitoriGrid'>";
   htmlString += "<caption>" + rating + "</caption>";
   

   for (let i = 0; i < totalRows; i++) {
      htmlString += "<tr>";

      for (let j = 0; j < totalCols; j++) {
         if (blocks[i][j] === "#") htmlString += "<td  class='blocks'>"
         else htmlString += "<td class='circles'>";

         htmlString += numbers[i][j];
         htmlString += "</td>";
      }

      htmlString += "</tr>";
   }

   htmlString += "</table>";

   return htmlString;
}