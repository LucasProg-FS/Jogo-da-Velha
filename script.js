
//CRIA UMA NODELIST COM TODOS OS ITENS PRESENTES DENTRO DA DIV COM CLASSE buttonsOfPlay
const boardRegions = document.querySelectorAll('.buttonsOfPlay button')

// CRIAÇÃO DE UM ARRAY QUE SERVIRÁ COMO BASE PRA ANALISAR SE ALGUEM VENCEU
let vBoard = []
// VARIAVEL DO TIPO LET QUE SERA MODIFICADA A CADA JOGADA PRA MOSTRAR O JOGADOR DA VEZ
let turnPlayer = ''

// FUNÇAO RESPONSAVEL POR ATUALIZAR O JOGADOR DA VEZ
function updateTitle() {
  // VARIAVEL QUE RECEBE O ID DO INPUT DO JOGADOR DA VEZ
  const playerInput = document.getElementById(turnPlayer)
  // ADICIONA AO SPAN QUE MOSTRA O JOGADOR DA VEZ O VALOR DO INPUT QUE FOI CHAMADO, OU SEJA, O JOGADOR DA VEZ
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
  // ZERA O ARRAY RESPONSAVEL POR IDENTIFICAR O RESULTADO DA PARTIDA
  vBoard = [['','',''], ['','',''], ['','','']]
  // COMEÇA ATRIBUINDO A VARIAVEL DO JOGADOR DA VEZ AO INPUT QUE POSSUI O ID PLAYER1
  turnPlayer = 'player1'
  //ADICIONA O NOME INICIAR DENTRO DO BOTAO DE START TODA VEZ QUE ESSA FUNÇÃO FOR CHAMADA
  document.getElementById('startGame').innerText = 'INICIAR'
  //ADICIONA UMA LINHA DE CODIGO HTML QUE SERA MOSTRADA DURANTE TODA A PARTIDA
  // SEMPRE QUE ALGUEM VENCER OU O JOGO DER EMPATE, ESSA LINHA SERA ALTERADA
  //PORTANTO DEVE-SE ATRIBUIR SEMPRE QUE ESSA FUNÇÃO FOR CHAMADA ESSA LINHA HTML
  document.querySelector('h2').innerHTML = 'Vez do Jogador: <span id="turnPlayer"></span>'
  //ATUALIZA O NOME DA VEZ, RETORNANDO AO INICIAL OU INCIANDO COM O JOGADOR 1
  updateTitle()
  // REAGE A CADA ELEMENTO DENTRO DA NODELIST QUE POSSUI TODOS OS BOTOES DA JOGO DA SEGUNTE FORMA: 
  // -REMOVE A CLASSE WIN QUE REPRESENTA A AREA DE VITORIA DO JOGO
  // -REMOVE O TEXTO DE DENTRO DO BOTAO
  // -READICIONA A CLASSE cursoBtn QUE PERMITE A REGIAO SER "CLICAVEL NOVAMENTE"
  // -ADICIONA A CADA BOTAO UM EVENTO QUE AO SER CLICADO CHAMA A FUNÇAO handleBoardCLick
  boardRegions.forEach(function (element) {
    element.classList.remove('win')
    element.innerText = ''
    element.classList.add('cursorBtn')
    element.addEventListener('click', handleBoardClick)
  })
}

function getWinRegions() {
  // ESSA FUNÇAO SO IRA RETORNAR UM ARRAY SE QUALQUER UM DOS IF ESTIVER 10% DE ACORDO
  // NELA ESTA TODAS AS POSIBILIDADES PARA ALGUEM VENCER A PARTIDA
  // CASO ENTRE EM ALGUMA DAS CONDIÇOES, IRA ADICIONAR AO ARRAY ABAIXO OS ELEMENTOS QUE CONDIZEM COM
  // O data-region DAQUELES BOTOES QUE FICARAM EM SEQUENCIA
  const winRegions = []
  if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions

}

