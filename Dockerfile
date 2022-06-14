FROM node:16.14.2
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000