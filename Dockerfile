FROM node:14
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

EXPOSE 5000

ENV PORT=5000
CMD ["npm","run","start:dev"]