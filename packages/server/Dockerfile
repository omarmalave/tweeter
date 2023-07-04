FROM docker.io/node:20.3.1-alpine

ENV HOST=0.0.0.0
ENV PORT=4000

WORKDIR /app

RUN addgroup --system server && \
          adduser --system -G server server

COPY ./dist/packages/server .

COPY ./package*.json .
RUN npm --omit=dev -f install

COPY ./prisma ./prisma
RUN npx prisma generate

RUN chown -R server:server .

CMD [ "node", "main.js" ]
