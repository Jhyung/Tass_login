"use strict";
//import dependency
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
const CommentsSchema = new Schema({
 // id: String,
 userId: String,
 phoneNumber: String,
 email: String,
 password: String,
});
//export our module to use in server.js
module.exports = mongoose.model("Users", CommentsSchema);
