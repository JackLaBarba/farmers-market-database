client-npm-install:
	cd app-client && npm install

client-build: client-npm-install
	cd app-client && npm run build

server-npm-install:
	cd app-server && npm install

server-build: client-build server-npm-install
	rm -rf app-server/public/*
	cp -r app-client/build/* app-server/public/
