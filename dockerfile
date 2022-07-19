FROM node:18

WORKDIR /app

RUN package.json .

COPY npm install

CMD ["node" , "src/main,js"]
