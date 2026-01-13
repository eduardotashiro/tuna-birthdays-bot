import { WebClient } from '@slack/web-api';
import { config } from '../config/env.js';

const channelId = config.slack.channelId;
const SLACK_BOT_TOKEN = config.slack.slackBotToken;
const client = new WebClient(SLACK_BOT_TOKEN);

export async function sendBirthdayMessage(slack_id, full_name, lang) {
    try {

        if (lang === 'es') {
            await client.chat.postMessage({
                channel: channelId,
                text: `¡Hoy estamos de fiesta 🎂✨
Feliz cumple <@${slack_id}> !!! Que este nuevo año te traiga salud, éxitos y mucha felicidad 🥳🎉🌵`
            });
            console.log(`Mensagem enviada para ${full_name}`);
        } else if (lang === 'pt') {
            await client.chat.postMessage({
                channel: channelId,
                text: `Hoje é dia de comemorar 🎂✨
Parabéns <@${slack_id}> !!! Que seu novo ciclo seja cheio de saúde, sucesso e muitas alegrias 🥳🎉🌵`
            });
            console.log(`Mensagem enviada para ${full_name}`);
        }
    } catch (error) {
        console.error("erro ao enviar: ", error);
    }
}