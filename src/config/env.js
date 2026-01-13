import dotenv from "dotenv"
dotenv.config()

export const config = {
    postgres : {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false
        }
    },
    slack:{
        slackBotToken: process.env.SLACK_BOT_TOKEN,
        slackSigningSecret: process.env.SLACK_SIGNING_SECRET,
        channelId: process.env.CHANNEL_ID,
        homeBannerUrl: process.env.HOME_BANNER_URL,
        port: process.env.PORT
    }

}