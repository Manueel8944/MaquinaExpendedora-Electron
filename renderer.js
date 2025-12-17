let saldo = 0;

const saldoEl = document.getElementById('saldo');
const mensajeEl = document.getElementById('mensaje');

document.getElementById('euro1').addEventListener('click', () => {
  saldo += 1;
  actualizar();
});

document.getElementById('euro2').addEventListener('click', () => {
  saldo += 2;
  actualizar();
});

document.getElementById('agua').addEventListener('click', () => {
  comprar('Agua', 1);
});

document.getElementById('refresco').addEventListener('click', () => {
  comprar('Refresco', 2);
});

document.getElementById('snack').addEventListener('click', () => {
  comprar('Snack', 1.5);
});

document.getElementById('devolver').addEventListener('click', () => {
  mensajeEl.innerText = `Devuelto €${saldo}`;
  saldo = 0;
  actualizar();
});

function comprar(producto, precio) {
  if (saldo >= precio) {
    saldo -= precio;
    mensajeEl.innerText = `Has comprado ${producto}`;
  } else {
    mensajeEl.innerText = 'Saldo insuficiente';
  }
  actualizar();
}

function actualizar() {
  saldoEl.innerText = saldo.toFixed(2);
}