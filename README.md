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

# How to start app-server

1. install [nvm](https://github.com/nvm-sh/nvm)

2. run `nvm use` (this should read the version in the .nvmrc file and use it)

3. run `cd app-server`

4. run `npm install`

5. run `DB_USER=cs340_your_onid DB_NAME=cs340_your_onid DB_PASSWORD=your_password npm run start` (be sure to set the env vars with your own details)

If you need to change the app port, set the APP_PORT= env var.
