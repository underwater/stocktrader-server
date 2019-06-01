const TOKEN_ISSUER = "stocktrader";
const AUDIENCE = "all-apis";
const AUTH_SECRET = "hasuyftads97ifya9sdyfoas7dfyas90dfa";

module.exports = {
    apps: [{
        name: "auth-service",
        script: "./auth-service/index.js",
        node_args: ["--inspect=0.0.0.0:9226"],
        watch: true,
        ignore_watch: ["./.git"],
        env: {
            MONGO_HOST: "localhost",
            MONGO_PORT: 27018,
            MONGO_USERNAME: "root",
            MONGO_PASSWORD: "123456789",
            TOKEN_ISSUER,
            AUDIENCE,
            AUTH_SECRET,
            TOKEN_LIFESPAN: "1 day"
        }
    }]
}