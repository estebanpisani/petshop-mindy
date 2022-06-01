//contenedor de los checkboxes
var rangoContainer = document.getElementById("rango-container");
var checked = [];
//Búsqueda por nombre. Input y Botón.
let searchInput = document.getElementById("search-input");
let search = document.getElementById("search-input");
//Inicializo vacío el valor de búsqueda por nombre
var searchValue = searchInput.value;
let precioMinInput = document.getElementById("precio-min");
let precioMaxInput = document.getElementById("precio-max");
let botonRango = document.getElementById("boton-precio");
let botonText = document.getElementById("boton-texto");
let botonReset = document.getElementById("boton-reset");
let listaJuguetes = [];
let rangoMin = 0;
let rangoMax = 0;
let cardContainer = document.getElementById("grid");


var carrito = [];

//Funciones
function filtrarMedicamentos(lista) {
    let medicamentos = [];
    lista.forEach(articulo => {
        if (articulo.tipo === "Medicamento") {
            medicamentos.push(articulo);
        }
    });
    return medicamentos;
}

function filtrarJuguetes(lista) {
    let juguetes = [];
    lista.forEach(articulo => {
        if (articulo.tipo === "Juguete") {
            juguetes.push(articulo);
        }
    });
    return juguetes;
}

function aplicarFiltroNombre() {
    // Capturo el valor del input al hacer click en el botón del formulario y lo guardo en searchValue.
    botonText.addEventListener("click", () => {
        searchValue = searchInput.value;
        rangoMin = Number(precioMinInput.value);
        rangoMax = Number(precioMaxInput.value);
        filtrado();
    });
}

function aplicarResetFiltros() {
    // Capturo el valor del input al hacer click en el botón del formulario y lo guardo en searchValue.
    botonReset.addEventListener("click", () => {
        searchInput.value = "";
        precioMinInput.value = 0;
        precioMaxInput.value = 0;
        searchValue = searchInput.value;
        rangoMin = Number(precioMinInput.value);
        rangoMax = Number(precioMaxInput.value);
        filtrado();
    });
}

function aplicarFiltroPrecio() {
    botonRango.addEventListener("click", () => {
        searchValue = searchInput.value;
        rangoMin = Number(precioMinInput.value);
        rangoMax = Number(precioMaxInput.value);
        filtrado();
    });
}

