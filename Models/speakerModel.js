let mongoose=require("mongoose"),
autoIncrement = require('mongoose-auto-increment');

connection = mongoose.createConnection("mongodb://localhost:27017/eventsDB")
autoIncrement.initialize(connection);
//class ORM
let speakerModel=new mongoose.Schema({
    _id:Number,
    name:String,
    title:String,
    image:String
    // BD:{
    //     type:Date,
    //     require:true,
    //     default:
    // }
});
speakerModel.plugin(autoIncrement.plugin, {
    model: 'speakers',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});
//mapping
               //coll    //schema
mongoose.model("speakers",speakerModel);
