// import Logging_Middleware, { Logger } from "../../Logging_Middleware/index.js";

// const logger = new Logger({ level: 'debug', stack: "backend", package: "index" });
import Logging_Middleware from "../../Logging_Middleware/index.js";
const LoggingMiddleware = (req, res, next) => {
    try {
        // logger.info("Request received", {
        //     method: req.method,
        //     url: req.url,
        //     time: new Date().toISOString()
        // });
        Logging_Middleware(req)
        next();
    } catch (error) {
        logger.error("Error in LoggingMiddleware", { error });
    }
};

export default LoggingMiddleware;
