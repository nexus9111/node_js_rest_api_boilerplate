# nodejs_boilerplate_rest_api
🚀 This is all you need as a NodeJS rest API simple and secure boilerplate

## ℹ️ Informations
This api include:

- 📝 Loggers (winston)
- 📚 MongoDB database
- 🪞 PROD and DEV environment
- 🛡 High level of protection (HTTP headers, anti-dos, ip filter, protected routes)
- 🔀 Express routing
- ✨ Structured api
Basic register/login route are implemented to show how to use the api.

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

## ✒️ License:

- Author: Joss C
- Last update: 05/02/2022