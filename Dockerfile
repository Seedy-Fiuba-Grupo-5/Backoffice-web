FROM node:alpine

WORKDIR '/app'

ENV REACT_APP_BACKEND_USERS_URL='http://localhost:5001/'
ENV REACT_APP_BACKEND_PROJECTS_URL='http://localhost:5000/'

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "run", "start"]
