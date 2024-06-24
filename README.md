This is a Shop microservice app currently being developed to learn and practise **RabbitMQ** and microservices as a whole.  
I am using **Node.js**, **Typescript**, **Express**, **SQL** & **Sequelize** for the development. I use migrations for the DBs as well.  
Also, I have **Dockerised** the app and implemented **NGINX** for reverse proxy.  
Some TODOs: **authentication** (OAuth) & **validation**;Redis Caching; CI/CD; Rate Limiting; Load balancing; Security; Swagger; Grafana for logging and monitoring; Performance testing; Documentation

## Current RabbitMQ setup

![Setup - RabbitMQ Publish/Subscribe](./repo_images/current_AMQP_setup.png)

<br></br>
<br></br>

## This was the initial setup - events and HTTP calls through a gateway

![Setup - http calls and gateway](./repo_images/microservices_initial_setup.png)
