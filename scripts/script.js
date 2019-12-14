/*
 *  JogoDaVelhaJS
 *  CONTRIBUITORS:
 *  -> Max Lucio Martins de Assis (GitHub - MaxLucio528)
 * 
 *  PURPOSE: This project is a simple website that has the famous "Jogo da Velha" implemented
 *  with JavaScript, it comes with a Dark Mode as well to play at night. It's compatible with
 *  (probably) any web browser.
 */

// This function switch between the Dark and Light Mode on the page.
function modoTela(nomeId){
    /*
     *  The mode of the page is verified from the text exhibited to the user on the page.
     *  
     *  If the text equals Dark Mode, the page is swithed to the Dark Mode and the text is
     *  switched to Light Mode.
     * 
     *  If the text equals Light Mode, the page is switched to Light Mode and the text is
     *  switched to Dark Mode.
     */
    if(document.getElementById(nomeId).innerHTML === "Dark Mode " + String.fromCodePoint(0x263E)){
        document.getElementById("stylesheet").href = "stylesheets/dark.css";
        document.getElementById(nomeId).innerHTML = "Light Mode " + String.fromCodePoint(0x2609);
    }else{
        document.getElementById("stylesheet").href = "stylesheets/light.css";
        document.getElementById(nomeId).innerHTML = "Dark Mode " + String.fromCodePoint(0x263E);
    }
}

// Indicate who's turn is in the game and the winner respectively.
var vez = 1;
var vencedor = "";

// Verifies if three houses on the board are equal or not, indicating if there's a winner or not.
function casasIguais(a, b, c){
    if((a == b) && (b == c) && (a != "")){
        if(a == "X")
            vencedor = "Player 1";
        else
            vencedor = "Player 2";

        return true;
    }else{
        return false;
    }
}

// Verifies the actual state of the game.
function statusJogo(){
    // Saves the state of all the board houses in the moment this funcion was called.
    var casas = new Array(9);

    // This loop saves the board houses in the array.
    for(var i = 0; i < 9; i++){
        casas[i] = document.getElementById("casa" + (i+1)).innerHTML;
    }

    /*
     *  This if summons the function "casasIguais" is all possible situations where a winner can
     *  appear, if any of those conditions are met, there's a winner.
     */
    if( casasIguais(casas[0], casas[1], casas[2]) || casasIguais(casas[3], casas[4], casas[5]) || 
        casasIguais(casas[6], casas[7], casas[8]) || casasIguais(casas[0], casas[3], casas[6]) || 
        casasIguais(casas[1], casas[4], casas[7]) || casasIguais(casas[2], casas[5], casas[8]) ||
        casasIguais(casas[0], casas[4], casas[8]) || casasIguais(casas[2], casas[4], casas[6])
    ){
        /*
         *  The content of the paragraph of the game status is switched to indicate who win
         *  and, the play button reappears and shows the option to play again.
         */
        document.getElementById("status").innerHTML = "The " + vencedor + " won!";
        document.getElementById("play").innerHTML = "Play Again";
        document.getElementById("play").disabled = false;
        document.getElementById("play").style.display = "block";
    }

    /*
     *  Switches the content of the paragraph of the game status to indicate that a draw
     *  happened and, the play button reappears and shows the option to play again.
     */
    if(casas.indexOf("") === -1){
        document.getElementById("status").innerHTML = "It's a draw!";
        document.getElementById("play").innerHTML = "Play Again";
        document.getElementById("play").disabled = false;
        document.getElementById("play").style.display = "block";
    }
}

// Unlock the game start.
function start(){
    // Refresh the page to play again after the game is finished.
    if(document.getElementById("play").innerHTML === "Play Again")
        location.reload();

    /*
     *  Here the button is disabled and he disappear, to then show on the
     *  page that it's the first player turn.
     */
    document.getElementById("play").disabled = true;
    document.getElementById("play").style.display = "none";
    document.getElementById("status").innerHTML = "It's " + vez + " turn!"
}

// Start the process to mark X or O in the board.
function jogar(idCasa){
    // If the button to play is disabled, he unlocks the board.
    if(document.getElementById("play").disabled === true){
        // Checking if the board house clicked is empty to fill it.
        if(document.getElementById(idCasa).innerHTML == ""){
            // Checking who's turn is when the board house was clicked.
            if(vez === 1){
                // Adjusting the clicked house to keep the symmetry.
                document.getElementById(idCasa).style.padding = "30px";
                document.getElementById(idCasa).style.paddingTop = "22px";
                document.getElementById(idCasa).style.paddingBottom = "22px";
                // Passing the turn to the next player.
                vez = 2;
                document.getElementById("status").innerHTML = "It's " + vez + " turn!";
                document.getElementById(idCasa).innerHTML = "X";
            }else{
                // Adjusting the clicked house to keep the symmetry.
                document.getElementById(idCasa).style.padding = "30px";
                document.getElementById(idCasa).style.paddingTop = "22px";
                document.getElementById(idCasa).style.paddingBottom = "22px";
                // Passing the turn to the next player.
                vez = 1;
                document.getElementById("status").innerHTML = "It's " + vez + " turn!";
                document.getElementById(idCasa).innerHTML = "O";
            }
            
            // Calling the function that verifies the game status, to see if someone won.
            statusJogo();
        }
    }
}
