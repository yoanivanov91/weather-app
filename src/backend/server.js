//Main server configuration

require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./others/jwt');
const errorHandler = require('./others/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./users/user.controller'));
app.use('/favorites', require('./favorites/favorite.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 80;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});