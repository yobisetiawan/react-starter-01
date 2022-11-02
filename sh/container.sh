docker rm react-app -f
docker run  --env-file ./.env -v $(pwd)/src:/app/src:ro -d -p 3000:3000 --name react-app react-app-image 