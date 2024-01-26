FROM node:20.11.0

WORKDIR /dist

COPY . /dist

RUN npm install

EXPOSE 3000

ENV NAME task

CMD ["npm", "start"]