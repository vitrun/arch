/*
 * config.js
 * Copyright (C) 2014 alex <alex@alexyus-MacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */

var winston = require('winston');

winston.add(winston.transports.DailyRotateFile, {
    filename: '/workspace/logs/arch/arch_access.log',
    json: false,
    datePattern: '.yyyyMMddHH'
});

var winstonStream = {
    write: function(message, encoding){
        winston.info(message);
    }
};

module.exports = function(app, express){
    app.configure(function() {
        // enable web server logging; pipe those log messages through winston
        app.use(express.logger({stream:winstonStream}));
    });

    app.configure('development', function() {
        app.use(express.errorHandler({
            dumpExceptions: true,
            showStack: true
        }));
    });

    app.configure('production', function() {
        app.use(express.errorHandler());
    });
};
