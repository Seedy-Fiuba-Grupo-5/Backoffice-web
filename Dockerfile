FROM node:alpine

WORKDIR '/app'

COPY package.json .
RUN npm install

COPY . .

ENV REACT_APP_BACKEND_USERS_URL='https://seedy-fiuba-backend-users.herokuapp.com/'
ENV REACT_APP_BACKEND_PROJECTS_URL='https://seedy-fiuba-backend-projects.herokuapp.com/'

CMD ["npm", "run", "start"]
