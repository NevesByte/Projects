const hora = document.querySelector('#hora');
const min = document.querySelector('#min');
const seg = document.querySelector('#seg');

function atualizarRelogio() {
    const agora = new Date();
    
    let h = agora.getHours();
    let m = agora.getMinutes();
    let s = agora.getSeconds();

    // Adiciona zero à esquerda
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    hora.textContent = h;
    min.textContent = m;
    seg.textContent = s;
}

// Atualiza a cada segundo
setInterval(atualizarRelogio, 1000);
atualizarRelogio();
