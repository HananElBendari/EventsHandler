

let express=require("express"),
    speakerRouter=express.Router(),
    mongoose=require("mongoose"),
    multer=require("multer"),
    fs=require("fs"),

    path=require("path");
require("../Models/speakerModel");

let speakerModel=mongoose.model("speakers")
let multerMW=multer({
    "dest":"./publics/images"
});

speakerRouter.get("/add",(request,response)=>{

    response.render("speakers/addspeaker")
});
speakerRouter.post("/add",multerMW.single("speakerImage"),(request,response)=>{
   // response.send("add");
   fs.rename(request.file.path,path.join(request.file.destination,request.file.originalname))
  // response.json(request.file);
  let speaker=new speakerModel({
     // _id:request.body._id,
      name:request.body.name,
      title:request.body.title,
      image:request.file.originalname
  });

  speaker.save((err,result)=>{
      if(!err)
      {
         response.redirect("/speakers/list");
      }
      else
      {
        response.json(err);
      }
  })


});

speakerRouter.get("/edit/:id",(request,response)=>{
   //console.log("edit get")
    speakerModel.findOne({"_id":request.params.id},(err,result)=>{
        response.render("speakers/editspeaker",{"speaker":result});
    })    
    
});

speakerRouter.post("/edit/:id",(request,response)=>{

    console.log("Post edit")
    console.log(request.body)
    speakerModel.update({"_id":request.params.id},{
        "$set":{
            name:request.body.name,
            title:request.body.title
        }
    },(err,result)=>{
        
        response.redirect("/speakers/list");
    })    
    
});
speakerRouter.get("/delete/:id",(request,response)=>{

    speakerModel.remove({"_id":request.params.id},(err,result)=>{
        response.redirect("/speakers/list");
    })
})





speakerRouter.get("/list",(request,response)=>{
    speakerModel.find({},(err,result)=>{
        response.render("speakers/speakerslist",{"data":result});
    });
   
});


module.exports=speakerRouter;