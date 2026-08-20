const libro = document.getElementById("libro");
const fondoCambio = document.getElementById("fondoCambio");
const fondo = document.getElementById("fondo");


function cambiarFondo(imagen){

    fondoCambio.style.backgroundImage =
    `url('imagenes/${imagen}')`;

    fondoCambio.style.opacity = "1";


    setTimeout(()=>{

        fondo.style.backgroundImage =
        `url('imagenes/${imagen}')`;

        fondoCambio.style.opacity = "0";

    },8000);

}



libro.onclick = function(){

    document.body.classList.add("abrirLibro");


    // Cambio de día a atardecer
    cambiarFondo("fondo-atardecer.png");


    // Cambio de atardecer a noche
    setTimeout(()=>{

        cambiarFondo("fondo-noche.png");

    },12000);



    // Pequeño movimiento del libro
    libro.style.transform =
    "scale(1.08) rotate(-2deg)";



    // Ir a la invitación de Canva después del libro
    setTimeout(()=>{

        window.location.href =
        "invitacion.html";

    },1000);


};