import Swal from 'sweetalert2';
import Game from './Game.js';

// Variables globales
let btn_player1 = document.getElementById('btn_player1');
let btn_player2 = document.getElementById('btn_player2');
let player1, player2, pj1 = '', pj2 = '', aceptar = 0;
let turno = 1;
let turnosJugador1 = 0;
let turnosJugador2 = 0;


const iniciarMusicaFondo = () => {
    const musicaFondo = document.getElementById('musica-fondo');
    if (musicaFondo) {
        musicaFondo.volume = 0.5; // Ajusta el volumen (opcional)
        musicaFondo.play(); // Inicia la música
    } else {
        console.error('El elemento de música de fondo no se encontró.');
    }
};
const historial = {
    player1: {
        victorias: 0,
        derrotas: 0
    },
    player2: {
        victorias: 0,
        derrotas: 0
    }
};

// Función para alternar el turno entre jugadores
const alternarTurno = () => {
    if (turno === 1) {
        turnosJugador1++; // Incrementar el contador de turnos del Jugador 1
    } else {
        turnosJugador2++; // Incrementar el contador de turnos del Jugador 2
    }
    turno = turno === 1 ? 2 : 1; // Cambia el turno
    actualizarBotones(); // Actualiza los botones según el turno
};

// Función para actualizar el historial de victorias y derrotas
const actualizarHistorial = (ganador, perdedor) => {
    historial[ganador].victorias++;
    historial[perdedor].derrotas++;

    const historialElement = document.getElementById('historial');
    if (historialElement) {
        historialElement.innerHTML = `
            <p><span class="ganador">Jugador 1</span> - Victorias: ${historial.player1.victorias} | Derrotas: ${historial.player1.derrotas}</p>
            <p><span class="perdedor">Jugador 2</span> - Victorias: ${historial.player2.victorias} | Derrotas: ${historial.player2.derrotas}</p>
        `;
    } else {
        console.error('El elemento con id "historial" no existe en el DOM.');
    }
};

const actualizarBotones = () => {
    if (turno === 1) {
        // Habilitar botones del Jugador 1 y deshabilitar los del Jugador 2
        document.getElementById('btn_atk_py1').disabled = false;
        document.getElementById('btn_esp_py1').disabled = turnosJugador1 % 2 !== 0; // Solo habilitar si es par
        document.getElementById('btn_ermi_py1').disabled = false;
        document.getElementById('btn_ki_py1').disabled = false;

        document.getElementById('btn_atk_py2').disabled = true;
        document.getElementById('btn_esp_py2').disabled = true;
        document.getElementById('btn_ermi_py2').disabled = true;
        document.getElementById('btn_ki_py2').disabled = true;
    } else {
        // Habilitar botones del Jugador 2 y deshabilitar los del Jugador 1
        document.getElementById('btn_atk_py1').disabled = true;
        document.getElementById('btn_esp_py1').disabled = turnosJugador2 % 2 !== 0; // Solo habilitar si es par
        document.getElementById('btn_ermi_py1').disabled = true;
        document.getElementById('btn_ki_py1').disabled = true;

        document.getElementById('btn_atk_py2').disabled = false;
        document.getElementById('btn_esp_py2').disabled = false;
        document.getElementById('btn_ermi_py2').disabled = false;
        document.getElementById('btn_ki_py2').disabled = false;
    }
};


// Lógica para iniciar el juego
const iniciar_player1 = () => {
    document.getElementById('player1').classList.add("d-none");
    aceptar++;
    if (aceptar === 2) {
        document.getElementById('iniciar_juego').classList.remove('d-none');
        let timerInterval;
        Swal.fire({
            title: "INICIAR COMBATE",
            html: "EN <b>3</b> segundos",
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                if (timer) {
                    timer.textContent = "3";
                    timerInterval = setInterval(() => {
                        let timeLeft = Swal.getTimerLeft();
                        timer.textContent = Math.floor(timeLeft / 1000);
                    }, 1000);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
                Swal.fire({
                    title: "Inicia el jugador 1",
                    text: "El jugador 2 no podrá hacer nada hasta que el jugador 1 haga un movimiento",
                    icon: "success"
                });
                actualizarBotones(); // Habilitar botones del Jugador 1 al inicio
                iniciarMusicaFondo(); // Iniciar la música de fondo
            }
        });
    }
};

