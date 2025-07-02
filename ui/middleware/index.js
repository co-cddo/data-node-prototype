import { setupMiddlewares } from "./commonMiddleware.js";
import { setupCsrf } from "./setupCsrf.js";
import { setupConfig } from "./setupConfigs.js";
import { handleCookies } from "./cookieMiddleware.js";

export { setupMiddlewares, setupCsrf, setupConfig, handleCookies };
