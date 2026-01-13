import { getBirthdaysToday } from '../db/dbQueries.js';
import { WebClient } from '@slack/web-api';
import { homeTab } from './homeTab/appHome.js';
import {config} from './config/env.js';
import cron from "node-cron";
import pkg from '@slack/bolt';
const { App } = pkg;

const app = new App({
    signingSecret: config.slack.slackSigningSecret,
    token: config.slack.slackBotToken,
})

homeTab(app);


const channelId = config.slack.channelId;
const SLACK_BOT_TOKEN = config.slack.slackBotToken;
const client = new WebClient(SLACK_BOT_TOKEN)


cron.schedule('30 6 * * *', async () => {

    const aniversariantes = await getBirthdaysToday()

    if (aniversariantes.length > 0) {
        for (const b of aniversariantes) {
            console.log(`Hoje é aniversário de: ${b.full_name} (${b.slack_id})`)
            await sendBirthdayMessage(b.slack_id, b.full_name, b.lang)
        }
    } else {
        console.log('nenhum aniversario hoje')
    }
},
    {
        scheduled: true,
        timezone: "America/Sao_Paulo"
    }

)


async function sendBirthdayMessage(slack_id, full_name, lang) {
    try {

        if (lang === 'es') {
            await client.chat.postMessage({
                channel: channelId,
                text: `¡Hoy estamos de fiesta 🎂✨
Feliz cumple <@${slack_id}> !!! Que este nuevo año te traiga salud, éxitos y mucha felicidad 🥳🎉🌵`
            })
            console.log(`Mensagem enviada para ${full_name}`)
        }

        else if (lang === 'pt') {
            await client.chat.postMessage({
                channel: channelId,
                text: `Hoje é dia de comemorar 🎂✨
Parabéns <@${slack_id}> !!! Que seu novo ciclo seja cheio de saúde, sucesso e muitas alegrias 🥳🎉🌵`
            })
            console.log(`Mensagem enviada para ${full_name}`)
        }

    } catch (error) {
        console.error("erro ao enviar", error)
    }
}


await app.start(config.slack.port || 3000);
console.log("Tuna Birthday running");










































//Aniversários são engraçados, comemoramos o tempo que passou, mas esquecemos de agradecer o tempo que ainda temos, agradecer a quem ?