FROM node:16.14.2
COPY . /app
WORKDIR /app
ENV NODE_ENV=production umyname=123
RUN npm install
RUN npm install cross-env nodemon -g
EXPOSE 8090
# CMD npm run dev