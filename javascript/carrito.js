
const tbody = document.getElementById('tbody-carrito');


var carrito = [];


//LOCALSTORAGE

function agregarLocal() {
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
  const storage = JSON.parse(localStorage.getItem('carrito'))
  if (storage) {
    carrito = storage;
    renderCarrito();
  }

}


function renderCarrito() {

  tbody.innerHTML = "";
  carrito.forEach((element, index) => {

    tbody.innerHTML += `
        <tr class="item-carro">
          <th scope="row">${index + 1}</th>
          <td class="table-productos"
          ><img src=${element.imagen} alt="producto">
          <h6 class="product-title">${element.nombre}</h6>
          </td>
          <td class="table_price">$ ${element.precio}</td>
          <td class="table_cantidad"">
          <input class="input-elemento" type="number" min="1" max="${element.stock}" value=${element.__v}>
          <button onclick=removeItem("${element._id}") class="delete btn btn-danger">X</button>
          </td>
      </tr>`


    document.querySelectorAll(".input-elemento").forEach(input => {
      input.addEventListener('change', (e)=>sumaCantidad(e));
    })


  })

  totalCarrito();
}


function totalCarrito() {

  let total = 0;
  let h3Total = document.querySelector("#itemCartTotal");
  carrito.forEach(element => {
    let precio = element.precio;
    total = (total + (precio * element.__v));
  })

  h3Total.innerHTML = `$${total}`;

}


function removeItem(id) {

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i]._id == id) {
      carrito = carrito.filter(element => element._id != id)
      agregarLocal();
    }
  }

  const alert = document.querySelector(".remove");

  setTimeout(() => {
    alert.classList.add('remove')
  }, 2000);

  alert.classList.remove('remove');

  renderCarrito();

}


function sumaCantidad(e) {

  const sumaInput = e.target
  const tr = sumaInput.closest(".item-carro");
  const title = tr.querySelector(".product-title").textContent;


  carrito.forEach(element => {
    if (element.nombre == title) {
      sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value;
      element.__v = Number(sumaInput.value);

      agregarLocal();
      totalCarrito();

    }
  })

}


