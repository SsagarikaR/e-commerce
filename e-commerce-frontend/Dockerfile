FROM node:22-alpine

RUN addgroup -S app && adduser -S -G app app

USER app

WORKDIR /app

COPY package*.json ./

USER root

RUN chown -R app:app /app

ENV HOST=0.0.0.0


RUN npm install

COPY . .

EXPOSE 5173

CMD npm run dev