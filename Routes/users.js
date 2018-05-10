

let express=require("express"),
    userRouter=express.Router(),
    mongoose=require("mongoose"),
    path=require("path");
require("../Models/userModel");
require("../Models/eventModel");
let userModel=mongoose.model("users")
let eventModel=mongoose.model("events")

userRouter.get("/add",(request,response)=>{

    response.render("users/adduser")
});
userRouter.post("/add",(request,response)=>{

  let user=new userModel({
     // _id:request.body._id,
      name:request.body.name,
      username:request.body.username,
      password:request.body.password,
      gender:request.body.gender,
      date:request.body.date
    
  });

  user.save((err,result)=>{
      if(!err)
      {
         response.redirect("/users/list");
      }
      else
      {
        response.json(err);
      }
  })


});
//let idid=result._id;
userRouter.get("/edit",(request,response)=>{
   //console.log("edit get")
    userModel.findOne({"username":request.session.username},(err,result)=>{
        response.render("users/edituser",{"user":result});
    })    
    
});

userRouter.post("/edit",(request,response)=>{

    console.log("Post edit")
    console.log("reg id 8888 ="+request.session.username)
    userModel.update({"username":request.session.username},{
        "$set":{
            name:request.body.name,
            username:request.body.username
        }
    },(err,result)=>{
        response.redirect("/login");
      
    })    
    
});

userRouter.get("/profileUser",(request,response)=>{
    userModel.findOne({"username":request.session.username},(err,result)=>{
        response.render("users/profileUser",{"data":result});
    })    
    
});

userRouter.get("/delete/:id",(request,response)=>{

    userModel.remove({"_id":request.params.id},(err,result)=>{
        response.redirect("/users/list");
    })
})




userRouter.get("/list",(request,response)=>{
    userModel.find({},(err,result)=>{
        response.render("users/userlist",{"data":result});
    });
   
});


userRouter.get("/userEvent",(request,response)=>{
    
    console.log("hi        hi")
               userModel.findOne({"username":request.session.username},(err,result2)=>{
                   if(result2!=null){
                       //result._id
                       eventModel.find({"otherusers":result2._id},(err1,result1)=>{
                           console.log("res---------"+result1)
                           if(result1!=null){ 
                               response.render("users/Home",{"data":result1});
                            }
                            else{
                               response.redirect("/events/list");
                           }
                           })
                   }
                })
});


module.exports=userRouter;