// Require packages and set the port
import express from 'express';
import bodyParser from 'body-parser';
import {router} from './routes/route';
// const express = require('express');
const port = 3001;
// const bodyParser = require('body-parser');
// const routes = require('./routes/route')
const app = express();

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

router(app);

// Start the server
const server = app.listen(port, (error) => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});