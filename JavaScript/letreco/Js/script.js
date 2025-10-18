const submit = document.querySelector('#submit');
const textInputs = document.querySelectorAll('.textInput');
const output = document.querySelector('#output');
const hintEl = document.querySelector('#hint');
const winnerCard = document.querySelector('#winner');
const loserCard = document.querySelector('#loser');
const palavraEscolhidaEl = document.querySelector('#palavraEscolhida');
const btnBackGame = document.querySelectorAll('.backGame');
const correctEl = document.querySelector('#correct');
const errosEl = document.querySelector('#erros');
const inclusoEl = document.querySelector('#incluso');

let chances = 5;
let tentativa = 0;

const palavras = ['falar','bravo','chave','grito','sonho','lindo','praia','risco','festa','beijo'];
let palavraEscolhida = palavras[Math.floor(Math.random() * palavras.length)];

hintEl.textContent = 'Dica: ' + gerarDica(palavraEscolhida, tentativa);

btnBackGame.forEach(btn => btn.addEventListener('click', () => location.reload()));

textInputs.forEach((input, idx) => {
    input.addEventListener('input', () => {
        input.value = input.value.toUpperCase();
        if(input.value.length === 1 && idx < textInputs.length - 1) {
            textInputs[idx + 1].focus();
        }
    });
});

function gerarDica(palavra, tent) {
    let dica = '';
    for(let i = 0; i < palavra.length; i++) {
        dica += i < tent ? palavra[i].toUpperCase() + ' ' : '_ ';
    }
    return dica.trim();
}

submit.addEventListener('click', () => {
    let resposta = Array.from(textInputs).map(input => input.value.toLowerCase());
    if(resposta.some(r => r === '')) {
        alert('Preencha todas as letras!');
        return;
    }

    let acertos = [];
    let inclusos = [];
    let erros = [];

    resposta.forEach((letra, idx) => {
        const inputEl = textInputs[idx];
        if(letra === palavraEscolhida[idx]) {
            inputEl.style.backgroundColor = '#4BB543'; 
            inputEl.style.color = '#fff';
            acertos.push(letra.toUpperCase());
        } else if(palavraEscolhida.includes(letra)) {
            inputEl.style.backgroundColor = '#FFD700'; 
            inputEl.style.color = '#333';
            inclusos.push(letra.toUpperCase());
        } else {
            inputEl.style.backgroundColor = '#FF4C4C'; 
            inputEl.style.color = '#fff';
            erros.push(letra.toUpperCase());
        }
    });

    correctEl.textContent = acertos.join(' | ');
    inclusoEl.textContent = inclusos.join(' | ');
    errosEl.textContent = erros.join(' | ');

    tentativa++;
    chances--;
    output.textContent = chances >= 0 ? chances : 0;

    hintEl.textContent = 'Dica: ' + gerarDica(palavraEscolhida, tentativa);

    if(acertos.length === palavraEscolhida.length) {
        setTimeout(() => {
            winnerCard.style.display = 'block';
            document.getElementById('container').style.display = 'none';
        }, 300);
    } else if(chances === 0) {
        setTimeout(() => {
            loserCard.style.display = 'block';
            document.getElementById('container').style.display = 'none';
            palavraEscolhidaEl.textContent = palavraEscolhida.toUpperCase();
        }, 300);
    }
});
