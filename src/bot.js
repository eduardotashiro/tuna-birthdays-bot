import { getBirthdaysToday } from '../db/dbQueries.js';
import { homeTab } from './homeTab/appHome.js';
import { config } from './config/env.js';
import { sendBirthdayMessage } from './services/birthdayService.js';
import cron from "node-cron";
import pkg from '@slack/bolt';
const { App } = pkg;

const app = new App({
    signingSecret: config.slack.slackSigningSecret,
    token: config.slack.slackBotToken,
})

homeTab(app);

cron.schedule('30 6 * * *', async () => {
    const birthdayPerson = await getBirthdaysToday()
    if (birthdayPerson.length > 0) {
        for (const b of birthdayPerson) {
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


await app.start(config.slack.port || 3000);
console.log("Tuna Birthday Running...");










































//Aniversários são engraçados, comemoramos o tempo que passou, mas esquecemos de agradecer o tempo que ainda temos, agradecer a quem ?