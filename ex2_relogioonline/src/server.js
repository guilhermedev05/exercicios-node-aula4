const http = require("http")

const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'})
        res.end(`
            <h1>Relógio Online</h1>
            <p id="hora"></p>
            <script>
                const atualizarHora = () => {
                    fetch('/hora')
                    .then(response => response.text())
                    .then(data => {
                        document.getElementById('hora').innerHTML = '' + data
                        })
                }

                setInterval(atualizarHora, 1000)
            </script>
            `)
    }else if (req.url === '/hora') {
        res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'})
        let data = new Date().toLocaleDateString()
        let hora = new Date().toLocaleTimeString()
        let formatacao = `Data: ${data} <br> Hora atual: ${hora}`
        res.end(formatacao)

    }else{
        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'})
        res.end("<h1>Página não encontrada</h1>")
    }
})

server.listen(3000, () => console.log('Servidor rodando'))