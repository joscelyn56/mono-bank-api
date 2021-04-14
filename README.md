## Mono Banking API

In order to retrieve financial data, Mono works with financial institutions and banks. While modern banks have evolved to serve a plethora of functions, at their core, banks must provide certain basic features. Today, your task is to build the basic HTTP API for one of those banks!

Imagine you are designing a backend API for bank employees. It could ultimately be consumed by multiple frontends (web, iOS, Android etc). There should be API routes that allow them to:

- Create a new bank account for a customer, with an initial deposit amount. A single customer may have multiple bank accounts.
- Transfer amounts between any two accounts, including those owned by different customers.
- Retrieve balances for a given account.
- Retrieve transfer history for a given account.

## Installation set up

This was built using:
- Typescript
- Sequelize
- Mysql

### Prerequisites
You must have NodeJS and GIT installed globally on your machine. NodeJS comes with NPM (Node Package Manager) 
which is required to install and manage dependencies. You must also have a running instance of a MYSQL 
server on your device.

After the installation of the prerequisites, clone the repository

```bash
git clone https://github.com/joscelyn56/mono-bank-api.git
```

- Change directory to the project's folder

- Run npm install install project depencies
```bash
npm install
```

- Rename sample.env to .env, then edit it's content
```bash
DB_USER="your database user"
DB_PASSWORD="your database password"
DB_NAME="database name"
DB_HOST="127.0.0.1"
```

- Create the database
```
npm run create:db
```

- Run the database migration
```
npm run migrate
```

- Run the database seed
```
npm run seed
```

- Start the application. It runs on port 3003 by default, visit http://localhost:3003 
```
npm run start.
```

## Testing
- Test all modules
```
npm run test
```

## Create Build 

- Create a build for the project located in the dist folder
```
 npm run build
```

### Extras 

- [Here's](https://documenter.getpostman.com/view/3596383/TzJphfHi) the link to the postman API documentation. 



