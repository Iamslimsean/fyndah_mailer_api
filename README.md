**Fyndah-Mailer-API**
=======================

Overview
--------

Fyndah-Mailer-API is a RESTful API built with Node.js and Express.js that provides a simple way to send emails using the Nodemailer library.

Version
-------

1.0.0

Author
------

Marshall Goodman Industries

License
-------

ISC

Dependencies
------------

* Express.js
* Nodemailer
* Cors
* Joi
* Dotenv
* Chalk

Dev Dependencies
----------------

* TypeScript
* ts-node
* nodemon
* @types/express
* @types/nodemailer
* @types/node
* @types/cors

Usage
-----

### Development

To run the API in development mode, use the following command:

```shell
npm run dev

This will start the API with nodemon, automatically restarting the server when changes are made.

Command
"dev": "nodemon app.ts"


Starting
To start the API using the compiled JavaScript code in the dist folder, use the following command:
npm start

Command
"start": "node dist/app.js"

Building
To compile TypeScript to JavaScript and add it to the dist folder, use the following command:
npm run build