const iniciar_player2 = () => {
    document.getElementById('player2').classList.add("d-none");
    aceptar++;
    if (aceptar === 2) {
        document.getElementById('iniciar_juego').classList.remove('d-none');
        let timerInterval;
        Swal.fire({
            title: "INICIAR COMBATE",
            html: "EN <b>3</b> segundos",
            timer: 3000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                if (timer) {
                    timer.textContent = "3";
                    timerInterval = setInterval(() => {
                        let timeLeft = Swal.getTimerLeft();
                        timer.textContent = Math.floor(timeLeft / 1000);
                    }, 1000);
                }
            },
            willClose: () => {
                clearInterval(timerInterval);
                Swal.fire({
                    title: "Inicia el jugador 1",
                    text: "El jugador 2 no podrá hacer nada hasta que el jugador 1 haga un movimiento",
                    icon: "success"
                });
                actualizarBotones(); // Habilitar botones del Jugador 1 al inicio
                iniciarMusicaFondo(); // Iniciar la música de fondo
            }
        });
    }
};

// Selección de personajes
let seleccion1 = document.getElementById('player1_seleccion');
seleccion1.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        pj1 = event.target.alt;
        seleccion1.querySelectorAll('img').forEach((img) => {
            img.classList.remove('btn-warning');
            img.classList.add('btn-danger');
        });
        event.target.classList.remove('btn-danger');
        event.target.classList.add('btn-warning');
        console.log("Personaje 1 seleccionado:", pj1);
    }
});

let seleccion2 = document.getElementById('player2_seleccion');
seleccion2.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        pj2 = event.target.alt;
        seleccion2.querySelectorAll('img').forEach((img) => {
            img.classList.remove('btn-warning');
            img.classList.add('btn-danger');
        });
        event.target.classList.remove('btn-danger');
        event.target.classList.add('btn-warning');
        console.log("Personaje 2 seleccionado:", pj2);
    }
});

// Eventos para los botones de inicio
btn_player1.addEventListener('click', () => {
    let user_name1 = document.getElementById('user_name1').value;
    if (!user_name1) {
        Swal.fire({
            title: "Advertencia para el jugador 1",
            text: "Debes ingresar un nombre de usuario.",
            icon: "warning"
        });
    } else {
        player1 = new Game(user_name1);
        if (!pj1) {
            Swal.fire({
                title: "Advertencia para el jugador 1",
                text: "Debes elegir un personaje.",
                icon: "warning"
            });
        } else {
            document.getElementById('p1').innerText = user_name1.toUpperCase();
            document.getElementById('avatar1').src = `./public/img/${pj1}/base.png`;
            iniciar_player1();
        }
    }
});

btn_player2.addEventListener('click', () => {
    let user_name2 = document.getElementById('user_name2').value;
    if (!user_name2) {
        Swal.fire({
            title: "Advertencia para el jugador 2",
            text: "Debes ingresar un nombre de usuario.",
            icon: "warning"
        });
    } else {
        player2 = new Game(user_name2);
        if (!pj2) {
            Swal.fire({
                title: "Advertencia para el jugador 2",
                text: "Debes elegir un personaje.",
                icon: "warning"
            });
        } else {
            document.getElementById('p2').innerText = user_name2.toUpperCase();
            document.getElementById('avatar2').src = `./public/img/${pj2}/base.png`;
            iniciar_player2();
        }
    }
});

