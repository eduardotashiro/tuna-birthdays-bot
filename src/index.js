import { WebClient } from "@slack/web-api"
import dotenv from "dotenv"
import { readFileSync } from "fs"
import cron from "node-cron"

dotenv.config()

const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN
const client = new WebClient(SLACK_BOT_TOKEN)
const channelId = process.env.CHANNEL_ID


const data = readFileSync('./data/birthdays.json', 'utf-8')
const birthdays = JSON.parse(data)

// Função para pegar data
function getToday() {
    const today = new Date()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${mm}-${dd}`
}



// Função para enviar mensagem
async function sendBirthdayMessage(userId, name) {

    try {
        await client.chat.postMessage({
            channel: channelId,
            text: `Feliz Aniversário <@${userId}> !!! 🥳🎉🌵`
        })

        console.log(`Mensagem enviada para ${name}`)

    } catch (error) {
        console.error("erro ao enviar", error)
    }
}

cron.schedule('28 6 * * *', async () => {
    const today = getToday()
    const aniversariantes = birthdays.filter(b => b.date === today)

    if (aniversariantes.length > 0) {
        for (const b of aniversariantes) {
            console.log(`Hoje é aniversário de: ${b.name} (${b.user})`)
            await sendBirthdayMessage(b.user, b.name)
        }
    } else {
        console.log('nenhum aniversario hoje')
    }
})






































//curioso
