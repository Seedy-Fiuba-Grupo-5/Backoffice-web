FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

ENV REACT_APP_BACKEND_URL='https://seedy-fiuba.herokuapp.com'

CMD ["npm", "run", "start"]
