# Slack Birthday Bot 🎉

Bot que envia automaticamente mensagens de aniversário no Slack para usuários de um canal específico.  

Feito em Node.js usando `@slack/web-api` e `node-cron`.  

Permite enviar mensagens no dia do aniversário de cada usuário automaticamente.



## Funcionalidades

- Envia mensagem de aniversário no canal Slack definido.

- Usa JSON local para armazenar usuários e datas.

- Configuração via arquivo `.env`.
- Agendamento automático usando `node-cron`.


## Pré-requisitos

- Node.js 18+  

- Conta Slack e token de bot válido  

- Canal no Slack para enviar mensagens

## Instalação

1. Clone o repositório:

   ```
   git clone https://github.com/eduardotashiro/tuna-birthdays-bot.git
   cd tuna-birthdays-bot
   ```

2. Instale as dependências:
   ```
   npm iNSTALL
   ```

3.  Crie `.env` na raiz com suas credenciais Slack.

---

4. Adicione os aniversários em um arquivo json `data/birthdays.json`.

---

5. Como rodar`

```bash
npm start      #execução normal
npm run dev    # com nodemon para desenvolvimento
```
---

**Observação**: O bot só funciona enquanto o seu computador está ligado e o script rodando. Para rodar 24/7, considere um servidor na nuvem.

---

MIT © Eduardo Tashiro
  



