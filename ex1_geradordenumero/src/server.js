const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if(req.url === '/'){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <h1>Gerador de n. aleatórios</h1>
            <form action="/numero" id="formulario">
                <label for="min">Escolha o número minimo:</label> <br>
                <input type="text" id="min" name="min"> <br>
                <label for="max">Escolha o número máximo:</label> <br>
                <input type="text" id="max" name="max"> <br>
                <button type="submit">Verificar número aleatório</button>
            </form>
            
            <script>
                
            </script>
        `);
    }else if(req.url.includes('/numero')){
        const min = Number(parsedUrl.query.min)
        const max = Number(parsedUrl.query.max)
        let numRandom;
        
        if(min && max)
            numRandom = Math.floor(Math.random() * (max - min + 1) + min)
        else
            numRandom = Math.floor(Math.random() * 100)

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <h1>Gerador de n. aleatórios</h1>
            <p>Número aleatório ${numRandom}</p>
            `)
    }else{
        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'})
        res.end(`
            <h1>Página não encontrada</h1>
            <a href="/">Voltar para o ínicio</a>
            `)
    }
});

server.listen(3000, () => console.log("Servidor rodando na porta 3000"));