// Función para reiniciar los valores del juego (vida, ki, energía, etc.)
const reiniciarValores = () => {
    player1.setVidaa(100); // Restablece la vida del jugador 1 a 100
    player1.setKi(80); // Restablece el ki del jugador 1 a 80
    player1.setEnergia(90); // Restablece la energía del jugador 1 a 90
    
    player2.setVidaa(100); // Restablece la vida del jugador 2 a 100
    player2.setKi(80); // Restablece el ki del jugador 2 a 80
    player2.setEnergia(90); // Restablece la energía del jugador 2 a 90

    // Restablecer las semillas del ermitaño
    document.getElementById('se_p1').innerText = 3; // Restablece las semillas del Jugador 1 a 3
    document.getElementById('se_p2').innerText = 3; // Restablece las semillas del Jugador 2 a 3
    

    // Actualizar las barras de progreso en la interfaz
    actualizarBarra("vida_py1", 100);
    actualizarBarra("ki_py1", 100);
    actualizarBarra("energia_py1", 100);

    actualizarBarra("vida_py2", 100);
    actualizarBarra("ki_py2", 100);
    actualizarBarra("energia_py2", 100);

    // Reiniciar los contadores de turnos
    turnosJugador1 = 0;
    turnosJugador2 = 0;

    // Reiniciar el turno al Jugador 1
    turno = 1;
    actualizarBotones();
};

// Función auxiliar para actualizar la barra de progreso
const actualizarBarra = (id, porcentaje) => {
    document.getElementById(id).style.width = `${porcentaje}%`;
    document.getElementById(id).innerText = `${porcentaje}%`;
};

// Modificar el diálogo de fin de juego para ofrecer revancha
const mostrarDialogoRevancha = (mensaje, ganador, perdedor) => {
    const sonidoDerrota = document.getElementById('sonido-derrota');
    if (sonidoDerrota) sonidoDerrota.play(); // Reproduce el sonido
    actualizarHistorial(ganador, perdedor);
    Swal.fire({
        title: "¡GAME OVER!",
        text: mensaje,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Revancha",
        cancelButtonText: "Reiniciar todo",
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            // Reiniciar valores pero conservar personajes
            reiniciarValores();
        } else {
            // Reiniciar todo el juego
            location.reload();
        }
    });
};


//Jugador 1 -----------------------------------------------------------------------------------------------------------------------------------
document.getElementById("btn_atk_py1").addEventListener('click', () => {
    if (player1.getKi() < 5 || player1.getEnergia() < 10) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar!😵",
            color: "#d33",
            background: "#f5f5f5",
        });
        return;
    } else {
        player1.atk_basico(player2);
        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getEnergia() * 100) / 90);
        document.getElementById("energia_py1").style.width = `${porcentaje}%`;
        document.getElementById("energia_py1").innerText = `${porcentaje}%`;

        let vidaJugador2 = player2.getVida();
        porcentaje = parseInt((vidaJugador2 * 100) / 100);
        document.getElementById("vida_py2").style.width = `${porcentaje}%`;
        document.getElementById("vida_py2").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "Ataque Basico Jugador 1!",
            text: "AHHHHHH",
            width: 600,
            color: "#716add",
            background: "#f5f5f5",
            imageUrl: `./public/img/${pj1}/basico.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Basico",
            backdrop: "rgb(135, 204, 239,0.4)",
        });

        if (vidaJugador2 <= 0) {
            mostrarDialogoRevancha("El Jugador 2 ha sido derrotado 🏆","player1","player2");
        } else {
            alternarTurno(); // Cambia el turno al Jugador 2
        }
    }
});

document.getElementById("btn_esp_py1").addEventListener('click', () => {
        if (turnosJugador1 % 2 !== 0) {
            Swal.fire({
                icon: "error",
                title: "Ataque especial no disponible",
                text: "¡Solo puedes usar el ataque especial cada dos turnos!",
                color: "#d33",
                background: "#f5f5f5",
            });
            return;
        }
    if (player1.getKi() < 10 || player1.getEnergia() < 20) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar🪫!",
            color: "#d33",
            background: "#f5f5f5",
        });
        return;
    } else {
        player1.atk_esp(player2);
        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getEnergia() * 100) / 90);
        document.getElementById("energia_py1").style.width = `${porcentaje}%`;
        document.getElementById("energia_py1").innerText = `${porcentaje}%`;

        let vidaJugador2 = player2.getVida();
        porcentaje = parseInt((vidaJugador2 * 100) / 100);
        document.getElementById("vida_py2").style.width = `${porcentaje}%`;
        document.getElementById("vida_py2").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "Ataque Especial Jugador 1 💥!",
            text: "AHHHHHH",
            width: 600,
            color: "#716add",
            background: "#f5f5f5",
            imageUrl: `./public/img/${pj1}/especial.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Especial",
            backdrop: "rgb(135, 204, 239,0.4)",
        });

        if (vidaJugador2 <= 0) {
            mostrarDialogoRevancha("El Jugador 2 ha sido derrotado 🏆","player1","player2");
        } else {
            alternarTurno(); // Cambia el turno al Jugador 2
        }
    }
});

