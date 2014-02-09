/*
 * route.js
 * Copyright (C) 2014 alex <alex@alexyus-MacBook-Pro.local>
 *
 * Distributed under terms of the MIT license.
 */

var read = require('node-readability');
var sanitizer = require("sanitizer");

function stripHTML(html) {
    var clean = sanitizer.sanitize(html, function (str) {
        return str;
    });
    // Remove all remaining HTML tags.
    clean = clean.replace(/<(?:.|\n)*?>/gm, "");

    // RegEx to remove needless newlines and whitespace.
    // See: http://stackoverflow.com/questions/816085/removing-redundant-line-breaks-with-regular-expressions
    clean = clean.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/ig, "\n");

    // Return the final string, minus any leading/trailing whitespace.
    return clean.trim();
};

function cleanup(req, res){
        var url = req.query.url;
        var obj = {'ok':false, 'url': url};
        read(url, function(err, doc) {
            if (err) {
                //throw err;
                res.json(500, obj);
            }
            obj["title"] = doc.title.trim();
            obj["ok"] = true
            obj["content"] = stripHTML(doc.content || "");
            //console.log('%j', obj);
            res.json(obj);
        });
    }

module.exports = function(app) {
    app.get('/clean', cleanup);
};
