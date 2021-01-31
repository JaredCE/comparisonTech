'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const messages = require('./src/api/messages');

const main = async () => {
    const app = express();
    const corsOptions = {
        origin: process.env.FRONTEND_URL,
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };
    app.use(bodyParser.urlencoded({ extended: true })); 
    app.use(cors(corsOptions));
    app.use([
        express.json()
    ]);
    app.use('/v1/messages', messages);
    app.use(async (err, req, res, next) => {
        res.status(500).send('Something broke!')
    });

    app.listen(3000);
}

main()
    .catch((err) => {
        throw err;
    })