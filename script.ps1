docker build -t mysql-migration .
docker rm -f mysql-container
docker run -d --env-file .env --name mysql-container mysql-migration
docker exec -it mysql-container bash