# Slack Birthday Bot 🎉

A Slack bot that **automatically sends birthday messages** to users on their special day, with support for *Portuguese and Spanish*.

## Purpose


This bot was created to automate birthday celebrations on Slack, ensuring that no one is forgotten and that messages are delivered in a **personalized** way.

## Tech Stack

- Node.js
- PostgreSQL
- Slack API
- Railway (deployment)

## Database Structure

**Table:** `slack_users`

| Column     | Type | Constraint  | Description                     |
|------------|------|-------------|---------------------------------|
| slack_id   | TEXT | PRIMARY KEY | Slack user ID                   |
| full_name  | TEXT | NOT NULL    | User full name                  |
| lang       | TEXT | NOT NULL    | User language (pt or es)        |
| birthday   | DATE | NOT NULL    | Birthday date (YYYY-MM-DD)      |

> **Note:** the year is fixed as 2000, but the query filters only by month and day using
WHERE TO_CHAR(birthday, 'MM-DD') = $1 (see db/dbQueries.js).


## Setup

1. Clone the repository:

```bash
git clone https://github.com/eduardotashiro/tuna-birthdays-bot.git
cd tuna-birthdays-bot

```

## Environment Variables 
> SLACK_BOT_TOKEN=your-slack-bot-token

>CHANNEL_ID=slack-channel-id

>DATABASE_URL=postgresql-connection-url

- *DATABASE_URL should be the Railway PostgreSQL URL
(public for local testing, internal for Railway deploy).*

## Cron

- The bot runs automatically every day at the configured time using node-cron.

 - Example schedule for São Paulo (UTC-3):
 
```js
cron.schedule('30 6 * * *', async () => {
  // Sends birthday messages at 06:30 AM
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
})
```

## Deployment

- The project is deployed on Railway, integrated with GitHub for automatic deploys on every push.

- PostgreSQL is also hosted on Railway, but you can clone the project and use any database provider you prefer.

## Contributing

 - Pull requests are welcome :) 

 - For significant changes, please open an issue first to discuss what you would like to change.
<br><br><br>
---
*MIT* © ***Eduardo Tashiro***




            ..::::::::::::::::::::::::::::::::::::::::::::::::::::--                      
                    ##############################################################                  
                  ####                                                          ##@@                
                  ####                                                          ##MM                
                    ##############################################################                  
                      ..####..............................................##::                      
                        ####                                              ##                        
                        ####                                              ##                        
                        ####                                              ##                        
                        ####                                              ##                        
                          ##                  TIME IS OVER                ##                        
                          ##                                              ##                        
                          ##                                            ####                        
                          ####                                          ####                        
                          mm##                                          ##                          
                            ####                                      ####                          
                            ####                                      ##MM                          
                              ####                                  ####                            
                              ++##      ----------------------    --##                              
                                ####      ------------------      ####                              
                                  ####        ----------        ####                                
                                    ####        ----          ####                                  
                                      ####        --      ######                                    
                                        ####      --      ####                                      
                                          ####    --    ####                                        
                                          ####    --    ####                                        
                                          ##mm    --    ####                                        
                                        ####      --      ####                                      
                                      ####        --        ####                                    
                                    ####          --          ####                                  
                                  ####          ----            ####                                
                                ####            ------            ####                              
                              ####              ------              ##                              
                              ##@@            ----------            ####                            
                            ####            --------------            ####                          
                            ##..          ------------------          ####                          
                          ####        --------------------------        ##                          
                          ####      ------------------------------      ####                        
                          ##      --------------------------------      @@##                        
                          ##      ----------------------------------      ##                        
                        --##    ------------------------------------      ##                        
                        ####    --------------------------------------    ##                        
                        ####    --------------------------------------    ##                        
                        ####                                              ##                        
                        ####                                              ##                        
                      ##########################################################                    
                    ##############################################################                  
                  ####                                                          ##@@                
                  ####                                                          ##mm                
                    ##############################################################                    I think, therefore I grow old.


