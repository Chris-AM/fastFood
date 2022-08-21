FROM node:18-alpine as development

WORKDIR /app

COPY tsconfig*.json ./
COPY package*.json ./
COPY nest-cli*.json ./

RUN npm ci

COPY src/ src/

RUN npm run build

# Runtime (production) Layer
FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=devDependencies

COPY --from=development /app/dist/ ./dist/

EXPOSE 3000

CMD ["node", "dist/main.js"]