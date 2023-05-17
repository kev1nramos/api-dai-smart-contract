# DAI Smart Contract Interacting API

This is a project that aims to create an API that interacts with the DAI smart contract and stores the latest transactions into a PostgreSQL database on a continuous basis. 

The API provides endpoints to retrieve transaction and balance data from the database. 

The project utilizes popular technologies such as Web3.js, Node.js, and Docker Compose, and includes features such as API key usage, request logging, and API throttling to ensure security and stability.

"Building a reliable and secure API for interacting with the DAI smart contract on the Ethereum blockchain using modern technologies."

## Content

 * [Form](#form)
 * [Basic Solution](#basic-solution)
 * [Overview of the approach](#overview-of-the-approach)
 * [Usage](#usage)
 * [Improvements](#improvements)

---
# Form

Link to the form: https://gist.github.com/TRCSamurai/19e05172204bdfa7202dc30f8ea5fd70

---
# Basic Solution

```
try {
    const database = await connectToDatabase();
    const user = await getUser(database, 'email@email.com');
    await getUserSettings(database, user.id);
    const success = await setRole(database, user.id, ADMIN);
    if (success) {
      const [notifyUserResult, notifyAdminsResult] = await Promise.allSettled([
        await notifyUser(user.id, USER_ROLE_UPDATED),
        await notifyAdmins(USER_ROLE_UPDATED)
      ])

      if (notifyAdminsResult.status === 'rejected' || notifyUserResult.status === 'rejected') {
        // handle errors
      }
    }
  } catch (error) {
    // handle errors
  }
```
---
# Overview of the approach

## > DAI Smart Contract Interacting API

This is an API that interacts with the DAI (a stablecoin on the Ethereum blockchain) smart contract and stores the latest transactions into a PostgreSQL database on a continuous basis (block per block). The API exposes endpoints to retrieve transaction and balance data from the database.

## > Tech Stack

The application is built using the following technologies:

- **Ethereum Blockchain:** DAI smart contract

- **Web3.js library and Infura:** to interact with the DAI smart contract and retrieve transaction data

- **Node.js (typescript):** for server-side application logic and API

- **Express.js:** for creating REST API

- **expres-rate-limit** Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

- **PostgreSQL:** for storing transaction data

- **TypeORM** is an object-relational mapping (ORM) library that is used to manage relational databases in Node.js applications

- **Docker Compose:** for containerizing the database and pgAdmin (easier to view data)

- **Postman:** for manual endpoint testing

- **Jest:** for basic automatic tests

## > API Endpoints
The API exposes the following endpoints:

- **GET /transactions/list/:page/:limit:** Returns the last 100 DAI transactions with pagination support.

- **GET /transactions/:address:** Returns all transactions for a specific address (sender or recipient).

- **GET /balances/:address:** Returns the DAI balance for a specific address based on indexed transactions/aggregated data only.
API key is used to limit the API usage and all API requests are logged. As a bonus feature, API throttling is implemented to anticipate large amounts of requests.

## > Development Environment

The development environment can be set up using Docker Compose. A docker-compose.yml file is included in the project which spins up a PostgreSQL database and pgAdmin (for database management) containers.

## > Testing

The application includes basic tests using Jest. These tests cover the functionality of the API endpoints and ensure that they return the expected results.

## > Manual Testing

In addition to the basic tests, a Postman collection has been added to the project to enable manual testing of the API endpoints. The Postman collection includes pre-defined requests for each API endpoint, with input parameters and expected output already defined. To use the Postman collection, it only needs to be imported into the Postman application and the necessary environment variables set. This makes it easy to quickly test the API endpoints and verify their functionality.

## > Reasoning

The purpose of this application is to provide a way to interact with the DAI smart contract and store transaction data into a database for easier analysis and retrieval. The chosen technologies were selected for their compatibility with Ethereum blockchain, ease of use, and popularity in the Node.js community. The decision to use PostgreSQL was made due to its ability to handle large amounts of data and scalability. The inclusion of API key, request logging, and throttling were made to ensure security and stability of the API.

---
# Usage

1. Clone this repo to your desktop
- `git clone https://github.com/kev1nramos/api-dai-smart-contract.git`
2. Go to its root directory
3. Make sure the docker desktop is up and then run the `docker-compose up -d`.
Note: If you prefer and want to see the logs, run the `docker-compose up` command.
If you have followed the suggestion, you need to open a new terminal window to run the following command.
4. Run `yarn typeorm:migrate`.
5. Run `yarn start`.

At this stage, as you can see from the logs, the program is already working and getting the data from the smart contract and adding it to the database.

If you want to view the data, you can access pgAdmin through this link: `http://localhost:8080`

- email: admin@admin.com
- password: admin

Click on the top where it says "Servers" with the right mouse button
Then "Register" > "Server".

Then you will need to create a new server with the data as shown in the picture below.

In General, the name can be `postgres`.
<br>
In Connection, fill in as below in the picture.
The password can't be seen, but it is `admin`.

<div align="center">
  <a href="https://github.com/Exclusible/crm-backend">
    <img src="https://i.imgur.com/BZTK5En.png" alt="Logo">
  </a>
</div>

<br>

Now that you have access, you can look at the data in the `Tessera` database and see the data in the `transactions` table.

To run the automated tests, just run the command `yarn test`.

# Improvements

- Implemented centralized error handling and logging;
- Add more safe guards;
- Put the whole application in `docker-compose.yml`;
- Add more unit and integration tests;
- Add API Documentation using OpenAPI to clearly define all endpoints and request/response formats.
