FROM node:16.14.2
COPY . /app
WORKDIR /app
ENV NODE_ENV=production umyname=123
RUN npm install
EXPOSE 8090
CMD node app.js