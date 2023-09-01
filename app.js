// Definición de los productos disponibles
const productos = [
    { nombre: "Buzo", precio: 5500 },
    { nombre: "Remera", precio: 1200 },
    { nombre: "Camisa", precio: 2500 },
    { nombre: "Pantalón", precio: 3200 }
];

// Variable para almacenar los productos seleccionados
let carrito = [];

// Función total de la compra
const calculoTotal = () => {
    return carrito.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad;
    }, 0);
};

// Función detalle de compra
const mostrarDetalleCompra = () => {
    const detalle = carrito.map((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        return `
        Producto: ${producto.nombre}
        Cantidad: ${producto.cantidad}
        Precio unitario: $${producto.precio}
        Subtotal: $${subtotal}
        `;
    }).join("\n");

    const total = calculoTotal();
    const detalleCompra = `Detalle de la compra:\n${detalle}\nTotal a pagar: $${total}`;
    return detalleCompra;
};

// Función para mostrar el catálogo de productos
const mostrarCatalogo = () => {
    const catalogo = productos.map((producto, index) => {
        return `${index + 1}. ${producto.nombre}: $${producto.precio}`;
    }).join("\n"); 

    const catalogoProductos = `Catálogo de productos:\n\n${catalogo}`;
    return catalogoProductos;
};

// Función para validar la opción
const validarOpcion = (opcion) => {
    return !isNaN(opcion) && opcion >= 1 && opcion <= productos.length;
};

// Función para validar la cantidad
const validarCantidad = (cantidad) => {
    return !isNaN(cantidad) && cantidad > 0;
};

// Mensaje de bienvenida
alert("Bienvenido a Auténtico. Haz clic en aceptar para ver nuestro catálogo.");

let agregar;
let seleccionValida = false;

do {
    let opcion;
    let cantidad;
    let opcionValida = false;
    let cantidadValida = false;

    // Seleccion del producto del catálogo
    while (!opcionValida) {
        opcion = parseInt(prompt(`${mostrarCatalogo()}\nIndica el número correspondiente al producto que deseas agregar al carrito:`));

        if (validarOpcion(opcion)) {
            opcionValida = true;
        } else {
            alert("Ingresa una opción válida del catálogo (1-" + productos.length + ")");
        }
    }

    // Seleccion de cantidad 
    while (!cantidadValida) {
        cantidad = parseInt(prompt("Ingrese la cantidad"));

        if (validarCantidad(cantidad)) {
            cantidadValida = true;
        } else {
            alert("Ingresa una cantidad válida (mayor que 0)");
        }
    }

    // Agregamos el producto seleccionado al carrito
    carrito.push({
        nombre: productos[opcion - 1].nombre,
        precio: productos[opcion - 1].precio,
        cantidad: cantidad
    });

    // Preguintamos al usuario que hacer a continuación
    seleccionValida = false;
    while (!seleccionValida) {
        agregar = prompt("¿Qué deseas hacer?\n1. Finalizar\n2. Seguir comprando");

        if (agregar === "1" || agregar === "2") {
            seleccionValida = true;
        } else {
            alert("Ingresa una opción válida (1 o 2)");
        }
    }

    // Mostrar detalle de compra
    if (agregar === "1") {
        alert(mostrarDetalleCompra());
        carrito = [];
    }

} while (agregar === "2");

// Mostramos un mensaje de despedida
alert("Gracias por tu compra. ¡Hasta luego!");