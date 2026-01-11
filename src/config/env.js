import dotenv from "dotenv"
dotenv.config()

export const config = {
    slackBotToken: process.env.SLACK_BOT_TOKEN,
    slackSigningSecret: process.env.SLACK_SIGNING_SECRET,
    channelId: process.env.CHANNEL_ID,
    homeBannerUrl: process.env.HOME_BANNER_URL
}