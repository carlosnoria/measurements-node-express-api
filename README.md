# measurements-node-express-api
Measurements' api project for client.

# Getting started
In order to get this project up and running in your Linux environment, follow these simple steps:

## Install node, npm and other dependencies

`sudo apt install nodejs`

`sudo apt install npm`

`npm install`

## Install PostgreSQL and configured it

`sudo apt-get install postgresql`

For this project, PostgreSQL>=9.6 is needed. A database for tests, named `measurements`, with username `devuser` and password `backend123` must be present before running this project. User must also be able to create databases, which is needed to run the project. This can be done executing the command `alter user devuser createdb` on a PostgreSQL shell.

It is needed to create the tables at the measurements databases, for this use:

`node models/database.js`

## Runserver

After all previous configuration, run the server. For this you can execute `npm start` or `node index.js`

# Server Routes

This server have the following routes:

GET 	`/api/product/`
GET 	`/api/product/<productId>/`
POST 	`/api/product/`
PUT 	`/api/product/<productId>/`
DELETE 	`/api/product/<productId>/`