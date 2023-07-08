<div align="center">
    <img src="./git-assets/node-boilerplate-logo.png" width="300">
</div>


# NodeJS rest api boilerplate

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

- 📦 docker 
- 📦 docker-compose

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
```

## 🚀 Run

Basic run:

```console
# Run with dev env:
$ docker-compose up -d

# Run with prod env:
$ docker-compose -f docker-compose.prod.yml up -d
```

## 🧪 Tests

```console
$ docker-compose -f docker-compose.test.yml up -d --build; docker logs -f boilerplate-api
```

**Note:** It's recommended to have at least 70% of coverage when you push your code to make sure that your code is working in the future and that you don't break anything. I recommend you to do tests for each new feature you add to your code.

## ✒️ License:

- Author: Joss C
- Last update: 18/03/2022 (DD/MM/YYYY)