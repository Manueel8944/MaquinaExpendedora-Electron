const conectarMongo = require("./database/conexion.js");
const Producto = require("./models/Producto");
const Dinero = require("./models/Dinero");

let saldo = 0;
let productoSeleccionado = "";

let dineroInsertado = {
  5: 0,
  10: 0,
  20: 0,
  50: 0,
  100: 0,
  200: 0,
  500: 0,
  1000: 0,
  2000: 0,
};

const textoPantalla = document.getElementById("pantalla");

document.getElementById("0.05e").addEventListener("click", () => {
  // Usamos el addEventListener para ejecutar algo al hacer click en el elemento con el id dicho
  saldo += 5; // Aumentamos el saldo
  dineroInsertado[5]++; // Aumentamos la cantidad de esa moneda insertada
  productoSeleccionado = ""; // Reseteamos el producto seleccionado
  actualizarSaldo(); // Actualizamos el saldo en pantalla
});

document.getElementById("0.10e").addEventListener("click", () => {
  saldo += 10;
  dineroInsertado[10]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("0.20e").addEventListener("click", () => {
  saldo += 20;
  dineroInsertado[20]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("0.50e").addEventListener("click", () => {
  saldo += 50;
  dineroInsertado[50]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("1e").addEventListener("click", () => {
  saldo += 100;
  dineroInsertado[100]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("2e").addEventListener("click", () => {
  saldo += 200;
  dineroInsertado[200]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("5e").addEventListener("click", () => {
  saldo += 500;
  dineroInsertado[500]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("10e").addEventListener("click", () => {
  saldo += 1000;
  dineroInsertado[1000]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("20e").addEventListener("click", () => {
  saldo += 2000;
  dineroInsertado[2000]++;
  productoSeleccionado = "";
  actualizarSaldo();
});

document.getElementById("devolver").addEventListener("click", () => {
  textoPantalla.innerText = `DEVUELTO €${(saldo / 100).toFixed(2)}`; // Mostramos el dinero devuelto

  // Reset
  productoSeleccionado = "";
  saldo = 0;

  // Cambiar mensaje despues de 2 segundos
  setTimeout(() => {
    textoPantalla.innerText = "INSERTE DINERO";
  }, 2000);
});

// Actualiza el saldo en pantalla
function actualizarSaldo() {
  textoPantalla.innerText = `SALDO €${(saldo / 100).toFixed(2)}`;
}

document.getElementById("1b").addEventListener("click", () => {
  // Verificamos que el codigo no tenga mas de 4 digitos
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "1"; // Añadimos el numero seleccionado
    textoPantalla.innerText = productoSeleccionado; // Añadimos el numero seleccionado a pantalla
  }
});

document.getElementById("2b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "2";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("3b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "3";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("4b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "4";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("5b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "5";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("6b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "6";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("7b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "7";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("8b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "8";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("9b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "9";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("0b").addEventListener("click", () => {
  if (productoSeleccionado.length < 4) {
    productoSeleccionado += "0";
    textoPantalla.innerText = productoSeleccionado;
  }
});

document.getElementById("pedir").addEventListener("click", async () => {
  const productos = await Producto.find().sort({ codigo: 1 });

  let p;
  let codigo = parseInt(productoSeleccionado);

  // Vemos si esta vacio el producto seleccionado
  if (productoSeleccionado === "") {
    textoPantalla.innerText = "SELECCIONE PRODUCTO";
    return;
  }

  // Vemos si no existe el producto seleccionado
  if (codigo < 1 || codigo > 12) {
    textoPantalla.innerText = "CÓDIGO INVÁLIDO";
    productoSeleccionado = "";
    return;
  }

  // Buscamos el producto seleccionado
  for (let i = 0; i < productos.length; i++) {
    if (productos[i].codigo == productoSeleccionado) {
      p = productos[i];
    }
  }

  // Vemos si tiene stock
  if (p.stock <= 0) {
    textoPantalla.innerText = "SIN STOCK";
    productoSeleccionado = "";
    return;
  }

  // Vemos si hay saldo suficiente
  if (saldo > 0 && saldo < p.precio) {
    textoPantalla.innerText = `FALTAN ${p.nombre}: ${(
      (p.precio - saldo) /
      100
    ).toFixed(2)} €`;
    productoSeleccionado = "";
    return;
  }

  // Vemos si no hay saldo
  if (saldo == 0) {
    textoPantalla.innerText = `PRECIO ${p.nombre}: ${(p.precio / 100).toFixed(
      2
    )} €`;
    productoSeleccionado = "";
    return;
  }

  // Cuando ya estan todas las validaciones hechas empezamos a gestionar el cambio
  let cambioNecesario = saldo - p.precio;
  let cambio = await calcularCambio(cambioNecesario);

  // Si sale null no hay cambio suficiente
  if (cambio === null) {
    textoPantalla.innerText = "NO HAY CAMBIO DISPONIBLE";
    return;
  }

  // Restamos uno al stock y guardamos el producto
  p.stock -= 1;
  await p.save();

  // Añadimos el dinero insertado a la base de datos
  for (const valor in dineroInsertado) {
    if (dineroInsertado[valor] > 0) {
      await Dinero.updateOne(
        { denominacion: Number(valor) },
        { $inc: { cantidad: dineroInsertado[valor] } }
      );
    }
  }

  // Restamos el cambio usado de la base de datos
  for (const c of cambio) {
    await Dinero.updateOne(
      { denominacion: c.denominacion },
      { $inc: { cantidad: -c.cantidad } }
    );
  }

  // Reset de los valores
  saldo = 0;
  productoSeleccionado = "";
  for (const valor in dineroInsertado) {
    dineroInsertado[valor] = 0;
  }

  // Mostramos el cambio devuelto
  let cambioCompleto = 0;
  for (let i = 0; i < cambio.length; i++) {
    const c = cambio[i];
    cambioCompleto += c.denominacion * c.cantidad;
  }

  textoPantalla.innerText = `DEVUELTO ${(cambioCompleto / 100).toFixed(2)}€`;

  setTimeout(() => {
    // Hacemos que en 2 seg se muestre el texto
    textoPantalla.innerText = "RETIRE SU PRODUCTO";
  }, 2000);
});

document.getElementById("abrir").addEventListener("click", () => {
  if (productoSeleccionado == "8944") {
    // Ocultar modo maquina
    document.querySelector(".modoMaquina").style.display = "none";
    // Mostrar modo admin
    document.querySelector(".modoAdmin").style.display = "flex";
  } else {
    textoPantalla.innerText = "CÓDIGO INVÁLIDO";
    productoSeleccionado = "";
  }
});

async function mostrarProductos() {
  const productos = await Producto.find().sort({ codigo: 1 }); // Cojemos los productos de la DB y Ordenamos por codigo ascendente

  for (let i = 0; i < productos.length; i++) {
    // Iteramos sobre los productos
    const p = productos[i];

    const div = document.getElementById(`producto${i + 1}`); // Seleccionamos el div correspondiente al producto

    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" style="width:80px;height:80px;object-fit:contain;">
      <span style="display:block;text-align:center;margin-top:5px;font-weight:bold;">
        ${p.codigo}
      </span>
    `; // Rellenamos el div
  }
}

async function calcularCambio(cambio) {
  // Usamos el algoritmo Greedy para calcular el cambio
  const dineros = await Dinero.find().sort({ denominacion: -1 });

  let restante = Math.round(cambio);
  const resultado = [];

  for (const d of dineros) {
    if (restante <= 0) break; // Si ya no necesitamos mas cambio salimos del bucle

    const valor = d.denominacion;

    // Cuantas monedas de este tipo caben en el cambio restante
    let necesarias = Math.floor(restante / valor);

    // No podemos usar más de las que hay y math.min hace que coja el valor mas pequeño de los dos si necesitas 10 y hay 5 pues coge 5
    let usar = Math.min(necesarias, d.cantidad);

    if (usar > 0) {
      // Si usamos alguna moneda se añade al array resultado
      resultado.push({
        denominacion: valor,
        cantidad: usar,
      });

      restante -= usar * valor; // Actualizamos el restante, restamos al restante las monedas que hemos usado
    }
  }

  if (restante === 0) {
    return resultado; // Si hay cambio exacto devolvemos el array con las monedas usadas
  } else {
    return null; // Si no null
  }
}

// MODO ADMINISTRADOR

document.getElementById("dinero-5").addEventListener("click", async () => {
  // Añadimos el evento al boton retirar todo
  await Dinero.updateOne({ denominacion: 5 }, { $set: { cantidad: 0 } }); // Actualizamos la cantidad a 0 en la base de datos
  alert(`Se retiró todo el dinero de 0.05€`); // Alerta para info
});

document.getElementById("dinero-10").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 10 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 0.10€`);
});

document.getElementById("dinero-20").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 20 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 0.20€`);
});

document.getElementById("dinero-50").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 50 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 0.50€`);
});

document.getElementById("dinero-100").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 100 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 1€`);
});

document.getElementById("dinero-200").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 200 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 2€`);
});

document.getElementById("dinero-500").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 500 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 5€`);
});

document.getElementById("dinero-1000").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 1000 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 10€`);
});

document.getElementById("dinero-2000").addEventListener("click", async () => {
  await Dinero.updateOne({ denominacion: 2000 }, { $set: { cantidad: 0 } });
  alert(`Se retiró todo el dinero de 20€`);
});

// Evento que funciona al cambiar el valor del input codigo
document.getElementById("adminCodigo").addEventListener("change", async (e) => {
  const codigoInput = e.target.value; // Cojemos el valor del imput con el target.value
  if (!codigoInput) return; // Si no hay valor salimos de la funcion

  let codigo = parseInt(codigoInput);

  // Buscamos el producto en la base de datos
  const producto = await Producto.findOne({ codigo: codigo });
  if (!producto) {
    // Limpiamos los campos
    document.getElementById("adminNombre").value = "";
    document.getElementById("adminPrecio").value = "";
    document.getElementById("adminImagen").value = "";
    return;
  }

  // Rellenamos los campos con los datos del producto
  document.getElementById("adminNombre").value = producto.nombre;
  document.getElementById("adminPrecio").value = producto.precio;
  document.getElementById("adminImagen").value = producto.imagen;
});

document
  .getElementById("guardarProducto")
  .addEventListener("click", async () => {
    // Obtenemos los valores de los inputs
    const codigo = parseInt(document.getElementById("adminCodigo").value);
    const nombre = document.getElementById("adminNombre").value;
    const precioInput = document.getElementById("adminPrecio").value;
    const imagen = document.getElementById("adminImagen").value;

    // Comprobamos que los campos esten rellenos
    if (!codigo || !nombre || !precioInput || !imagen) {
      alert("Rellena todos los campos");
      return;
    }

    try {
      // Buscamos el producto en la DB
      const producto = await Producto.findOne({ codigo: codigo });
      if (!producto) {
        alert("Producto no encontrado");
        return;
      }

      // Guardamos los cambios
      producto.nombre = nombre;
      producto.precio = precioInput;
      producto.imagen = imagen;

      await producto.save();

      alert("Producto actualizado correctamente!");

      // Actualizar la vista de la máquina
      mostrarProductos();
    } catch (err) {
      console.error(err);
      alert("Error al guardar los cambios");
    }
  });

document.getElementById("reponerStock").addEventListener("click", async () => {
  // Actualizamos todos los productos a stock máximo 10
  await Producto.updateMany({}, { $set: { stock: 10 } });
  alert("Stock de todos los productos repuesto a 10!");
});

document.getElementById("cerrarAdmin").addEventListener("click", () => {
  // Ocultar modo admin
  document.querySelector(".modoAdmin").style.display = "none";

  // Mostrar modo máquina
  document.querySelector(".modoMaquina").style.display = "flex";
});

document.addEventListener("DOMContentLoaded", async () => {
  // Cuando el documento este cargado iniciamos la base de datos y llamamos a la funcion mostrarProductos
  await conectarMongo();
  mostrarProductos();
});
