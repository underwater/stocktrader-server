Start authentication database using this command:
`docker run --name stocktraderdb -p 27018:27017 -e MONGO_INITDB_ROOT_PASSWORD=123456789 -e MONGO_INITDB_ROOT_USERNAME=root -d mongo:4.0.5`
