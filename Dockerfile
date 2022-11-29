# develop
FROM node:18-alpine As development
WORKDIR /app
COPY package*.json ./
RUN npm i @nestjs/cli
RUN npm install
COPY . .
RUN npm run build

# prod
FROM node:18-alpine as production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --production
COPY . .
COPY --from=development /app/dist ./dist
CMD ["node", "dist/main"]
