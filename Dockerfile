FROM node:v22.18.0

WORKDIR /app-birthdays

COPY package*.json ./

RUN npm i --production

COPY . .

CMD ["npm", "start"]
