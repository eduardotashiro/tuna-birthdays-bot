import { WebClient } from '@slack/web-api'
import dotenv from 'dotenv'
import { getBirthdaysToday } from '../db/dbQueries.js'
import cron from "node-cron"

dotenv.config()


const slackBotToken = process.env.SLACK_BOT_TOKEN
const channelId = process.env.CHANNEL_ID

const client = new WebClient(slackBotToken)


cron.schedule( '30 6 * * *', async () => { //6:30 da matina

    const aniversariantes = await getBirthdaysToday()

    if (aniversariantes.length > 0) {
        for (const b of aniversariantes) {
            console.log(`Hoje é aniversário de: ${b.full_name} (${b.slack_id})`)
            await sendBirthdayMessage(b.slack_id, b.full_name, b.lang)
        }
    } else {
        console.log('nenhum aniversario hoje')
    }
})


async function sendBirthdayMessage(slack_id, full_name, lang) {
    try {

        if (lang === 'es') {
            await client.chat.postMessage({
                channel: channelId,
                text: `¡Hoy estamos de fiesta 🎂✨! 
Feliz cumple <@${slack_id}> !!! Que este nuevo año te traiga salud, éxitos y mucha felicidad 🥳🎉🌵`
            })
            console.log(`Mensagem enviada para ${full_name}`)
        }

        else if (lang === 'pt') {
            await client.chat.postMessage({
                channel: channelId,
                text: `Hoje é dia de comemorar 🎂✨! 
Parabens <@${slack_id}> !!! Que seu novo ciclo seja cheio de saúde, sucesso e muitas alegrias 🥳🎉🌵`
            })
            console.log(`Mensagem enviada para ${full_name}`)
        }

    } catch (error) {
        console.error("erro ao enviar", error)
    }
}



























































































// https://www.youtube.com/watch?v=zL19uMsnpSU&list=RDzL19uMsnpSU&start_radio=1
