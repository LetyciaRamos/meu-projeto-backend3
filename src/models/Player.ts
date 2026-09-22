// A palavra "class" define que estamos criando um molde.
// A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts).
export class Player {
    public name: string ; // O nome do jogador (texto)
    public health: number ; // A saúde do jogador (número)
    public level: number ;

    // Construtores (O construtor é um método especial que é executado automaticamente quando a classe é instanciada uma única vez)

    constructor ( name : string , health: number = 100 , level : number = 1 ) {
        // A palavra "this" faz referência a própria classe, ou seja:
        // "Pegue o atributo 'name' da classe Player e atribua o valor do parâmetro 'name' a ele".
        this. name = name ;
        this. health = health ;
        this. level = level ;
    }
    // Métodos (Comportamentos da Classe)
    // Métodos são "funções" que a classe pode executar, ou seja, são os comportamentos da classe.
    // O método "attack" é um método que retorna uma string.
    public attack (): string {
        const damage = this. level * 10 ; // Calcula o dano baseado no nível do jogador
        return  `${ this. name } atacou e causou ${ damage } de dano! `;
    }
    // O método "takeDamage" é um método que recebe um número como parâmetro e não retorna nada (void).
    public takeDamage ( damage : number ) : string {
        this. health -= damage ; // Reduz a saúde do jogador pelo valor do parâmetro
        if (this. health < 0 ) {
            this. health = 0 ; // Garante que a saúde não fique negativa
            return  `${ this. name } foi derrotado`;
        }
        return `${ this. name } recebeu ${ damage } de dano e agora tem ${ this. health } de saúde.` ;
    }
    public takeHealth ( health : number ) : string {
        this. health += health ; // Aumenta a saúde do jogador pelo valor do parâmetro    
        if (this. health > 100 ) {
            this. health = 100 ; // Garante que a saúde não ultrapasse 100
        }
        return  `${ this. name } recuperou ${ health } de saúde e agora tem ${ this. health } de saúde. `;
    }
    public levelUp ( level : number ) : string {
        this. level += level ; // Aumenta o nível do jogador pelo valor do parâmetro
        if (this. level > 100 ) {
            this. level = 100 ; // Garante que o nível não ultrapasse 100
        }
        return ` ${ this. name } subiu para o nível ${ this. level } ! `;
    }
};

    
    


    




    








    






