require("dotenv-safe").config({ path: `.env.${process.env.NODE_ENV}` });

module.exports = {
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGOOSE_URI: process.env.MONGODB_URI,
    USE_DATABASE: process.env.USE_DATABASE === "1" ? true : false,
    BLACKLIST: ["178.20.55.18"],
    SERVICE_NAME: process.env.SERVICE_NAME
} ;