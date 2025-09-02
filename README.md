# Slack Birthday Bot 🎉

### Um bot em Node.js que envia automaticamente mensagens de aniversário no Slack para usuários de um canal específico.

Feito com [@slack/web-api](https://docs.slack.dev/tools/node-slack-sdk/web-api) e [node-cron](https://github.com/kelektiv/node-cron)

> O bot lê aniversários de um arquivo JSON local e envia uma mensagem personalizada no Slack no dia correto.

### Funcionalidades

* Envia mensagens de aniversário no canal 
Slack configurado

* Agendamento automático com node-cron

* Armazena aniversários em um JSON (data/birthdays.json)

### Pré-requisitos

* [Node.js 18+](https://nodejs.org/pt)

* Um token válido do Slack Bot (SLACK_BOT_TOKEN)

* Uma workspace Slack com permissões para criar apps

* Uma workspace Slack com permissões para criar apps/bots

* ID do canal do Slack onde as mensagens serão enviadas (CHANNEL_ID)

### Dependências

* [@slack/web-api](https://docs.slack.dev/tools/node-slack-sdk/web-api) -> SDK oficial do Slack para Node.js

* [node-cron](https://github.com/kelektiv/node-cron) -> Agendador de tarefas estilo cron

* [dotenv](https://github.com/motdotla/dotenv) -> Carrega variáveis de ambiente

* [fs(File System)](https://nodejs.org/api/fs.html) -> Mod nativo do Node.js para ler/escrever arquivos

### Instalação

1 - Clone o repo

```bash
git clone https://github.com/eduardotashiro/tuna-birthdays-bot.git
```
2 - Instale as dependências

```bash
npm install
```
3 - Crie o arquivo `.env` na raiz do projeto e adicione:

```bash
SLACK_BOT_TOKEN=seu_token_aqui

CHANNEL_ID=canal_aqui
```
4 - Crie o arquivo `data/birthdays.json` com a lista de aniversariantes:

```bash
[
  { "name": "Fulano", "user": "40028922", "date": "02-02" },
  { "name": "Ciclano", "user": "40038922", "date": "03-03" }
]
```
* `user`: ID do usuário no Slack

* `date`: formato MM-DD

5- Rode o projeto

```bash
npm start      # execução normal
npm run dev    # execução com nodemon (desenvolvimento)
```

### OBS: 

> O bot só funciona enquanto seu computador/servidor estiver ligado e rodando.

---

***MIT*** © **Eduardo Tashiro**
