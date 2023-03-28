lint-frontend:
	make -C frontend lint

build:
	npm run build

install:
	npm ci

start-frontend:
	make -C frontend start

start-backend:
	npx start-server

start:
	npx start-server & npm -C frontend start
