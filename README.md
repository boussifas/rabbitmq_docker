# Introduction
  sample project running rabbitmq on docker with publisher and consumer of the queue
# How to run 
  - To run rabbit :  `docker-compose up`
  - To test publisher: 
  ` docker-compose exec consumer /bin/bash -c 'for ((i=1;i<=15;i++)); do node publisher.js; done' `


 useful link : `https://geshan.com.np/blog/2021/07/rabbitmq-docker-nodejs/`
