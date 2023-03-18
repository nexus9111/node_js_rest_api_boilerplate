# nodejs_boilerplate_rest_api

🚀 This is all you need as a NodeJS rest API simple and secure boilerplate.
I wanted to create something simple and easy to use for my future projects. I hope you will like it and that it will help you.

## ℹ️ Informations

This api include:

- 📝 Loggers (winston)
- 📚 MongoDB database
- 🪞 PROD, DEV and TEST environment
- 🛡 High level of protection (HTTP headers, anti-dos, ip filter, protected routes)
- 🔀 Express routing
- ✨ Structured api
- 🧪 Tests with Jest
- 🔐 JWT authentication with register, login, profile and delete routes

## 🔎 Requirements

- NodeJS installed
- MongoDB database running on your machine
    - You can install it <a href="https://www.mongodb.com/docs/manual/administration/install-community/">here</a>
    - Or run it thanks to my docker compose with command: 
    ```console
    docker-compose build; docker-compose up -d
    ```

## 🛠 Installation

```console
$ git clone git@github.com:nexus9111/nodejs_boilerplate_rest_api.git
$ cd nodejs_boilerplate_rest_api
$ chmod u+x easy-install.sh
$ ./easy-install.sh
```

if `easy-install.sh` does not work:

```console
$ cp .env.example .env.development
$ cp .env.example .env.production
$ cp .env.example .env.test
$ npm i
```

## 🚀 Run

Basic run:

```console
# Run with dev env:
$ npm start

# Run with autoreload dev env:
$ npm run dev

# Run with prod env:
$ npm run prod
```

## 🧪 Tests

```console
$ npm run test
```

**Note:** You can check test coverage with `npm run coverage`. It's recommended to have at least 70% of coverage when you push your code to make sure that your code is working in the future and that you don't break anything. I recommend you to do tests for each new feature you add to your code.

## ✒️ License:

- Author: Joss C
- Last update: 18/03/2022 (DD/MM/YYYY)