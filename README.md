# Slack Birthday Bot 🎉

- Um bot para Slack que envia mensagens de parabéns automaticamente para aniversariantes do dia, com suporte para português e espanhol

## Objetivo

- O bot foi criado para automatizar a comemoração de aniversários no Slack, garantindo que ninguém seja esquecido e que as mensagens cheguem de forma divertida e personalizada.

## Tecnologias

- Node.js
- PostgreSQL
- Slack Web API
- Node-cron
- dotenv
- Railway (deploy e bd)

## Estrutura do db

Tabela: `slack_users`

| Coluna     | Tipo | Restrição   | Descrição                       |
|------------|------|-------------|---------------------------------|
| slack_id   | TEXT | PRIMARY KEY | ID do usuário no Slack          |
| full_name  | TEXT | NOT NULL    | Nome completo do usuário        |
| lang       | TEXT | NOT NULL    | Idioma do usuário (pt ou es)    |
| birthday   | DATE | NOT NULL    | Data de aniversário (YYYY-MM-DD)|

> coloquei o ano fixo em 2000, mas eu trato isso com o `WHERE TO_CHAR(birthday, 'MM-DD') = $1`, vai estar em db/dbQueries.js


## Configuração

- Clone o repositório:

```bash
git clone https://github.com/eduardotashiro/tuna-birthdays-bot.git
cd tuna-birthdays-bot
```

- Instale as dependências:
`npm i`

- Configure as variáveis de ambiente (via Railway ou local):
```bash
SLACK_BOT_TOKEN=token_do_bot
CHANNEL_ID=canal_do_slack
DATABASE_URL=url_database
```
> SLACK_BOT_TOKEN - token do bot no Slack.

>CHANNEL_ID - canal onde o bot vai enviar as mensagens.

>DATABASE_URL - a URL do PostgreSQL do Railway (pública para testes locais, interna se for deploy no Railway).

## Cron

- O bot roda automaticamente todos os dias no horário configurado, usando node-cron.

 - Exemplo de agendamento para São Paulo(UTC-3):
 
```js
cron.schedule('30 6 * * *', async () => {
    //vai parabenizar as 06:30 da manhã
}, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
})
```

## Deploy

- O projeto está rodando no Railway, integrado com GitHub para deploy automático a cada push

- O banco PostgreSQL também está hospedado no Railway mas clone e use da maneira que preferi

## Contribuição

PR são bem-vindos! 

Para mudanças significativas, abra uma issue primeiro para discutir o que deseja alterar.

> ⚠️ Nunca commite seu `.env` com tokens do Slack ou credenciais do banco, é o basico mas sempre bom lembrar, isso vale para mim tambem kk

---

***MIT*** © **Eduardo Tashiro**
