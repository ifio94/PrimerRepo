solicitarDatos()

//Funcion Inicial
function solicitarDatos () {
let nombre = prompt("ingrese su nombre");
let apellido = prompt("ingrese su apellido");
let edad = parseInt(prompt("ingrese su edad"));
    if(edad >= 18){
        alert (`Bienvenido ${nombre} ${apellido}`);
        alert ("disponibilidad\n"+
        "1- Entradas\n"+
        "2- VIP\n"+
        "3- Membresia\n"+
        "4- Paquetes\n"+
        "escriba ESC para terminar su consulta");
        let consultaPrecio = prompt("escriba el codigo del producto que desea consultar");
        while(consultaPrecio !== "ESC" && consultaPrecio !== "esc") {
            switch(consultaPrecio.toUpperCase()){
                case "1":
                    alert("el precio de la entrada es de $10.000");
                    const entradas = prompt("¿cuantas entradas desea comprar?")
                    valorFinal(calculoEntradas(entradas));
                    break;
                
                case "2":
                    alert("el precio del vip es de $25.000");
                    const vip = prompt("¿cuantas unidades desea comprar?")
                    valorFinal(calculoVip(vip));
                    break;
                
                case "3":
                    alert("el precio de la membresia es de $50.000");
                    const membresia = prompt("¿cuantas membresias desea comprar?")
                    valorFinal(calculoMembresia(membresia));
                    break;
                
                case "4":
                    alert("el precio de los paquetes es de $70.000");
                    const paquetes = prompt("¿cuantas paquetes desea comprar?")
                    valorFinal(calculoPaquetes(paquetes));
                    break
                
                default:
                    alert("sold out");
                    break;
            }
            consultaPrecio = prompt("ingrese otra consulta\n"+
            "1- Entradas\n"+
            "2- VIP\n"+
            "3- Membresia\n"+
            "4- Paquetes\n"+
            "escriba ESC para terminar su consulta");
        }

    }else{
        alert ("para poder comprar debes ser mayor de edad")
    }
}

//calculo de cantidad
function calculoEntradas (entradas) {
    return entradas * 10000;
}

function calculoVip (vip) {
    return vip * 25000;
}

function calculoMembresia (membresia) {
    return membresia * 50000;
}

function calculoPaquetes (paquetes) {
    return paquetes * 70000;
}

function valorFinal (cantidadProducto){
    alert (`Debes abonar el valor total de $${cantidadProducto} `);
}


const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')


const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    actualizarCarrito()
})


stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p>${producto.desc}</p>
    <p>Talle: ${producto.talle}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>
    `
    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)

    boton.addEventListener('click', () => {
        
        agregarAlCarrito(producto.id)
        
    })
})


const agregarAlCarrito = (prodId) => {

    
    const existe = carrito.some (prod => prod.id === prodId)

    if (existe){
        const prod = carrito.map (prod => {
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    } else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) 

    carrito.splice(indice, 1) 
    actualizarCarrito() 
    console.log(carrito)
}

const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = ""

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })

    contadorCarrito.innerText = carrito.length
    console.log(carrito)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

let stockventa = [
    {id: 1, nombre: "VIP", cantidad: 1, desc: "Una experiencia fuera de este mundo", tipo: "VIP", precio: 25000, img: '../recursos/publico.jpg'},
    {id: 2, nombre: "Membresia", cantidad: 1, desc: "Ser parte de algo mas", tipo: "Membresia", precio: 50000, img: '../recursos/publico.jpg'},
    {id: 3, nombre: "Entrada", cantidad: 1, desc: "Tu pase al mejor entretenimiento", tipo: "Entrada", precio: 10000, img: '../recursos/publico.jpg'},
    {id: 3, nombre: "Paquete", cantidad: 1, desc: "A tu manera, armas tu experiencia", tipo: "Paquete", precio: 70000, img: '../recursos/publico.jpg'},
]

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const botonAbrir = document.getElementById('boton-carrito')
const botonCerrar = document.getElementById('carritoCerrar')
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]
botonAbrir.addEventListener('click', ()=>{
contenedorModal.classList.toggle('modal-active')
})
botonCerrar.addEventListener('click', ()=>{
contenedorModal.classList.toggle('modal-active')
    })
contenedorModal.addEventListener('click', (event) =>{
contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click', (event) => {
event.stopPropagation()
})


const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {

    Swal.fire({
        title: 'Genial!',
        text: 'Haz clickeado el botón!',
        icon: 'success',
        confirmButtonText: 'Cool'
})
})
