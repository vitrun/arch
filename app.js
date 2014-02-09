/*
 * app.js
 * Copyright (C) 2014 alex <alex@alexyus-MacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */

var express = require('express');
var app = module.exports = express();

require('./config.js')(app, express);
require('./route.js')(app);

app.listen(6010);