function filtrado() {
    let articulosFiltrados = [];
    // Si el user se hace el loco.
    if (rangoMin != 0 && rangoMax != 0 && rangoMin > rangoMax) {
        alert("No se puede ingresar un precio máximo mayor al mínimo");
        searchInput.value = "";
        precioMinInput.value = 0;
        precioMaxInput.value = 0;
        searchValue = searchInput.value;
        rangoMin = Number(precioMinInput.value);
        rangoMax = Number(precioMaxInput.value);
        filtrado();
    }
    // Si sólo hay rango min
    if (searchValue === "" && rangoMin > 0 && rangoMax === 0) {
        // console.log("Entré en min");
        articulosFiltrados = listaJuguetes.filter(articulo => articulo.precio >= rangoMin);
    }
    // Si sólo hay rango max
    if (searchValue === "" && rangoMin === 0 && rangoMax > 0) {
        // console.log("Entré en max");
        articulosFiltrados = listaJuguetes.filter(articulo => articulo.precio <= rangoMax);
    }
    // Si hay ambos rangos
    if (searchValue === "" && rangoMin > 0 && rangoMax > rangoMin) {
        // console.log("Entré en min-max");
        articulosFiltrados = listaJuguetes.filter(articulo => articulo.precio >= rangoMin && articulo.precio <= rangoMax && !articulosFiltrados.includes(articulo));
    }
    // Si sólo hay texto
    if (searchValue !== "" && rangoMin === 0 && rangoMax === 0) {
        // console.log("Entré en solo texto");
        listaJuguetes.forEach(articulo => {
            if (articulo.nombre.toLowerCase().includes(searchValue.trim().toLowerCase())) {
                articulosFiltrados.push(articulo);
            }
        })
    }
    // Si hay texto y min
    if (searchValue !== "" && rangoMin > 0 && rangoMax === 0) {
        // console.log("Entré en txt y min"); 
        articulosFiltrados = listaJuguetes.filter(articulo => articulo.precio >= rangoMin && articulo.nombre.toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    // Si hay texto y min
    if (searchValue !== "" && rangoMin === 0 && rangoMax > 0) {
        // console.log("Entré en txt y max"); 
        articulosFiltrados = listaJuguetes.filter(articulo => articulo.precio <= rangoMax && articulo.nombre.toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    // Si están todos
    if (searchValue !== "" && rangoMin > 0 && rangoMax > rangoMin) {
        // console.log("Entré en todos"); 
        articulosFiltrados = listaJuguetes.filter(articulo => articulo.precio >= rangoMin && articulo.precio <= rangoMax && articulo.nombre.toLowerCase().includes(searchValue.trim().toLowerCase()));
    }
    //Si no hay ninguno
    if (searchValue === "" && rangoMin === 0 && rangoMax === 0) {
        // console.log("Entré en ninguno.");
        articulosFiltrados = listaJuguetes;
    }

    console.log("Eventos Filtrados:");
    console.log(articulosFiltrados);
    mostrarCards(articulosFiltrados);

}

function mostrarCards(lista) {
    let template = "";
    lista.forEach(element => {
        if (element.stock >= 4) {
            template += `
                <div class="col">
                    <div class="card h-100 bg-light">
                        <img src="${element.imagen}" class="card-img-top" alt="...">
                        <div class="card-body filtros">
                            <h5 class="card-title">${element.nombre}</h5>
                            <p class="card-text">${element.descripcion}</p>
                        </div>
                        <div class="card-footer bg-light d-flex flex-column justify-content-between align-items-center">
                            <div class="my-2"><span class="negrita">Stock:</span> ${element.stock}</div>
                            <div class="my-2"><span class="negrita">Precio:</span> $${element.precio}</div>
                            <button onclick=cargarCarrito("${element._id}") class="btn btn-pink my-2">Anadir a Carrito</button>
                        </div>
                    </div>
                </div>
                `
        }
        else {

            template += `
                <div class="col">
                    <div class="card h-100">
                        <img src="${element.imagen}" class="card-img-top" alt="...">
                        <div class="card-body filtros">
                            <h5 class="card-title">${element.nombre}</h5>
                            <p class="card-text">${element.descripcion}</p>
                        </div>
                        <div class="card-footer bg-light h-100 d-flex flex-column justify-content-between py-3 align-items-center">
                                <span class="badge bg-danger text-wrap" style="width: 6rem;">
                                    Ultimas Unidades!!! (${element.stock})
                                </span> 
                            <div class="my-2 font-weight-bold"><span class="negrita">Precio:</span> $${element.precio}</div>
                            <button onclick=cargarCarrito("${element._id}") class="btn btn-pink">Anadir a Carrito</button>
                        </div>
                    </div>
                </div>
                `
        }
    })

    cardContainer.innerHTML = template;
}
// CARRITO
function cargarCarrito(id) {
    let object;
    listaJuguetes.forEach(element => {
        if (element._id == id) {

            object = {
                nombre: element.nombre,
                imagen: element.imagen,
                descripcion: element.descripcion,
                precio: element.precio,
                stock: element.stock,
                tipo: element.tipo,
                __v: 1,
                _id: element._id
            };

        }

    })

    cargarItemCarrito(object);
}

function cargarItemCarrito(object) {

    const alert = document.querySelector(".alert");

    setTimeout(() => {
        alert.classList.add('hide')
    }, 2000);
    alert.classList.remove('hide');

    // const inputs=document.querySelectorAll(".input-elemento");   

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i]._id == object._id) {
            carrito[i].__v++;
            agregarLocal();
            return null;                  //Uso un for para poder cortarlo con el Return
        }


    }

    carrito.push(object);

    agregarLocal();
}

//LOCALSTORAGE
function agregarLocal() {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function () {
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if (storage) {
        carrito = storage;
    }
}

//Obtener datos de API y aplicar funciones
async function getAPIData(url) {
    let productosTotal;
    let dataAPI;
    await fetch(url).then(response => response.json()).then(json => dataAPI = json);
    productosTotal = dataAPI.response;
    listaJuguetes = filtrarJuguetes(productosTotal);

    aplicarResetFiltros();
    aplicarFiltroNombre();
    aplicarFiltroPrecio()
    filtrado();
    mostrarCards(listaJuguetes);

}
getAPIData("https://apipetshop.herokuapp.com/api/articulos");