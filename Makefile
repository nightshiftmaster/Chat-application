lint-frontend:
	make -C frontend lint

build:
	npm run build & npx start-server

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

deploy:
	git push heroku main

start:
	npx start-server & npm -C frontend start