document.getElementById("btn_ermi_py1").addEventListener('click', () => {
    let semilla_Span = document.getElementById('se_p1');
    let contador_semilla = parseInt(semilla_Span.innerText);
    if (contador_semilla > 0) {
        contador_semilla--;
        semilla_Span.innerText = contador_semilla;
        player1.SemillaErmitanio(player1);

        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getEnergia() * 100) / 90);
        document.getElementById("energia_py1").style.width = `${porcentaje}%`;
        document.getElementById("energia_py1").innerText = `${porcentaje}%`;

        porcentaje = parseInt((player1.getVida() * 100) / 100);
        document.getElementById("vida_py1").style.width = `${porcentaje}%`;
        document.getElementById("vida_py1").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "CURACION!!",
            text: "CURANDO..🩹",
            width: 600,
            imageUrl: `./public/img/${pj1}/curar.png`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "curacion",
            backdrop: true,
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, red, gray)';
                document.querySelector('.swal2-popup').style.color = 'white';
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Sin semillas",
            text: "¡Te has quedado sin semillas, no puedes regenerarte!❌"
        });
    }
    alternarTurno(); // Cambia el turno al Jugador 2
});

document.getElementById("btn_ki_py1").addEventListener('click', () => {
    if (player1.getKi() >= 80) {
        Swal.fire({
            icon: "error",
            title: "Tu ki está al 100%",
            text: "¡No puedes regenerar más tu ki! 💯",
            color: "#d33",
            background: "#f5f5f5",
        });
    } else {
        player1.regenKi();
        let porcentaje = parseInt((player1.getKi() * 100) / 80);
        document.getElementById('ki_py1').style.width = `${porcentaje}%`;
        document.getElementById('ki_py1').innerText = `${porcentaje}%`;

        Swal.fire({
            title: "REGENERAR KI!!",
            text: "REGENERANDO.. 🛡",
            width: 600,
            imageUrl: `./public/img/${pj1}/energia.png`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "regeneracion",
            backdrop: true,
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, red, blue)';
                document.querySelector('.swal2-popup').style.color = 'white';
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
    }
    alternarTurno(); // Cambia el turno al Jugador 2
});
//Jugador 2 ----------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById("btn_atk_py2").addEventListener('click', () => {
    if (player2.getKi() < 5 || player2.getEnergia() < 10) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar 🪫!",
            color: "#d33",
            background: "#f5f5f5",
        });
        return;
    } else {
        player2.atk_basico(player1);
        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getEnergia() * 100) / 90);
        document.getElementById("energia_py2").style.width = `${porcentaje}%`;
        document.getElementById("energia_py2").innerText = `${porcentaje}%`;

        let vidaJugador1 = player1.getVida();
        porcentaje = parseInt((vidaJugador1 * 100) / 100);
        document.getElementById("vida_py1").style.width = `${porcentaje}%`;
        document.getElementById("vida_py1").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "Ataque Basico Jugador 2 🔥!",
            text: "AHHHHHH",
            width: 600,
            color: "#716add",
            background: "#f5f5f5",
            imageUrl: `./public/img/${pj2}/basico.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Basico",
            backdrop: "rgb(135, 204, 239,0.4)",
        });

        if (vidaJugador1 <= 0) {
            mostrarDialogoRevancha("El Jugador 1  ha sido derrotado 🏆","player2","player1");
        } else {
            alternarTurno(); // Cambia el turno al Jugador 2
        }
    }
});

document.getElementById("btn_esp_py2").addEventListener('click', () => {
        if (turnosJugador2 % 2 !== 0) {
            Swal.fire({
                icon: "error",
                title: "Ataque especial no disponible",
                text: "¡Solo puedes usar el ataque especial cada dos turnos!",
                color: "#d33",
                background: "#f5f5f5",
            });
            return;
        }
    if (player2.getKi() < 10 || player2.getEnergia() < 20) {
        Swal.fire({
            icon: "error",
            title: "Sin energía suficiente",
            text: "¡No tienes suficiente ki o energía para atacar!❌",
            color: "#d33",
            background: "#f5f5f5",
        });
        return;
    } else {
        player2.atk_esp(player1);
        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getEnergia() * 100) / 90);
        document.getElementById("energia_py2").style.width = `${porcentaje}%`;
        document.getElementById("energia_py2").innerText = `${porcentaje}%`;

        let vidaJugador1 = player1.getVida();
        porcentaje = parseInt((vidaJugador1 * 100) / 100);
        document.getElementById("vida_py1").style.width = `${porcentaje}%`;
        document.getElementById("vida_py1").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "Ataque Especial Jugador 2!",
            text: "AHHHHHH 💥",
            width: 600,
            color: "#716add",
            background: "#f5f5f5",
            imageUrl: `./public/img/${pj2}/especial.png`,
            imageWidth: 300,
            imageHeight: 300,
            imageAlt: "Ataque Especial",
            backdrop: "rgb(135, 204, 239,0.4)",
        });

        if (vidaJugador1 <= 0) {
            mostrarDialogoRevancha("El Jugador 1 ha sido derrotado 🏆","player2","player1");
        } else {
            alternarTurno(); // Cambia el turno al Jugador 2
        }
    }
});

document.getElementById("btn_ermi_py2").addEventListener('click', () => {
    let semilla_Span = document.getElementById('se_p2');
    let contador_semilla = parseInt(semilla_Span.innerText);
    if (contador_semilla > 0) {
        contador_semilla--;
        semilla_Span.innerText = contador_semilla;
        player2.SemillaErmitanio(player2);

        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getEnergia() * 100) / 90);
        document.getElementById("energia_py2").style.width = `${porcentaje}%`;
        document.getElementById("energia_py2").innerText = `${porcentaje}%`;

        porcentaje = parseInt((player2.getVida() * 100) / 100);
        document.getElementById("vida_py2").style.width = `${porcentaje}%`;
        document.getElementById("vida_py2").innerText = `${porcentaje}%`;

        Swal.fire({
            title: "Te haz comido una semilla del ermitaño!!",
            text: "Curando...🩹",
            width: 600,
            imageUrl: `./public/img/${pj2}/curar.png`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "curacion",
            backdrop: true,
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, red, blue)';
                document.querySelector('.swal2-popup').style.color = 'white';
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "Sin semillas",
            text: "¡Te has quedado sin semillas, no puedes regenerarte 🚫!"
        });
    }
    alternarTurno(); 
});

document.getElementById("btn_ki_py2").addEventListener('click', () => {
    if (player2.getKi() >= 80) {
        Swal.fire({
            icon: "error",
            title: "Tu ki está al 100%",
            text: "¡No puedes regenerar más tu ki!💯",
            color: "#d33",
            background: "#f5f5f5",
        });
    } else {
        player2.regenKi();
        let porcentaje = parseInt((player2.getKi() * 100) / 80);
        document.getElementById('ki_py2').style.width = `${porcentaje}%`;
        document.getElementById('ki_py2').innerText = `${porcentaje}%`;

        Swal.fire({
            title: "REGENERAR KI!!",
            text: "REGENERANDO..🛡",
            width: 600,
            imageUrl: `./public/img/${pj2}/energia.png`,
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: "regeneracion",
            backdrop: true,
            customClass: {
                popup: 'custom-swal'
            },
            didOpen: () => {
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, blue, red)';
                document.querySelector('.swal2-popup').style.color = 'white';
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
    }
    alternarTurno(); 
});