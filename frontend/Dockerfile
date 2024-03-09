FROM node:18-alpine

WORKDIR /code

EXPOSE 5173

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm", "run", "dev"]