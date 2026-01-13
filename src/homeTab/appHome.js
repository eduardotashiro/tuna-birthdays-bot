import { getBirthdaysMonth } from "../db/dbQueries.js";
import { config } from "../config/env.js";


export function homeTab(app) {
  app.event("app_home_opened", async ({ event, client }) => {
    try {
      const blocks = [
        {
          type: "image",
          image_url: config.homeBannerUrlL,
          alt_text: "Banner principal",
        },
        {
          type: "header",
          text: {
            type: "plain_text",
            text: ":tada: Aniversariantes do mês",
            emoji: true,
          },
        },
        {
          type: "divider",
        },
      ];
      
      const birthdayPersonOfTheMonth = await getBirthdaysMonth()
      
      if (birthdayPersonOfTheMonth.length > 0) {
        const monthName = new Date().toLocaleString("pt-BR", { month: "long" })

        for (const b of birthdayPersonOfTheMonth) {
          blocks.push({
            type: "section",
            text: {
              type: "mrkdwn",
              text: `:birthday:  *${b.full_name}* - ${b.day} de ${monthName}`,
            },
          });
        }
      } else {
        blocks.push({
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Nenhum aniversariante este mês :cry:",
          },
        });
      }

      await client.views.publish({
        user_id: event.user,
        view: {
          type: "home",
          blocks,
        },
      });
    } catch (error) {
      console.warn("Erro ao atualizar a Home Tab:", error);
    }
  });
}
