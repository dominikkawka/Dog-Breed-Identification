FROM node:18-alpine

WORKDIR /code

COPY package.json /code

RUN npm install

COPY frontend frontend/code

EXPOSE 8080

CMD [ "npm", "run", "dev" ]