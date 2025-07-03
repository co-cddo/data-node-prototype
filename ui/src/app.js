import express from "express";
import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import compression from "compression";
import {
  setupCsrf,
  setupMiddlewares,
  setupConfig,
  handleCookies,
} from "../middleware";
import session from "express-session";
import {
  nunjucksSetup,
  rateLimitSetUp,
  helmetSetup,
  axiosMiddleware,
} from "../utils";
import config from "../config";
import indexRouter from "../routes/index";
import livereload from "connect-livereload";
import { authenticateJWT } from "../middleware/authMiddleware";

const app = express();

/**
 * Sets up common middleware for handling cookies, body parsing, etc.
 * @param {import('express').Application} app - The Express application instance.
 */
setupMiddlewares(app);

app.use(axiosMiddleware);
app.use(
  session({
    secret: "super-secretoken",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
  })
);
app.use(
  compression({
    /**
     * Custom filter for compression.
     * Prevents compression if the 'x-no-compression' header is set in the request.
     *
     * @param {import('express').Request} req - The Express request object.
     * @param {import('express').Response} res - The Express response object.
     * @returns {boolean} - Returns true if compression should be applied, false otherwise.
     */
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        // Don't compress responses with this request header
        return false;
      }
      // Fallback to the standard filter function
      return compression.filter(req, res);
    },
  })
);

/**
 * Sets up security headers using Helmet to protect the app from well-known web vulnerabilities.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
helmetSetup(app);

// Reducing fingerprinting by removing the 'x-powered-by' header
app.disable("x-powered-by");

/**
 * Set up cookie security for sessions.
 * Configures session management with secure cookie settings and session IDs.
 */
app.set("trust proxy", 1); // trust first proxy
const oneDay = 1000 * 60 * 60 * 24;

app.use(handleCookies);
/**
 * Middleware function to set up a Content Security Policy (CSP) nonce for each request.
 * This helps in preventing certain types of attacks like XSS.
 * This is only on in production.
 */
setupCsrf(app);

/**
 * Sets up Nunjucks as the template engine for the Express app.
 * Configures the view engine and template paths.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
nunjucksSetup(app);

/**
 * Applies a general rate limiter to all requests to prevent abuse.
 *
 * @param {import('express').Application} app - The Express application instance.
 * @param {object} config - Configuration object containing rate limit settings.
 */
rateLimitSetUp(app, config);

/**
 * Sets up application-specific configurations that are made available in templates.
 *
 * @param {import('express').Application} app - The Express application instance.
 */
setupConfig(app);

/**
 * Sets up request logging using Morgan for better debugging and analysis.
 */
app.use(morgan("dev"));

/**
 * Registers the main router for the application.
 * Serves routes defined in the 'indexRouter' module.
 */
app.use("/", indexRouter);

/**
 * Enables live-reload middleware in development mode to automatically reload
 * the server when changes are detected.
 */
if (process.env.NODE_ENV === "development") {
  app.use(livereload());
}

// Load the cert and key
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
  key: fs.readFileSync(
    path.join(__dirname, "../../fast.dm.cddo.cabinetoffice.gov.uk-key.pem")
  ),
  cert: fs.readFileSync(
    path.join(__dirname, "../../fast.dm.cddo.cabinetoffice.gov.uk.pem")
  ),
};

/**
 * Starts the Express server on the specified port.
 * Logs the port number to the console upon successful startup.
 */

https.createServer(options, app).listen(config.app.port, () => {
  console.log(
    `HTTPS Server running at https://fast.dm.cddo.cabinetoffice.gov.uk:${config.app.port}/`
  );
});
