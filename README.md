# Project Outline

The Local Farmers’s Market Association of Portland (LFMAP) organizes farmer’s
markets in the Portland Area. LFMAP hosts 25 events per month. These events
occur in different locations across the state and each event has zero or more
associated vendors. There are 30 vendors associated with LFMAP and this list is
growing. Each vendor sells zero or more products. Products can be sold by more
than one vendor. Currently there are 110 different products. Each vendor has one
primary contact person. Each person can be the primary contact for zero or more
vendors. Some people are admins for the LFMAP database. Admins do not
necessarily need to be a contact for any vendor.

The Farmer’s Market Database will organize information about Vendors, Products,
People, Events, and Locations.

# Architecture

1. MySQL - the data persistence layer
2. app-server - HTTP server connects to MySQL.
3. app-client - react app that runs in the browser, this makes HTTP requests to app-server.

# Setup

The following assumes you've cloned the repo somewhere on the flip server.

## app-server

1. install [nvm](https://github.com/nvm-sh/nvm)

2. run `nvm use` (this should read the NodeJS version in the .nvmrc file and use it)

3. run `cd app-server`

4. run `npm install`

5. run `DB_USER=cs340_your_onid DB_NAME=cs340_your_onid DB_PASSWORD=your_password node app.js` (be sure to set the env vars with your own details)

If you need to change the app port, set the APP_PORT= env var. By default, the
app will be available at http://flip1.engr.oregonstate.edu:4224/

## app-client

1. run `nvm use`

2. run `cd app-client`

3. run `npm install`

4. run `PORT=3223 npm start`

The react app will be available on http://flip1.engr.oregonstate.edu:3223/

Change PORT= if somebody else is using that port.

Note: if you changed the port for app-server above, you'll need to update
app-client/src/config.js



