'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    PaginateList = mongoose.model('PaginateList');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
    return Thing.find(function (err, things) {
        if (!err) {
            return res.json(things);
        } else {
            return res.send(err);
        }
    });
};

exports.list = function(req, res) {
    PaginateList.find(function(err, data) {
        if (!err) {
            console.log(data);
            return res.json(data);
        } else {
            return res.send(err);
        }
    });
}