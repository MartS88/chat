
FROM node:21.6.1-alpine3.18 AS builder


WORKDIR /app
COPY package.json package-lock.json ./


RUN npm install


COPY . .

ENV NODE_ENV=production
RUN npm run build

CMD ["npx sequelize-cli db:migrate"]
CMD ["npm", "run", "start"]







#FROM node:21.6.1-alpine3.18 AS builder
#
#WORKDIR /app
#
#COPY images/ images/
#COPY package.json package-lock.json ./
#RUN npm install
#RUN npm install -g sequelize-cli
#RUN npm install pg pg-hstore
#RUN npm install @nestjs/core
#
#COPY . .
#RUN rm -rf dist
#RUN npm run build
#
## Clean runner stage
#FROM node:21.6.1-alpine3.18 AS runner
#
#WORKDIR /app
#
#COPY package.json package-lock.json ./
#COPY .env .
#COPY --from=builder /app/dist .
#COPY --from=builder /app/config/ config/
##COPY --from=builder /app/node_modules/.bin/sequelize /app/node_modules/.bin/sequelize
#RUN npm install
#
#
#
#CMD ["npx sequelize-cli db:migrate"]
#CMD ["node","main.js"]












