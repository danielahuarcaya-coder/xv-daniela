"use strict";

/* =====================================================
   INICIO GENERAL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    

    function retrocederMusica() {
        if (!audio) {
            return;
        }

        audio.currentTime =
            Math.max(
                0,
                audio.currentTime - 10
            );
    }


    function adelantarMusica() {
        if (
            !audio ||
            !Number.isFinite(audio.duration)
        ) {
            return;
        }

        audio.currentTime =
            Math.min(
                audio.duration,
                audio.currentTime + 10
            );
    }


    botonMusica?.addEventListener(
        "click",
        alternarMusica
    );

    botonRetroceder?.addEventListener(
        "click",
        retrocederMusica
    );

    botonAdelantar?.addEventListener(
        "click",
        adelantarMusica
    );

    audio?.addEventListener(
        "play",
        actualizarIconoMusica
    );

    audio?.addEventListener(
        "pause",
        actualizarIconoMusica
    );

    audio?.addEventListener(
        "ended",
        actualizarIconoMusica
    );

    actualizarIconoMusica();


    /* =================================================
       UTILIDAD ALEATORIA
    ================================================= */

    function aleatorio(minimo, maximo) {
        return (
            Math.random() *
            (maximo - minimo) +
            minimo
        );
    }


    /* =================================================
       PARTÍCULAS DORADAS
    ================================================= */

    function crearParticulas(
        contenedor,
        cantidad
    ) {
        if (!contenedor) {
            return;
        }

        contenedor.innerHTML = "";

        for (
            let indice = 0;
            indice < cantidad;
            indice += 1
        ) {
            const particula =
                document.createElement("span");

            particula.className =
                "particula-dorada";

            particula.style.setProperty(
                "--izquierda",
                `${aleatorio(4, 96)}%`
            );

            particula.style.setProperty(
                "--tamano",
                `${aleatorio(2.5, 6)}px`
            );

            particula.style.setProperty(
                "--duracion",
                `${aleatorio(13, 23)}s`
            );

            particula.style.setProperty(
                "--retraso",
                `${aleatorio(-22, 0)}s`
            );

            particula.style.setProperty(
                "--movimiento-x",
                `${aleatorio(-65, 65)}px`
            );

            particula.style.setProperty(
                "--opacidad",
                aleatorio(
                    0.16,
                    0.43
                ).toFixed(2)
            );

            particula.style.setProperty(
                "--desenfoque",
                `${aleatorio(0, 1.2)}px`
            );

            contenedor.appendChild(
                particula
            );
        }
    }


    crearParticulas(
        document.getElementById(
            "particulasHero"
        ),
        22
    );

    crearParticulas(
        document.getElementById(
            "particulasPresentacion"
        ),
        18
    );

    crearParticulas(
        document.getElementById(
            "particulasFamilia"
        ),
        18
    );

    crearParticulas(
        document.getElementById(
            "particulasCountdown"
        ),
        14
    );


    /* =================================================
       CUENTA REGRESIVA
    ================================================= */

    const contadorDias =
        document.getElementById("dias");

    const contadorHoras =
        document.getElementById("horas");

    const contadorMinutos =
        document.getElementById("minutos");

    const contadorSegundos =
        document.getElementById("segundos");


    /*
       12 de septiembre de 2026
       7:00 p. m. en Perú.

       Perú es UTC-5, por eso equivale a:
       13 de septiembre de 2026
       00:00 UTC.
    */

    const fechaDeLaFiesta =
        Date.UTC(
            2026,
            8,
            13,
            0,
            0,
            0
        );


    function convertirADosDigitos(
        numero
    ) {
        return String(numero).padStart(
            2,
            "0"
        );
    }


    function actualizarCuentaRegresiva() {
        if (
            !contadorDias ||
            !contadorHoras ||
            !contadorMinutos ||
            !contadorSegundos
        ) {
            console.error(
                "No se encontraron los elementos del contador."
            );

            return;
        }

        const tiempoRestante =
            fechaDeLaFiesta - Date.now();

        if (tiempoRestante <= 0) {
            contadorDias.textContent =
                "00";

            contadorHoras.textContent =
                "00";

            contadorMinutos.textContent =
                "00";

            contadorSegundos.textContent =
                "00";

            return;
        }

        const segundo = 1000;
        const minuto = segundo * 60;
        const hora = minuto * 60;
        const dia = hora * 24;

        const diasRestantes =
            Math.floor(
                tiempoRestante / dia
            );

        const horasRestantes =
            Math.floor(
                (
                    tiempoRestante %
                    dia
                ) / hora
            );

        const minutosRestantes =
            Math.floor(
                (
                    tiempoRestante %
                    hora
                ) / minuto
            );

        const segundosRestantes =
            Math.floor(
                (
                    tiempoRestante %
                    minuto
                ) / segundo
            );

        contadorDias.textContent =
            convertirADosDigitos(
                diasRestantes
            );

        contadorHoras.textContent =
            convertirADosDigitos(
                horasRestantes
            );

        contadorMinutos.textContent =
            convertirADosDigitos(
                minutosRestantes
            );

        contadorSegundos.textContent =
            convertirADosDigitos(
                segundosRestantes
            );
    }


    actualizarCuentaRegresiva();

    window.setInterval(
        actualizarCuentaRegresiva,
        1000
    );

});
/* ==================================================
   SECCIÓN 8 — CARRUSEL DE RECUERDOS
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const tarjetas = Array.from(
        document.querySelectorAll(".s8-tarjeta")
    );

    const botonAnterior =
        document.getElementById("s8Anterior");

    const botonSiguiente =
        document.getElementById("s8Siguiente");

    const contenedorIndicadores =
        document.getElementById("s8Indicadores");

    if (
        tarjetas.length === 0 ||
        !botonAnterior ||
        !botonSiguiente ||
        !contenedorIndicadores
    ) {
        return;
    }

    let indiceActual = 0;

    const indicadores = tarjetas.map((tarjeta, indice) => {
        const punto = document.createElement("button");

        punto.type = "button";
        punto.className = "s8-punto";
        punto.setAttribute(
            "aria-label",
            `Mostrar fotografía ${indice + 1}`
        );

        punto.addEventListener("click", () => {
            indiceActual = indice;
            actualizarCarrusel();
        });

        contenedorIndicadores.appendChild(punto);

        return punto;
    });

    function obtenerIndiceAnterior() {
        return (
            indiceActual - 1 + tarjetas.length
        ) % tarjetas.length;
    }

    function obtenerIndiceSiguiente() {
        return (
            indiceActual + 1
        ) % tarjetas.length;
    }

    function actualizarCarrusel() {
        const indiceAnterior =
            obtenerIndiceAnterior();

        const indiceSiguiente =
            obtenerIndiceSiguiente();

        tarjetas.forEach((tarjeta, indice) => {
            tarjeta.classList.remove(
                "s8-activa",
                "s8-anterior",
                "s8-siguiente"
            );

            tarjeta.setAttribute(
                "aria-hidden",
                "true"
            );

            if (indice === indiceActual) {
                tarjeta.classList.add("s8-activa");

                tarjeta.setAttribute(
                    "aria-hidden",
                    "false"
                );
            } else if (indice === indiceAnterior) {
                tarjeta.classList.add("s8-anterior");
            } else if (indice === indiceSiguiente) {
                tarjeta.classList.add("s8-siguiente");
            }
        });

        indicadores.forEach((punto, indice) => {
            punto.classList.toggle(
                "s8-punto-activo",
                indice === indiceActual
            );

            punto.setAttribute(
                "aria-current",
                indice === indiceActual
                    ? "true"
                    : "false"
            );
        });
    }

    function mostrarAnterior() {
        indiceActual = obtenerIndiceAnterior();
        actualizarCarrusel();
    }

    function mostrarSiguiente() {
        indiceActual = obtenerIndiceSiguiente();
        actualizarCarrusel();
    }

    botonAnterior.addEventListener(
        "click",
        mostrarAnterior
    );

    botonSiguiente.addEventListener(
        "click",
        mostrarSiguiente
    );

    /* Permite presionar las fotos laterales */
    tarjetas.forEach((tarjeta) => {
        tarjeta.addEventListener("click", () => {
            if (
                tarjeta.classList.contains(
                    "s8-anterior"
                )
            ) {
                mostrarAnterior();
            }

            if (
                tarjeta.classList.contains(
                    "s8-siguiente"
                )
            ) {
                mostrarSiguiente();
            }
        });
    });

    /* Control mediante teclado */
    document.addEventListener("keydown", (evento) => {
        const seccionCarrusel =
            document.querySelector(".seccion-8");

        if (!seccionCarrusel) {
            return;
        }

        const rectangulo =
            seccionCarrusel.getBoundingClientRect();

        const carruselVisible =
            rectangulo.top < window.innerHeight &&
            rectangulo.bottom > 0;

        if (!carruselVisible) {
            return;
        }

        if (evento.key === "ArrowLeft") {
            mostrarAnterior();
        }

        if (evento.key === "ArrowRight") {
            mostrarSiguiente();
        }
    });

    actualizarCarrusel();
});
/* ==================================================
   ACABADOS FINALES DE LA INVITACIÓN
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    iniciarBarraDeProgreso();
    iniciarAnimacionesDeScroll();
    iniciarControlDeMusica();
});


/* ==================================================
   BARRA DE PROGRESO
================================================== */

