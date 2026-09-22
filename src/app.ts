// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";

import fs from "fs"
// importa a classe Player do arquivo Player.ts
import { Player } from "./models/Player.js";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// middleware para permitir que o servidor aceite requisições com corpo em formato JSON
app.use(express.json());
// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Define o nome do diretorio onde os arquivos serão armazenados
const DATA_FILE = "./data/players.json";

/*
Função para garantir que o diretorio de dados exista amtes de salvar os arquivos.
Se o diretorio não existir, ele será criado.
*/
function ensureDataFolderExists () {
    const dataFolder = "./data";
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
}

// Chamar a função para garantir que o diretório de dados exista
// antes de qualquer operação de leitura ou escrita de arquivos
ensureDataFolderExists();

// Função para salvar os dados do player em um arquivo JSON
function savePlayerState(player: Player) {
    // Converte o objeto player em uma string JSON
    const data = JSON.stringify(player, null, 2);
    // Salva o string JSON no arquivo definido em DATA_FILE
    fs.writeFileSync(DATA_FILE, data, "utf-8");
}

// Função para carregar os dados do player de um arquivo JSON
function loadPlayerState(): Player {
    // Verifica se o arquivo de dados existe
    if (fs.existsSync(DATA_FILE)) {
        // Lê o conteúdo do arquivo e converte de volta para um objeto Player
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        const playerData = JSON.parse(data);

        /* ATENÇÃO: JSON.parse() retorna um objeto "puro"
        (sem os métodos da classe Player).
        Para que o objeto tenha os métodos da classe Player, precisamos criar
        uma nova instância da classe Player e passar os dados carregados 
        para o construtor.
        */
            return new Player(playerData.name, playerData.health, playerData.level);
    }
    // Cria um novo player se não existir com nome "Jogador1", 100 de vida e nível 1
    const newPlayer = new Player("Hero", 100, 5); 
    savePlayerState(newPlayer);
    return newPlayer;
}

// Inicializa o player carregando seu estado do arquivo JSON
let player: Player = loadPlayerState();



// rota GET para obter informações do jogador
// quando o usuário acessar a rota "/player", o servidor responderá com os dados do jogador
// a função de callback recebe dois parâmetros: req (requisição) e res (resposta)

let player1: Player = new Player("Hero, 100, 5")

app.get("/player", (req: Request, res: Response) => {
    res.json({
        message: "Informações do jogador",
        player: player1
    });
});

app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player.attack();
        res.json({
        message: attackMessage,
    });
});  

//rota POST para o jogador atacar
// quando o usuário acessar a rota "/player/attack", o servidor chamará o método attack() do jogador
// é utilizada para enviar dados ou realizar ações que alteram o estado do servidor, como neste caso
//onde o jogador realiza uma ação (como acionar um comportamento de ataque), que é o método attack() do jogador.
// a função de callback recebe dois parâmetros: req (requisição) e res (resposta)

app.post("/player/takeDamage", (req: Request, res: Response) => {
    const { damage } = req.body;
    const damageMessage = player.takeDamage(damage);
    // Salvar o estado atual atual do player do arquivo JSON
    savePlayerState(player);
    res.json({
        action: damageMessage,
        currentHealth: player.health,
        currentLevel: player.level
    })
})
    app.post ("/player/take-health", (req: Request, res:Response) => {   
    const { health } = req.body;
    const healthMessage = player1.takeHealth(health);
    savePlayerState(player1);
    res.json({
        action: healthMessage,
        currentHealth: player1.health,
        currentLevel: player1.level
    });
});
// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponíveis:");
    console.log(`GET http://localhost:${PORT}/player - Obter informações do jogador`);
    console.log(`POST http://localhost:${PORT}/player/attack - Jogador realiza um ataque`);
    console.log(`POST http://localhost:${PORT}/player/takeDamage - Jogador recebe dano`);
});




