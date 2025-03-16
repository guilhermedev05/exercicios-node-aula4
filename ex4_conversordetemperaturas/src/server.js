const http = require("http");
const { parse } = require("path");
const url = require("url");

function converterCelsiusParaFahrenheit(temp){
    return (temp * 1.8) + 32
}

function converterFahrenheitParaCelsius(temp){
    return (temp - 32) / 1.8
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    if(req.url === '/'){
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <h1>Conversor de temperatura</h1>
            <form action="/converter" id="formulario">
                <label for="min">Digite a temperatura</label> <br>
                <input type="text" id="temp" name="temp"> <br> <br>
                <label for="escala">Converter para</label>
                <select name="escala" id="escala">
                    <option value="c" name="c">Celsius</option>
                    <option value="f" name="f">Fahrenheit</option>
                </select> <br> <br>
                <button type="submit">Verificar temperatura</button>
            </form>
            
            <script>
                
            </script>
        `);
    }else if(req.url.includes('/converter') && !isNaN(Number(parsedUrl.query.temp)) && parsedUrl.query.escala == 'c' || parsedUrl.query.escala == 'f'){
        console.log(Number(parsedUrl.query.temp))
        const temp = Number(parsedUrl.query.temp)
        const escala = parsedUrl.query.escala
        let tempConvertida;

        switch(escala){
            case 'c':
                tempConvertida = converterFahrenheitParaCelsius(temp)
                break;
            case 'f':
                tempConvertida = converterCelsiusParaFahrenheit(temp)
        }

        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <h1>Conversor de Tempatura</h1>
            <p>Temperatura atual: ${temp}°${escala !== 'c' ? 'C' : 'F'}</p>
            <p>Temperatura convertida: ${tempConvertida.toFixed(2)}°${escala == 'c' ? 'C' : 'F'}</p>
            `)
    }else{
        res.writeHead(404, {'Content-type': 'text/html; charset=utf-8'})
        res.end(`
            <p>Erro: Forneça uma temperatura válida e uma escala ('c' para Celsius ou 'f' para Fahrenheit).</p>
            `)
    }
});

server.listen(3000, () => console.log("Servidor rodando na porta 3000"));
