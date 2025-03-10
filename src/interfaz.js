import Swal from 'sweetalert2';
import Game from './Game.js';

let btn_player1 = document.getElementById('btn_player1');
let btn_player2 = document.getElementById('btn_player2');
let player1, player2, pj1 = '', pj2 = '', aceptar = 0;
let turno = 1; // 1 para Jugador 1, 2 para Jugador 2

// Función para alternar el turno
const alternarTurno = () => {
    turno = turno === 1 ? 2 : 1; // Cambia el turno
    actualizarBotones(); // Actualiza los botones según el turno
};

// Función para actualizar los botones según el turno
const actualizarBotones = () => {
    if (turno === 1) {
        // Habilitar botones del Jugador 1 y deshabilitar los del Jugador 2
        document.getElementById('btn_atk_py1').disabled = false;
        document.getElementById('btn_esp_py1').disabled = false;
        document.getElementById('btn_ermi_py1').disabled = false;
        document.getElementById('btn_ki_py1').disabled = false;

        document.getElementById('btn_atk_py2').disabled = true;
        document.getElementById('btn_esp_py2').disabled = true;
        document.getElementById('btn_ermi_py2').disabled = true;
        document.getElementById('btn_ki_py2').disabled = true;
    } else {
        // Habilitar botones del Jugador 2 y deshabilitar los del Jugador 1
        document.getElementById('btn_atk_py1').disabled = true;
        document.getElementById('btn_esp_py1').disabled = true;
        document.getElementById('btn_ermi_py1').disabled = true;
        document.getElementById('btn_ki_py1').disabled = true;

        document.getElementById('btn_atk_py2').disabled = false;
        document.getElementById('btn_esp_py2').disabled = false;
        document.getElementById('btn_ermi_py2').disabled = false;
        document.getElementById('btn_ki_py2').disabled = false;
    }
};

// Función para iniciar el jugador 1
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
            }
        });
    }
};

// Función para iniciar el jugador 2
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
            }
        });
    }
};

// Selección de personaje para el jugador 1
let seleccion1 = document.getElementById('player1_seleccion');
seleccion1.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        pj1 = event.target.alt; // Asigna el nombre del personaje

        // Remueve la clase 'btn-warning' de todas las imágenes y agrega 'btn-danger'
        seleccion1.querySelectorAll('img').forEach((img) => {
            img.classList.remove('btn-warning');
            img.classList.add('btn-danger');
        });

        // Agrega la clase 'btn-warning' a la imagen seleccionada
        event.target.classList.remove('btn-danger');
        event.target.classList.add('btn-warning');

        console.log("Personaje 1 seleccionado:", pj1); // Depuración
    }
});

// Selección de personaje para el jugador 2
let seleccion2 = document.getElementById('player2_seleccion');
seleccion2.addEventListener('click', (event) => {
    if (event.target.tagName === 'IMG') {
        pj2 = event.target.alt; // Asigna el nombre del personaje

        // Remueve la clase 'btn-warning' de todas las imágenes y agrega 'btn-danger'
        seleccion2.querySelectorAll('img').forEach((img) => {
            img.classList.remove('btn-warning');
            img.classList.add('btn-danger');
        });

        // Agrega la clase 'btn-warning' a la imagen seleccionada
        event.target.classList.remove('btn-danger');
        event.target.classList.add('btn-warning');

        console.log("Personaje 2 seleccionado:", pj2); // Depuración
    }
});

// Iniciar jugador 1
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

// Iniciar jugador 2
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
//Jugador 1 ---------------------------------------------------------------------------
// Ataque básico jugador 1
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
            Swal.fire({
                title: "¡GAME OVER!",
                text: "El Jugador 2 ha sido derrotado 🏆",
                icon: "warning",
                confirmButtonText: "Reiniciar",
                allowOutsideClick: false
            }).then(() => {
                location.reload();
            });
        } else {
            alternarTurno(); // Cambia el turno al Jugador 2
        }
    }
});

// Ataque especial jugador 1
document.getElementById("btn_esp_py1").addEventListener('click', () => {
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
            Swal.fire({
                title: "¡GAME OVER!",
                text: "El Jugador 2 ha sido derrotado🚫",
                icon: "warning",
                confirmButtonText: "Reiniciar",
                allowOutsideClick: false
            }).then(() => {
                location.reload();
            });
        } else {
            alternarTurno(); // Cambia el turno al Jugador 2
        }
    }
});

// Semillas del ermitaño jugador 1
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
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, yellow, gray)';
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

// Regeneración de ki jugador 1
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
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, yellow, gray)';
                document.querySelector('.swal2-popup').style.color = 'white';
                document.querySelector('.swal2-popup').style.borderRadius = '20px';
            }
        });
    }
    alternarTurno(); // Cambia el turno al Jugador 2
});
//Jugador 2 ---------------------------------------------------------------------------
// Ataque básico jugador 2
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
            Swal.fire({
                title: "¡GAME OVER!",
                text: "El Jugador 1 ha sido derrotado😵",
                icon: "warning",
                confirmButtonText: "Reiniciar",
                allowOutsideClick: false
            }).then(() => {
                location.reload();
            });
        } else {
            alternarTurno(); // Cambia el turno al Jugador 1
        }
    }
});

// Ataque especial jugador 2
document.getElementById("btn_esp_py2").addEventListener('click', () => {
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
            Swal.fire({
                title: "¡GAME OVER!",
                text: "El Jugador 1 ha sido derrotado 😵",
                icon: "warning",
                confirmButtonText: "Reiniciar",
                allowOutsideClick: false
            }).then(() => {
                location.reload();
            });
        } else {
            alternarTurno(); // Cambia el turno al Jugador 1
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
                document.querySelector('.swal2-popup').style.background = 'linear-gradient(to bottom right, yellow, gray)';
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