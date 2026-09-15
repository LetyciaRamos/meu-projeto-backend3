// A palavra "class" define que estamos criando um molde.
// A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts).

export class Player {
    public name:string; // O nome do jogador
    public health:number; // A saude do jogador (número)
    public level:number; // O nivel do jogador (número)

    // construtores (o construtor é um metodo especial que executado
    // automaticamente quando a classe é instanciada uma unica vez)
    constructor(name: string, health: number = 100, level: number = 1) {
        // A palavra "this" faz referencia a propria classe, ou seja:
        // Pegue o atributo "name" da classe Player e atribua o valor 
        // do parametro "name a ele"
        this.name =name;
        this.health =health;
        this.level =level;
    }

    // metodos (comportamentos da classe)
    // metodos sao as "funçoes" que a classe pode executar, ou seja, são
    // comportamentos da classe
    // o metodo "attack" é um metodo que retorna um string.
    public attack(): string {
    const damage = this.level =10; // calcula o dano baseado no nivel do jogador
    return `{this.name} atacou e causou ${damage} de dano! `

    }

    // O método "takeDemage" é um método que recebe um número como parâmetro e
    // não retorna nada (void).
        public takeDemage(amount: number): string {
        this.health -= amount; // Reduz a saúde do jogador pelo valor do parâmetro
        // Regra para garantir que a saúde não fique negativa
        if (this.health < 0) {
            this.health = 0; // Garante que a saúde não fique negativa
            return `${this.name} foi derrotado!`
        }

        return `${this.name} recebeu ${amount} de dano agora tem ${this.health} de saúde.;`
    }
}







    






