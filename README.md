# Tessera-senior-backend-coding-challenge

This is a project that aims to create an API that interacts with the DAI smart contract and stores the latest transactions into a PostgreSQL database on a continuous basis. 

The API provides endpoints to retrieve transaction and balance data from the database. 

The project utilizes popular technologies such as Web3.js, Node.js, and Docker Compose, and includes features such as API key usage, request logging, and API throttling to ensure security and stability.

"Building a reliable and secure API for interacting with the DAI smart contract on the Ethereum blockchain using modern technologies."

## Content

 * [Challenge Form](#challenge-form)
 * [Basic Solution](#basic-solution)
 * [Overview of the approach](#overview-of-the-approach)
 * [Usage](#usage)
 * [Improvements](#improvements)

---
# Challenge Form

_Please use Javascript / Typescript / Node JS for the following tasks._

You will need a [Infura](https://infura.io) / [Alchemy](https://www.alchemy.com) account to connect to the Ethereum Node.
You can use free-tier resources for this test.

## Basic

Please make improvements to the code below, using Javascript. If you are making any assumptions about how the code functions please make note of them.

```
connectToDatabase()
.then((database)  => {
    return getUser(database, 'email@email.com')
    .then(user => {
        return getUserSettings(database, user.id)
        .then(settings => {
            return setRole(database, user.id, "ADMIN")
            .then(success => {
                return notifyUser(user.id, "USER_ROLE_UPDATED")
                .then(success => {
                    return notifyAdmins("USER_ROLE_UPDATED")
                })
            })
        })
    })
})
```

## Practical

1. Create an Application / API that interacts with the [DAI smart contract](https://etherscan.io/address/0x6b175474e89094c44da98b954eedeac495271d0f) and has the following properties:
    
- Stores the latest DAI transactions into a DB on a continuous basis (block per block).

_Note: it is not required to index past DAI transactions (before today)._

- Create an REST API that returns the following data (**from the DB**):
  - Last 100 DAI transactions (add pagination, if possible)
  - Transactions by sender or recipient
  - Address' DAI balance (sender or recipient) from indexed transactions / aggregated data only

- API requirements: 
  - Limit the API usage (API key - the key/s can be mocked) 
  - Log API requests
  - (Bonus) Anticipate large amounts of requests - implement API throttling

2. Write basic tests.

3. (Bonus) Write simple SQL queries to get the following data.
    - AVG number of requests per specific timeframe
    - Sum of all request in specific time frame
    - 3 hour time period for specific api key, when the usage is the highest (Example: 3:00pm to 6:00pm)
    - Most used API key (with num of req)
   
4. Write a high-level description (1 page) explaining your solution. Explanation should include:
    - A description of what you've built
    - Which technologies you've used and how they tie together
    - Your reasons for high-level decisions

## What We Review

Your application will be reviewed by at least two of our engineers. The aspects of your code we will judge include:
* **Clarity:** Does the README clearly explain the problem and solution?
* **Correctness:** Does the application do what was asked? If there is anything missing, does the README explain why it is missing?
* **Code Quality:** Is the code simple, easy to understand, and maintainable?
* **Testing:** how thorough are the automated tests? Will they be difficult to change if the requirements of the application were to change?
* **Technical Choices:** Do choices of libraries, databases, architecture seem appropriate for the challenge?

If anything above feels unclear, please use your own judgement to make assumptions. If you have a question about which coding language or framework you should be using on a particular task, please send an email to nate@tessera.co or vid@tessera.co to confirm.

Time limit: 7 days.

Send us your answers, as-well as the link to the Github repository back via email.

Please also make sure that the repository is private and that you give the following users access:
- TRCSamurai
- vidmahovic

---
# Basic Solution

```
try {
    const database = await connectToDatabase();
    const user = await getUser(database, 'email@email.com');
    const settings = await getUserSettings(database, user.id);
    const success = await setRole(database, user.id, ADMIN);
    if (success) {
      await notifyUser(user.id, USER_ROLE_UPDATED);
      await notifyAdmins(USER_ROLE_UPDATED);
    }
  } catch (error) {
    // handle errors
  }
```
---
# Overview of the approach

## > DAI Smart Contract Interacting Application / API

This is an application / API that interacts with the DAI (a stablecoin on the Ethereum blockchain) smart contract and stores the latest transactions into a PostgreSQL database on a continuous basis (block per block). The API exposes endpoints to retrieve transaction and balance data from the database.

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
- `git clone https://github.com/kev1nramos/tessera-senior-backend-coding-challenge.git`
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