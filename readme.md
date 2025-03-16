# Exercícios de Node.js

Este repositório contém quatro exercícios práticos desenvolvidos com Node.js. Cada exercício está organizado em sua própria pasta, contendo um diretório `src` onde está localizado o arquivo `server.js`. O objetivo desses exercícios é aprimorar habilidades na criação de servidores HTTP com Node.js e no tratamento de requisições e respostas.

## Estrutura do Repositório

```
/
|-- ex1_geradordenumero/
|   |-- src/
|   |   |-- server.js
|
|-- ex2_relogioonline/
|   |-- src/
|   |   |-- server.js
|
|-- ex3_contadoracessos/
|   |-- src/
|   |   |-- server.js
|
|-- ex4_conversortemperatura/
|   |-- src/
|   |   |-- server.js
|
|-- .gitignore
```

## Exercícios

### 1. Gerador de Número Aleatório
Cria um servidor HTTP que gera um número aleatório. O usuário pode definir um intervalo mínimo e máximo através dos parâmetros na URL:

- Exemplo de uso: `http://localhost:3000/?min=10&max=50`
- Se os parâmetros não forem informados, o intervalo padrão será de 1 a 100.

### 2. Relógio Online
Servidor HTTP que exibe a data e hora atuais no seguinte formato:

```
Data e Hora atual: 11/03/2025, 21:56:38
```
- Utiliza `new Date().toLocaleString()` para formatar a saída corretamente.

### 3. Contador de Acessos
Servidor que contabiliza o número de acessos de um usuário e registra a data e hora do último acesso.

- Exemplo de resposta:

```
Bem-vindo, João!
Você acessou esta página 5 vezes.
Último acesso: 12/03/2025 - 14:35:10
Total de acessos de todos os usuários: 20
```
- O contador é armazenado em um arquivo JSON.

### 4. Conversor de Temperatura
Cria um servidor HTTP que converte temperaturas entre Celsius (°C) e Fahrenheit (°F) com base nos parâmetros informados pelo usuário na URL:

- Exemplo de uso:
  - `http://localhost:3000/converter?temp=100&escala=c` (Converte de Celsius para Fahrenheit)
  - `http://localhost:3000/converter?temp=212&escala=f` (Converte de Fahrenheit para Celsius)
  - `http://localhost:3000/converter?temp=abc&escala=c` (Exibe mensagem de erro)

- Exemplo de resposta:

```
Conversor de Temperatura
Temperatura Original: 100°C
Temperatura Convertida: 212°F
```

```
Erro: Forneça uma temperatura válida e uma escala ('c' para Celsius ou 'f' para Fahrenheit).
```

## Como Executar os Exercícios

1. Clone este repositório:
   ```sh
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse a pasta do exercício desejado e instale as dependências (se necessário):
   ```sh
   cd ex1_geradordenumero/src  # Substitua pelo exercício desejado
   npm install
   ```
3. Execute o servidor:
   ```sh
   node server.js
   ```
4. Acesse a URL correspondente no navegador ou via Postman.

## Tecnologias Utilizadas

- Node.js
- JavaScript (ES6+)
- HTTP nativo do Node.js

## Contribuição

Sinta-se à vontade para contribuir com melhorias, sugestões e correções. Para isso, abra um pull request ou uma issue.

---