//FUNÇÃO RESPONSAVEL POR REMOVER A CLASSE cursorBtn, O QUAL PERMITE UM CURSOR POINTER SER MOSTRADO
// E TAMBEM REMOVE O EVENTO  DE  CLICK QUE CHAMA A FUNCAO handleBoardClick
// DESSA FORMA, APOS O BOTAO SER CLICADO PARA COLOCAR X OU O, ESSAS AÇOES SERÃO REMOVIDAS
// E NAO TERA MAIS COMO REAGIR COM AQUELE  BOTAO ATE O JOGO SER REINICIADO 
function disableRegion(element) {
  element.classList.remove('cursorBtn')
  element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions) {
  //PARA CADA ELEMENTO QUE POSSUI O DATA-REGION COM O VALOR ASSOCIADO AO DADOS QUE FORAM FORNECIDOS
  // APOS A FUNÇAO getWinRegions RETORNAR UM ARRAY COM OS ELEMENTOS DA VITORIA, UMA CLASSE win QUE 
  // ALTERA A COR DE FUNDO DO ELEMENTO
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win')
  })
  // RECEBE O VALOR DO INPUT DO JOGADOR VITORIOSO
  const player = document.getElementById(turnPlayer).value
  //ATRIBUI O TITULO O NOME DO JOGADOR INFORMANDO QUE ELE VENCEU
  document.querySelector('h2').innerHTML = player + ' Venceu!'
  //ATRIBUI AO BOTAO DE INICIAR O JOGO O TEXTO 'REINICIAR'
  document.getElementById('startGame').innerText = "REINICIAR"

  // PARA CADA ELEMENTO DA NODELIST, ELE REMOVE TODAS AS AÇOES ATRELADAS A ELA
  // DESSA FORMA, MESMO APOS VENCER SEM COMPLETAR TODO O TABULEIRO, AS DEMAIS CAIXAS NAO PDOERAO SER CLICADAS
  // E NEM SERA MOSTRADA UM CURSOR BTN
  boardRegions.forEach(function (element) {
    element.removeEventListener('click', handleBoardClick)
    element.classList.remove('cursorBtn')
  })
}


function handleBoardClick(ev) {
  // BUTTON QUE ATIVOU O EVENTO
  button = ev.currentTarget
  //VARIAVEL QUE ATRIBUI O data-region DO BOTAO QUE ATIVOU O EVENTO
  const region = button.dataset.region
  //CRIA UM ARRAY A PARTIR DE UMA STRING, DIVIDINDO CADA ELEMENTO A PARTIR DO '.'
  const rowColumnPair = region.split('.')
  // VARIAVEL QUE RECEBE A LINHA DAQUELE BOTAO 
  const row = rowColumnPair[0]
  // VARIAVEL QUE RECEBE A COlUNA DAQUELE BOTAO 
  const column = rowColumnPair[1]

  
  if (turnPlayer === 'player1')  {
    //ADICIONA X AO BUTTON CLICADO 
    button.innerText = 'X'
    //ADICIONA NA POSIÇÃO [ROW][COLUMN] DO ARRAY PRINCIPAL 'vBoard' O ELEMENTO ATRELADO AO PLAYER1
    vBoard[row][column] = 'X'
  } else {
    // CASO NAO SEJA PLAYER1, ELE FAZ AS MESMAS COISAS SO QUE ADICIONA O ELEMENTO ATRELADO AO PLAYER2, NO CASO: 'O'
    button.innerText = 'O'
    vBoard[row][column] = 'O'
  }

  console.clear()
  console.table(vBoard)

  //DESATIVA A REGIAO QUE FOI CLICADA, TIRANDO QUALQUER TIPO DE AÇAO DAQUELE BOTAO
  disableRegion(button)

  // variavel que recebe um array a partir de uma funçao que analisa o comportamento do jogo pra saber
  // se houve uma vitoria 
  const winRegions = getWinRegions()

  //CASO O ARRAY QUE A VARIAVEL winRegions RECEBA SEJA MAIOR QUE ZERO, OU SEJA, POSSUA ALGUM ARRAY DENTRO
  // IRA ENTRAR NESSA CONDIÇÃO E CHAMARA UMA FUNÇAO RESPONSAVEL PELO COMPORTAMENTO DA VITORIA

  // SE NAO, SE : ELE VAI ANALISAR SE O ARRAY 'vBoard', A PARTIR DA FUNCAO FLAT QUE UNE TODOS OS ELEMENTOS
  // DO ARRAY COMO SE ELE FOSSE UM SO. EX: ARR = [[1,2], [3,4]], ARR.flat = [1,2,3,4]. SE EXISTE ALGUM VALOR VAZIO, DESSA
  // FORMA VAI ENTRAR NUMA CONDIÇÃO QUE AINDA NAO ACABOU O JOGO E NINGUEM PERDEU

  //CASO NAO ENTRE EM NENHUMA DESSA CONDIÇOES, O RESULTADO DO JOGO DEU EMPATE
  if (winRegions.length > 0 ) {
    handleWin(winRegions)
    // o flat cria um unico array, contendo todos os elementos separados
  } else if (vBoard.flat().includes('')) {
    turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
    updateTitle()
  } else {
    //ATRIBUI AO BOTAO DE INICIAR O JOGO O TEXTO 'REINICIAR'
    document.getElementById('startGame').innerText = 'REINICIAR'
    // ATRIBUI AO H2 O TITULO 'EMPATE'
    document.querySelector('h2').innerHTML = 'Empate!'
    boardRegions.forEach(function(element) {
      element.classList.add('handleDraw')
    })
  }
}

//ATRIBUI UM EVENTO AO BOTAO COM ID STARTGAME DO TIPO CLICK QUE CHAMA A FUNÇAO RESPONSAVEL POR COMEÇAR O JOGO

document.getElementById('startGame').addEventListener('click', initializeGame)