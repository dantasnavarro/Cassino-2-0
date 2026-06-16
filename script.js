// Esses são os símbolos do caça-níquel (os emojis)
const symbols = ["🍒", "🍋", "🍉", "⭐", "7️⃣"];

// Pega os três espaços onde vai mostrar os símbolos
const reels = [
  document.getElementById("reel1"),
  document.getElementById("reel2"),
  document.getElementById("reel3")
];

// Pega o botão de jogar, a área da mensagem e o saldo
const spinBtn = document.getElementById("spinBtn");
const resultDiv = document.getElementById("result");
const balanceSpan = document.getElementById("balance");

// Começa com 100 créditos
let balance = 100;

// Cada jogada custa 10 créditos
const custoJogada = 10;

// Função que roda quando clica no botão "Jogar"
function jogar() {
  // Confere se ainda tem créditos suficientes
  if (balance < custoJogada) {
    resultDiv.textContent = "Você ficou sem créditos!";
    resultDiv.className = "notice perdeu";
    spinBtn.disabled = true;
    return;
  }

  // Cobra o valor da jogada
  balance = balance - custoJogada;
  balanceSpan.textContent = balance;
  resultDiv.textContent = "";

  // Desliga o botão enquanto gira, pra não clicar várias vezes
  spinBtn.disabled = true;

  let voltas = 0;

  // Troca os símbolos rapidamente pra simular o giro
  let girando = setInterval(function () {
    for (let i = 0; i < reels.length; i++) {
      let aleatorio = symbols[Math.floor(Math.random() * symbols.length)];
      reels[i].textContent = aleatorio;
    }
    voltas = voltas + 1;

    // Depois de alguns giros, para e mostra o resultado final
    if (voltas > 10) {
      clearInterval(girando);
      sortearResultado();
    }
  }, 100);
}

// Decide o resultado final e calcula o prêmio
function sortearResultado() {
  let resultadoFinal = [];

  for (let i = 0; i < reels.length; i++) {
    let simboloSorteado = symbols[Math.floor(Math.random() * symbols.length)];
    reels[i].textContent = simboloSorteado;
    resultadoFinal.push(simboloSorteado);
  }

  // Verifica se os 3 símbolos são iguais
  if (resultadoFinal[0] === resultadoFinal[1] && resultadoFinal[1] === resultadoFinal[2]) {
    let premio = custoJogada * 8;
    balance = balance + premio;
    resultDiv.textContent = "🎉 Saiu os 3 iguais! Você ganhou " + premio + " créditos!";
    resultDiv.className = "notice ganhou";

  // Verifica se pelo menos 2 são iguais
  } else if (resultadoFinal[0] === resultadoFinal[1] || resultadoFinal[1] === resultadoFinal[2] || resultadoFinal[0] === resultadoFinal[2]) {
    let premio = custoJogada * 2;
    balance = balance + premio;
    resultDiv.textContent = "Quase! 2 iguais. Você ganhou " + premio + " créditos!";
    resultDiv.className = "notice ganhou";

  } else {
    resultDiv.textContent = "Não foi dessa vez. Tente de novo!";
    resultDiv.className = "notice perdeu";
  }

  balanceSpan.textContent = balance;

  // Libera o botão de novo, se ainda tiver créditos
  if (balance >= custoJogada) {
    spinBtn.disabled = false;
  } else {
    spinBtn.textContent = "Sem créditos";
  }
}
