## Build and run the Docker service

``` Bash
docker compose build
docker compose up node_api_service
docker compose --env-file ./node-api-service/.env up node_api_service
```