const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const FILE_PATH = path.join(__dirname, 'contador.json');

// Função para ler os dados do arquivo JSON
function lerDados() {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data) || {};
    } catch (err) {
        return {}; // Retorna um objeto vazio se o arquivo não existir
    }
}
// Função para salvar os dados no arquivo JSON
function salvarDados(dados) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(dados, null, 2), 'utf8');
}
// Função para calcular o total de acessos de todos os usuários
function calcularTotalAcessos(dados) {
    let total = 0;
    for (const chave in dados) {
        if (dados.hasOwnProperty(chave)) {
            total += dados[chave].acesso; // Soma os acessos de cada usuário
        }
    }
    return total;
    //ou
    //return Object.values(dados).reduce((total, acessos) => total + acessos, 0);
}

function ultimoAcesso(){
    let data = new Date().toLocaleDateString()
    let hora = new Date().toLocaleTimeString()
    return `${data} - ${hora}`
}

// Criando o servidor HTTP
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if (parsedUrl.pathname === "/") {
        // Página inicial com formulário para digitar o nome
        res.writeHead(200, { 'Content-Type': 'text/html ;charset=utf-8 ' });
        res.end(`
    <h1>Contador de Acessos</h1>
    <form action="/contar" method="GET">
    <label>Digite seu nome:</label>
    <input type="text" name="nome" required>
    <button type="submit">Entrar</button>
    </form>
    `);
    } else if (parsedUrl.pathname === "/contar") {
        const nome = parsedUrl.query.nome ? parsedUrl.query.nome.trim() : "Anônimo";
        if (!nome) {
            res.writeHead(400, { 'Content-Type': 'text/plain ;charset=utf-8 ' });
            res.end("Nome inválido.");
            return;
        }
        let dados = lerDados();
        if (!dados[nome]) {
            dados[nome] = {
                "acesso": 1,
                "ultimoacesso": ultimoAcesso()
            };
            console.log('entrou', dados[nome]) // Primeiro acesso do usuário
        } else {
            dados[nome].acesso++;
            dados[nome].ultimoacesso = ultimoAcesso() // Incrementa o contador do usuário
        }
        salvarDados(dados);
        const totalAcessos = calcularTotalAcessos(dados);
        console.log(dados)
        res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
        res.end(`
        <h1>Bem-vindo, ${nome}!</h1>
        <p>Você acessou esta página <strong>${dados[nome].acesso}</strong> vezes.</p>
        <p>Último acesso: ${dados[nome].ultimoacesso}</p>
        <p><strong>Total de acessos de todos os usuários:</strong> ${totalAcessos}</p>
        <br>
        <a href="/">Voltar</a>
        `);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain;charset=utf-8' });
        res.end('Página não encontrada.');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
console.log(`Servidor rodando em http://localhost:${PORT}`);
});