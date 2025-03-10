class Game{
    #vida = 100;
    #ki = 80;
    #energia = 90;
    #semilla = 3;
    #userName = "";
    constructor(userName){
        return this.userName = userName;
    }
    getVida(){
        return this.#vida;
    }
    getKi(){
        return this.#ki;
    }
    getEnergia(){
        return this.#energia;
    }
    getSemilla(){
        return this.#semilla;
    }
    getUserName(){
        return this.#userName;
    }
    setVida(decremento){
        this.#vida -= decremento;
        this.#vida < 0 ? this.#vida = 0 : false;
    }
    atk_basico(jugador) {
        this.#ki = Math.max(this.#ki - 5, 0);
        this.#energia = Math.max(this.#energia - 10, 0);
        jugador.setVida(15);
    }

    atk_esp(jugador) {
        this.#ki = Math.max(this.#ki - 15, 0);
        this.#energia = Math.max(this.#energia - 15, 0);
        jugador.setVida(30);
    }

    SemillaErmitanio() {
        this.#vida = Math.min(this.#vida + 50, 100);
        this.#ki = Math.min(this.#ki + 40, 80);
        this.#energia = Math.min(this.#energia + 45, 90);
    }

    regenKi() {
        let nuevoKi = this.#ki + 15;
        this.#ki = nuevoKi > 80 ? 80 : nuevoKi; // No permite pasar de 80
    }
}
export default Game;