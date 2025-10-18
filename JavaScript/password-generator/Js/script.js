const submitBtn = document.querySelector('#submit');
const opt = document.querySelectorAll('.option');
const comprimentoSenha = document.querySelector('#lengthSenha');
const valueComprimento = document.querySelector('#outputValue');
const levels = document.querySelectorAll('.level');
const strength = document.querySelector('#output-seguranca');
const output = document.querySelector('#output');
const copyBtn = document.querySelector('#copy');

const letras = 'abcdefghijklmnopqrstuvwxyz';
const numeros = '0123456789';
const simbolos = '!@#$%¨&*()_+';

comprimentoSenha.addEventListener('input', () => {
  valueComprimento.textContent = comprimentoSenha.value;
});

submitBtn.addEventListener('click', () => {
  let chars = '';
  if (document.querySelector('#iUp').checked) chars += letras.toUpperCase();
  if (document.querySelector('#iLow').checked) chars += letras;
  if (document.querySelector('#iNum').checked) chars += numeros;
  if (document.querySelector('#iSimbol').checked) chars += simbolos;

  if (!chars) {
    output.textContent = 'Selecione ao menos uma opção!';
    return;
  }

  let senha = '';
  for (let i = 0; i < comprimentoSenha.value; i++) {
    senha += chars[Math.floor(Math.random() * chars.length)];
  }

  output.textContent = senha;
  atualizarForca(comprimentoSenha.value);
});

function atualizarForca(tamanho) {
  levels.forEach(level => level.style.background = 'transparent');

  if (tamanho < 10) {
    levels[0].style.background = 'red';
    levels[1].style.background = 'red';
    strength.textContent = 'Senha Fraca';
  } else if (tamanho <= 16) {
    levels[0].style.background = 'yellow';
    levels[1].style.background = 'yellow';
    levels[2].style.background = 'yellow';
    strength.textContent = 'Senha Média';
  } else {
    levels.forEach(level => level.style.background = 'green');
    strength.textContent = 'Senha Forte';
  }
}

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(output.textContent);
  alert('Senha copiada!');
});
