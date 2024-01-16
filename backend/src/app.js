const { expressConfig } = require("./helpers/express");
const { mongodbConnection } = require("./helpers/mongoose");


const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://127.0.0.1:27017";
const DATABASE_NAME = process.env.DATABASE_NAME || "integrations";
const ENVIRONMENT = process.env.environment || "dev";

const appRouter = require("./routes");

let expressApp = expressConfig({
    env: ENVIRONMENT
})

expressApp.use("/app", appRouter);

mongodbConnection({ db_url: DATABASE_URL, db_name: DATABASE_NAME, env: ENVIRONMENT }).then(() => {});

expressApp.listen(PORT, '0.0.0.0', () => {
    console.log("Listening to port number :" + PORT + " ...");
});

