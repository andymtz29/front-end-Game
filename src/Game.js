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
    setVidaa(valor) {
        this.#vida = Math.min(valor, 100); // Asegura que no pase de 100
    }
    
    setVida(decremento){
        this.#vida -= decremento;
        this.#vida < 0 ? this.#vida = 0 : false;
    }

    setKi(valor) {
        this.#ki = Math.min(valor, 80); // Evita que pase de 80
    }
    setEnergia(valor) {
        this.#energia = Math.min(valor, 90); // Evita que pase de 90
    }  

    atk_basico(jugador) {
        this.#ki = Math.max(this.#ki - 5, 0);
        this.#energia = Math.max(this.#energia - 10, 0);
        jugador.setVida(15);
    }
    atk_esp(jugador) {
        this.#ki = Math.max(this.#ki - 20, 0);  // Aumenta la reducción de Ki
        this.#energia = Math.max(this.#energia - 25, 0);  // Aumenta la reducción de Energía
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