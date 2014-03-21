'use strict';

var mongoose = require('mongoose'),
    PaginateList = mongoose.model('PaginateList');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
PaginateList.find({}).remove(function() {
    PaginateList.create(
        {"id":"1","name":"name 1","description":"description 1","email":"email 1","phone":"phone 1","address":"address1"},
        {"id":"2","name":"name 2","description":"description 1","email":"email 2","phone":"phone 2","address":"address2"},
        {"id":"3","name":"name 3","description":"description 1","email":"email 3","phone":"phone 3","address":"address3"},
        {"id":"4","name":"name 4","description":"description 1","email":"email 4","phone":"phone 4","address":"address4"},
        {"id":"5","name":"name 5","description":"description 1","email":"email 5","phone":"phone 5","address":"address5"},
        {"id":"6","name":"name 6","description":"description 1","email":"email 6","phone":"phone 6","address":"address6"},
        {"id":"7","name":"name 7","description":"description 1","email":"email 7","phone":"phone 7","address":"address7"},
        {"id":"8","name":"name 8","description":"description 1","email":"email 8","phone":"phone 8","address":"address8"},
        {"id":"9","name":"name 9","description":"description 1","email":"email 9","phone":"phone 9","address":"address9"},
        {"id":"10","name":"name 10","description":"description 1","email":"email 10","phone":"phone 10","address":"address10"},
        {"id":"11","name":"name 11","description":"description 1","email":"email 11","phone":"phone 11","address":"address11"},
        {"id":"12","name":"name 12","description":"description 1","email":"email 12","phone":"phone 12","address":"address12"},
        {"id":"13","name":"name 13","description":"description 1","email":"email 13","phone":"phone 13","address":"address13"},
        {"id":"14","name":"name 14","description":"description 1","email":"email 14","phone":"phone 14","address":"address14"},
        {"id":"15","name":"name 15","description":"description 1","email":"email 15","phone":"phone 15","address":"address15"},
        {"id":"16","name":"name 16","description":"description 1","email":"email 16","phone":"phone 16","address":"address16"},
        {"id":"17","name":"name 17","description":"description 1","email":"email 17","phone":"phone 17","address":"address17"},
        {"id":"18","name":"name 18","description":"description 1","email":"email 18","phone":"phone 18","address":"address18"},
        {"id":"19","name":"name 19","description":"description 1","email":"email 19","phone":"phone 19","address":"address19"},
        {"id":"20","name":"name 20","description":"description 1","email":"email 20","phone":"phone 20","address":"address20"},
        function() {
            console.log('finished populating things');
        }
    );
});
