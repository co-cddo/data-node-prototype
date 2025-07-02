const dynamo = require("./dynamo");
const postgres = require("./postgres");
const backend = process.env.DB_BACKEND || "dynamo";
module.exports = backend === "postgres" ? postgres : dynamo;
