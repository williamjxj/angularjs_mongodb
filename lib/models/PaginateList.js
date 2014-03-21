'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * PaginateList Schema
 * {"id":"1","name":"name 1","description":"description 1","email":"email 1","phone":"phone 1","address":"address1"},
 */
var PaginateListSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    email: String,
    phone: String,
    address: String
});

mongoose.model('PaginateList', PaginateListSchema);
