import { WebClient } from '@slack/web-api'
import dotenv from 'dotenv'
import { getToday } from './utils/date.js'
import { readBirthdays } from './utils/fileReader.js'
import cron from "node-cron"


dotenv.config()


const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const client = new WebClient(SLACK_BOT_TOKEN)
const channelId = process.env.CHANNEL_ID


const birthdays = readBirthdays('./data/birthdays.json')


async function sendBirthdayMessage(userId, name, lang) {
    try {

        if (lang === 'es') {
            await client.chat.postMessage({
                channel: channelId,
                text: `¡Hoy estamos de fiesta 🎂✨!
                Feliz cumple <@${userId}> !!! Que este nuevo año te traiga salud, éxitos y mucha felicidad 🥳🎉🌵`
            })
            console.log(`Mensagem enviada para ${name}`)
        }

        else if (lang === 'pt') {
            await client.chat.postMessage({
                channel: channelId,
                text: `Hoje é dia de comemorar 🎂✨!
                Parabens <@${userId}> !!! Que seu novo ciclo seja cheio de saúde, sucesso e muitas alegrias 🥳🎉🌵`
            })
            console.log(`Mensagem enviada para ${name}`)
        }

    } catch (error) {
        console.error("erro ao enviar", error)
    }
}


cron.schedule('0 6 * * *', async () => {
    const today = getToday()
    const aniversariantes = birthdays.filter(
        b => b.date === today && (b.lang === 'es' || b.lang === 'pt')
    )

    if (aniversariantes.length > 0) {
        for (const b of aniversariantes) {
            console.log(`Hoje é aniversário de: ${b.name} (${b.user})`)
            await sendBirthdayMessage(b.user, b.name, b.lang)
        }
    } else {
        console.log('nenhum aniversario hoje')
    }
})













































//curioso
