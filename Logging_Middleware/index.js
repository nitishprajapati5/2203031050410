import axios from "axios";

const LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    trace: 4
};

const STACK = {
    backend: "backend",
    frontend: "frontend"
};

const PACKAGE = {
    cache: "cache",
    controller: "controller",
    cron_job: "cron_job",
    db: "db",
    domain: "domain",
    handler: "handler",
    repository: "repository",
    route: "route",
    service: "service"
};

const AUTH_TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyMjAzMDMxMDUwNDEwQHBhcnVsdW5pdmVyc2l0eS5hYy5pbiIsImV4cCI6MTc1MDY2Nzk4OCwiaWF0IjoxNzUwNjY3MDg4LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjVkMDQzNDctMDc0Mi00MzQ4LTg3OTktNjA2ZWJhNDZhNWRlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoibml0aXNoIHByYWphcGF0aSIsInN1YiI6ImMwMjY4NTRiLTlmOTktNGQ5OC1iOGI4LTUzNWM3M2Q0OGViMyJ9LCJlbWFpbCI6IjIyMDMwMzEwNTA0MTBAcGFydWx1bml2ZXJzaXR5LmFjLmluIiwibmFtZSI6Im5pdGlzaCBwcmFqYXBhdGkiLCJyb2xsTm8iOiIyMjAzMDMxMDUwNDEwIiwiYWNjZXNzQ29kZSI6IlRSemdXTSIsImNsaWVudElEIjoiYzAyNjg1NGItOWY5OS00ZDk4LWI4YjgtNTM1YzczZDQ4ZWIzIiwiY2xpZW50U2VjcmV0Ijoid0RGZEVKUm5IYWRqdXBUYyJ9.3fzOCyPxiYdXXw4qgFwWSIpSVE3yfbhp7vE4sSaBbSQ"
const Logging_Middleware = (req, res, next) => {
    const ENDPOINT = "http://20.244.56.144/evaluation-service/logs";

    axios.post(ENDPOINT, {
        stack: "backend",
        level: "info",
        package: "",
        message: "Logging middleware invoked"
    }, {
        headers: {
            "Authorization": AUTH_TOKEN,
            "Content-Type": "application/json"
        }
    })
    .then(() => console.log("Log sent"))
    .catch(err => console.error("Logging failed:", err.message));

    //next();
};

export default Logging_Middleware;
