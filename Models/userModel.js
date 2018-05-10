let mongoose=require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
connection = mongoose.createConnection("mongodb://localhost:27017/eventsDB")
autoIncrement.initialize(connection);

let bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

let userModel=new mongoose.Schema({
    _id:Number,
    email:String,
    name:String,
    date:Date,
    gender:String,
    username:String,
    password:String
 
});
userModel.plugin(autoIncrement.plugin, {
    model: 'users',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});

mongoose.model("users",userModel);
