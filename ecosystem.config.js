module.exports = {
    apps: [{
        name: "app",
        script: "./server.js",
        instances: 3,
        env: {
            "NODE_ENV": "production"
        }
    }]
};