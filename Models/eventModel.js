let mongoose=require("mongoose"),
autoIncrement = require('mongoose-auto-increment');
connection = mongoose.createConnection("mongodb://localhost:27017/eventsDB")
autoIncrement.initialize(connection);
let eventModel=new mongoose.Schema({
    _id:Number,
    title:String,
    date:{
        type:Date,
        default:new Date()
    },
 mainSpeaker:{
     type:Number,
     ref:"speakers"
 } ,
 otherSpeakers:[
    {
        type:Number,
        ref:"speakers"
    }  
 ],
 otherusers:[
    {
        type:Number,
        ref:"users"
    }  
 ]    
});
eventModel.plugin(autoIncrement.plugin, {
    model: 'events',
    field: '_id',
    startAt: 1,
    incrementBy: 1
});


// eventModel.post("remove",(doc)=>{

// })


mongoose.model("events",eventModel);
