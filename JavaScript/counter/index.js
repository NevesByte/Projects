const painel = document.getElementById("containerPainel")
const decrementBtn = document.getElementById("decrement");
const incrementBtn = document.getElementById("increment");
const reset = document.getElementById("reset");
let count = 0;

decrementBtn.onclick = function(){
    count--;
    painel.textContent = count;
}

incrementBtn.onclick = function(){
    count++;
    painel.textContent = count;
}

reset.onclick = function(){
    count = 0;
    painel.textContent = 0;
}
