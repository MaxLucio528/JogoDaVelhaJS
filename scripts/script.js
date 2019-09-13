/*
    FT - FACULDADE DE TECNOLOGIA DA UNICAMP

    Nome: Max Lucio Martins de Assis

    Site: Jogo da Velha com JavaScript
*/

// Função que troca o CSS da página para um Modo Escuro ou Claro
function modoTela(nomeId){
    /*  
        É verificado o modo da página a partir do texto exibido para o usuário na página. 
        Se o texto estiver Modo Escuro, a página é trocada para o modo escuro e o texto é
        trocado para Modo Claro.
        Se o texto estiver Modo Claro, a página é trocada para o modo claro e o texto é
        trocado para Modo Escuro. 
    */
    if(document.getElementById(nomeId).innerHTML === "Modo Escuro " + String.fromCodePoint(0x263E)){
        document.getElementById("stylesheet").href = "stylesheets/dark.css";
        document.getElementById(nomeId).innerHTML = "Modo Claro " + String.fromCodePoint(0x2609);
    }else{
        document.getElementById("stylesheet").href = "stylesheets/light.css";
        document.getElementById(nomeId).innerHTML = "Modo Escuro " + String.fromCodePoint(0x263E);
    }
}

// Variáveis globais que indicam de quem é a vez no jogo e o vencedor.
var vez = 1;
var vencedor = "";

// Função que verificará se três casas são iguais ou não, indicando se há ou não um vencedor.
function casasIguais(a, b, c){
    if((a == b) && (b == c) && (a != "")){
        if(a == "X")
            vencedor = "Jogador 1";
        else
            vencedor = "Jogador 2";

        return true;
    }else{
        return false;
    }
}

// Função que verifica o estado atual do jogo.
function statusJogo(){
    // Este array deixa salvo o estado de todas as casas no momento em que esta função foi chamada.
    var casas = new Array(9);

    // Laço que salva as casas no array
    for(var i = 0; i < 9; i++){
        casas[i] = document.getElementById("casa" + (i+1)).innerHTML;
    }

    /*  
        Este if verifica se alguma dessas funções retorna true, se isso ocorrer
        há um vencedor para o jogo, é mandada para a função casasIguais o que consta
        em três casas que se iguais ocasionariam na vitória de um jogador.
    */
    if( casasIguais(casas[0], casas[1], casas[2]) || casasIguais(casas[3], casas[4], casas[5]) || 
        casasIguais(casas[6], casas[7], casas[8]) || casasIguais(casas[0], casas[3], casas[6]) || 
        casasIguais(casas[1], casas[4], casas[7]) || casasIguais(casas[2], casas[5], casas[8]) ||
        casasIguais(casas[0], casas[4], casas[8]) || casasIguais(casas[2], casas[4], casas[6])
    ){
        /*
            Aqui é trocado o conteúdo do parágrafo de status do jogo para indicar quem venceu
            e também, o botão de jogar volta a aparecer e exibe a opção de jogar novamente. 
        */
        document.getElementById("status").innerHTML = "O " + vencedor + " venceu!";
        document.getElementById("play").innerHTML = "Jogar Novamente";
        document.getElementById("play").disabled = false;
        document.getElementById("play").style.display = "block";
    }

    /* 
        Condição que verifica se houve empate, se isso ocorrer ele troca o conteúdo do
        parágrafo de ID status e também volta a mostrar o botão que agora mostra a opção
        de jogar novamente, que atualiza a página.
    */
    if(casas.indexOf("") === -1){
        document.getElementById("status").innerHTML = "O jogo empatou!";
        document.getElementById("play").innerHTML = "Jogar Novamente";
        document.getElementById("play").disabled = false;
        document.getElementById("play").style.display = "block";
    }
}

// Função que libera o início do jogo
function start(){
    // Condição que reinicia a página para jogar novamente após o fim do jogo
    if(document.getElementById("play").innerHTML === "Jogar Novamente")
        location.reload();

    /*
        Aqui o botão é desabilitado e ele desaparece, para então ser exibida
        na página que é a vez do primeiro jogador.
    */
    document.getElementById("play").disabled = true;
    document.getElementById("play").style.display = "none";
    document.getElementById("status").innerHTML = "É a vez do jogador " + vez + "!"
}

// Função que inicia o processo para marcar o X ou O no tabuleiro
function jogar(idCasa){
    // Se o botão de jogar estiver desativado, ele libera o tabuleiro
    if(document.getElementById("play").disabled === true){
        // Verificando se a casa clicada está vazia para preenchê-la
        if(document.getElementById(idCasa).innerHTML == ""){
            // Verificando de quem é a vez quando a casa foi clicada
            if(vez === 1){
                // Ajustando a casa clicada para manter-se no padrão de estilo
                document.getElementById(idCasa).style.padding = "30px";
                document.getElementById(idCasa).style.paddingTop = "22px";
                document.getElementById(idCasa).style.paddingBottom = "22px";
                // Passando a vez para o próximo jogador
                vez = 2;
                document.getElementById("status").innerHTML = "É a vez do jogador " + vez + "!";
                document.getElementById(idCasa).innerHTML = "X";
            }else{
                // Ajustando a casa clicada para manter-se no padrão de estilo
                document.getElementById(idCasa).style.padding = "30px";
                document.getElementById(idCasa).style.paddingTop = "22px";
                document.getElementById(idCasa).style.paddingBottom = "22px";
                // Passando a vez para o próximo jogador
                vez = 1;
                document.getElementById("status").innerHTML = "É a vez do jogador " + vez + "!";
                document.getElementById(idCasa).innerHTML = "O";
            }
    
            // Chamando a função que verifica o status do jogo, vendo se alguém ganhou.
            statusJogo();
        }
    }
}
