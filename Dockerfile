FROM node:14
ADD . /code
WORKDIR /code
RUN npm init -y
RUN npm install express mongodb
COPY . ./code
CMD ["node", "index.js"]