function iniciarBarraDeProgreso() {
    const barra = document.getElementById("barraProgreso");

    if (!barra) {
        return;
    }

    function actualizarBarra() {
        const desplazamientoActual =
            window.scrollY || document.documentElement.scrollTop;

        const alturaDisponible =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const porcentaje =
            alturaDisponible > 0
                ? (desplazamientoActual / alturaDisponible) * 100
                : 0;

        barra.style.width =
            `${Math.min(100, Math.max(0, porcentaje))}%`;
    }

    window.addEventListener(
        "scroll",
        actualizarBarra,
        { passive: true }
    );

    window.addEventListener(
        "resize",
        actualizarBarra
    );

    actualizarBarra();
}


/* ==================================================
   APARICIÓN AL HACER SCROLL
================================================== */

function iniciarAnimacionesDeScroll() {
    const elementos =
        document.querySelectorAll(".revelar");

    if (elementos.length === 0) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        elementos.forEach((elemento) => {
            elemento.classList.add("visible");
        });

        return;
    }

    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) {
                    return;
                }

                entrada.target.classList.add("visible");

                observer.unobserve(entrada.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
}


/* ==================================================
   CONTROL FLOTANTE DE MÚSICA
================================================== */

function iniciarControlDeMusica() {
    const audio =
        document.getElementById("musicaInvitacion");

    const boton =
        document.getElementById("controlMusica");

    const icono =
        document.getElementById("iconoMusica");

    if (!audio || !boton || !icono) {
        return;
    }

    function actualizarEstado() {
        const reproduciendo =
            !audio.paused && !audio.ended;

        boton.classList.toggle(
            "reproduciendo",
            reproduciendo
        );

        boton.setAttribute(
            "aria-pressed",
            reproduciendo ? "true" : "false"
        );

        boton.setAttribute(
            "aria-label",
            reproduciendo
                ? "Pausar música"
                : "Reproducir música"
        );

        icono.textContent =
            reproduciendo ? "Ⅱ" : "▶";
    }

    async function alternarMusica() {
        try {
            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch (error) {
            console.warn(
                "El navegador bloqueó la reproducción automática.",
                error
            );
        }

        actualizarEstado();
    }

    boton.addEventListener(
        "click",
        alternarMusica
    );

    audio.addEventListener(
        "play",
        actualizarEstado
    );

    audio.addEventListener(
        "pause",
        actualizarEstado
    );

    audio.addEventListener(
        "ended",
        actualizarEstado
    );

    actualizarEstado();
}
/* =========================================
   ANIMACIÓN GENERAL AL HACER SCROLL
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const selectores = [
        ".seccion-2 > *",
        ".seccion-3 > *",
        ".seccion-4 > *",
        ".seccion-5 .s5-contenedor",
        ".seccion-7 .s7-contenido",
        ".seccion-8 .s8-contenido",
        ".seccion-9 .s9-pergamino",
        ".seccion-10 .s10-contenido",
        ".seccion-cierre .cierre-contenido"
    ];

    const elementos = document.querySelectorAll(
        selectores.join(",")
    );

    elementos.forEach((elemento) => {
        elemento.classList.add("animar-scroll");
    });

    if (!("IntersectionObserver" in window)) {
        elementos.forEach((elemento) => {
            elemento.classList.add("visible");
        });

        return;
    }

    const observador = new IntersectionObserver(
        (entradas) => {
            entradas.forEach((entrada) => {
                if (!entrada.isIntersecting) {
                    return;
                }

                entrada.target.classList.add("visible");
                observador.unobserve(entrada.target);
            });
        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -45px 0px"
        }
    );

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
});
/* ==================================================
   CONTROL DE MÚSICA PRINCIPAL + BOTÓN FLOTANTE
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const audio = document.getElementById("audioFifteen");

    const botonPrincipal = document.getElementById("botonMusica");
    const botonFlotante = document.getElementById("controlMusica");

    const iconoReproducir = document.getElementById("iconoReproducir");
    const iconoPausa = document.getElementById("iconoPausa");
    const iconoFlotante = document.getElementById("iconoMusica");

    const botonRetroceder = document.getElementById("botonRetroceder");
    const botonAdelantar = document.getElementById("botonAdelantar");

    if (!audio) {
        console.error('No se encontró el audio con id="audioFifteen".');
        return;
    }

    function actualizarEstado() {
        const estaSonando = !audio.paused && !audio.ended;

        /* Botón principal */
        if (botonPrincipal) {
            botonPrincipal.classList.toggle(
                "reproduciendo",
                estaSonando
            );

            botonPrincipal.setAttribute(
                "aria-label",
                estaSonando
                    ? "Pausar música"
                    : "Reproducir música"
            );
        }

        if (iconoReproducir) {
            iconoReproducir.style.display =
                estaSonando ? "none" : "block";
        }

        if (iconoPausa) {
            iconoPausa.style.display =
                estaSonando ? "block" : "none";
        }

        /* Botón flotante */
        if (botonFlotante) {
            botonFlotante.classList.toggle(
                "reproduciendo",
                estaSonando
            );

            botonFlotante.setAttribute(
                "aria-pressed",
                String(estaSonando)
            );

            botonFlotante.setAttribute(
                "aria-label",
                estaSonando
                    ? "Pausar música"
                    : "Reproducir música"
            );
        }

        if (iconoFlotante) {
            iconoFlotante.textContent =
                estaSonando ? "Ⅱ" : "▶";
        }
    }

    async function alternarMusica() {
        try {
            if (audio.paused) {
                await audio.play();
            } else {
                audio.pause();
            }
        } catch (error) {
            console.error(
                "No se pudo reproducir la música:",
                error
            );
        }

        actualizarEstado();
    }

    /* Botón principal */
    if (botonPrincipal) {
        botonPrincipal.addEventListener(
            "click",
            alternarMusica
        );
    }

    /* Botón flotante */
    if (botonFlotante) {
        botonFlotante.addEventListener(
            "click",
            alternarMusica
        );
    }

    /* Retroceder 10 segundos */
    if (botonRetroceder) {
        botonRetroceder.addEventListener("click", () => {
            audio.currentTime = Math.max(
                0,
                audio.currentTime - 10
            );
        });
    }

    /* Adelantar 10 segundos */
    if (botonAdelantar) {
        botonAdelantar.addEventListener("click", () => {
            audio.currentTime = Math.min(
                audio.duration || audio.currentTime + 10,
                audio.currentTime + 10
            );
        });
    }

    audio.addEventListener("play", actualizarEstado);
    audio.addEventListener("pause", actualizarEstado);
    audio.addEventListener("ended", actualizarEstado);

    actualizarEstado();
});
/* ==================================================
   CUENTA REGRESIVA
================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /*
      Fecha de la fiesta:
      12 de septiembre de 2026, 7:00 p. m.
      Hora de Perú: UTC-5
    */
    const fechaFiesta = new Date(
        "2026-09-12T19:00:00-05:00"
    ).getTime();

    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");

    if (
        !elementoDias ||
        !elementoHoras ||
        !elementoMinutos ||
        !elementoSegundos
    ) {
        console.error(
            "No se encontraron todos los elementos del contador."
        );

        return;
    }

    function completarNumero(numero) {
        return String(numero).padStart(2, "0");
    }

    function actualizarContador() {
        const ahora = Date.now();
        const diferencia = fechaFiesta - ahora;

        if (diferencia <= 0) {
            elementoDias.textContent = "00";
            elementoHoras.textContent = "00";
            elementoMinutos.textContent = "00";
            elementoSegundos.textContent = "00";

            clearInterval(intervaloContador);

            return;
        }

        const dias = Math.floor(
            diferencia / (1000 * 60 * 60 * 24)
        );

        const horas = Math.floor(
            (diferencia / (1000 * 60 * 60)) % 24
        );

        const minutos = Math.floor(
            (diferencia / (1000 * 60)) % 60
        );

        const segundos = Math.floor(
            (diferencia / 1000) % 60
        );

        elementoDias.textContent =
            completarNumero(dias);

        elementoHoras.textContent =
            completarNumero(horas);

        elementoMinutos.textContent =
            completarNumero(minutos);

        elementoSegundos.textContent =
            completarNumero(segundos);
    }

    actualizarContador();

    const intervaloContador = setInterval(
        actualizarContador,
        1000
    );
});