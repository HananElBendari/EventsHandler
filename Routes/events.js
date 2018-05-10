

let express=require("express"),
    eventRouter=express.Router(),
    mongoose=require("mongoose");
require("../Models/eventModel")
require("../Models/speakerModel")
require("../Models/userModel")



let speakerModel=mongoose.model("speakers")
let eventModel=mongoose.model("events")
let userModel=mongoose.model("users")


eventRouter.get("/add",(request,response)=>{

    speakerModel.find({},(err,result)=>{
        if(!err)
         response.render("events/addevent",{"speakers":result})
        
    });
})
eventRouter.post("/add",(request,response)=>{
    
    let eventDoc=new eventModel({
        title:request.body.title,
        mainSpeaker:request.body.mainspeaker,
        otherSpeakers:request.body.otherSpeakers
    });
    eventDoc.save((err,doc)=>{
        response.redirect("/events/list");
    });
})

eventRouter.get("/list",(request,response)=>{
    eventModel.find({}).populate({"path":"mainSpeaker otherSpeakers otherusers"}).then((result)=>{
    if(request.session.username=="admin")
       response.render("events/eventslist",{"data":result})
        else{
            response.render("events/eventsListuser",{"data":result})
        }
        
        
    })
})

eventRouter.get("/AddToEvent/:id",(request,response)=>{

    userModel.findOne({"username":request.session.username},(err,result)=>{
        if(result!=null){
            console.log("EventId"+request.params.id);
            eventModel.findOne({"_id":request.params.id,"otherusers":result._id},(err1,result1)=>{
                if(result1==null){  
           
                    console.log("UserId"+result._id);

                    eventModel.update({"_id":request.params.id},{
                        "$push":{
                            
                            otherusers: result._id
                        }

                    },(err,result)=>{
                        eventModel.findOne({"_id":request.params.id},(err,result)=>{

                            for(let j=0;j< result.otherusers.length;j++)
                            {
                                console.log(j+"="+result.otherusers[j])
                            }
                        
                        });
                        response.redirect("/events/list");
                    })                  
        }
        else{
            response.redirect("/events/list");                 
        }
        })
    
    }
})

})

eventRouter.get("/edit/:id",(request,response)=>{
    eventModel.findOne({"_id":request.params.id},(err,result)=>{
         response.render("events/editevent",{"event":result});
     })    
     
 });

eventRouter.post("/edit/:id",(request,response)=>{

    console.log("Post edit")
    console.log(request.body)
    eventModel.update({"_id":request.params.id},{
        "$set":{
            title:request.body.title,
            mainSpeaker:request.body.name
        }
    },(err,result)=>{
        
        response.redirect("/events/list");
    })    
    
});
eventRouter.get("/delete/:id",(request,response)=>{
    eventModel.remove({"_id":request.params.id},(err,result)=>{
        response.redirect("/events/list");
    })
})

module.exports=eventRouter;