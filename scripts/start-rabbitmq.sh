docker stop rabbitmq
docker rm rabbitmq
docker pull rabbitmq:management
docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management