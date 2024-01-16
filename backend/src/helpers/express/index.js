const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const expressConfig = (data) => {

    const {
        env,
    } = data;
    const app = express();


    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept,Authorization"
        );
        res.header("Content-Type", "application/json");
        next();
    });

    const options = {
        "origin": "*",
        "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "preflightContinue": false,
        "optionsSuccessStatus": 204
    }
    app.use(cors(options));

    app.use(bodyParser.json({}));
    app.use(bodyParser.urlencoded({ extended: true }));

    app.timeout = 500000;

    return app;
}

module.exports = {
    expressConfig
}