build:
	docker build -t easytoggles/$IMAGE_NAME:$TAG .

run:
	docker run -d --rm -p 8882:8882 easytoggles/easy-toggles-backend

publish-image:
	docker push easytoggles/easy-toggles-backend