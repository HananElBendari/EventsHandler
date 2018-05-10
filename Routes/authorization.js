let express=require("express"),
    mongoose=require("mongoose"),
    path=require("path");

    const { check, validationResult } = require('express-validator/check');
    const { matchedData, sanitize } = require('express-validator/filter');

let authRouter=express.Router();
//"/login/:id"
//console.log(request.params.id);
require("../Models/userModel");
require("../Models/eventModel");
let userModel=mongoose.model("users");  
let eventModel=mongoose.model("events");  

authRouter.get("/login",(request,response)=>{
    
    response.render("authorization/login",{msg:request.flash("msg")});
   
});

authRouter.post("/login",(request,response)=>{
     

    if(request.body.username=="admin" && request.body.password=="123456")
    {
        request.session.username=request.body.username;
        request.session.password=request.body.password;
        //console.log(request.session);
        //response.locals={"Name":request.session.userName};
        //response.locals.Name=request.session.userName;
       // response.cookie("count",1);
       //response.render("speakers/speakerslist",{"count":request.cookies.count});//,{user:request.body.userName,array:["eman","mona"]});
        response.redirect("events/list");//,{"count":request.cookies.count});//,{user:request.body.userName,array:["eman","mona"]});
    
    }
    else
    {
        var userNum=request.body.username;
        var pass=request.body.password;



        userModel.findOne({"username":userNum,"password":pass},(err,result)=>{ 
                    // Load hash from your password DB.
//bcrypt.compare(result.password, hash, function(err, res) {
    // res == true
//});
//bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
//});

            if(result==null)
            {
                
                request.flash("msg","username or password not correct ....")
                response.redirect("/login");
               
            }else{
                console.log(result);
                request.session.username=request.body.username;
                request.session.password=request.body.password; 
               // response.redirect("/users/Home");  
               
               
               console.log("hi        hi")
               userModel.findOne({"username":request.session.username},(err,result2)=>{
                   if(result2!=null){
                       //result._id
                       eventModel.find({"otherusers":result2._id},(err1,result1)=>{
                           console.log("res---------"+result1)
                           if(result1!=null){ 
                            console.log("log---------"+result1)
                               response.render("users/Home",{"data":result1});
                            }
                            else{
                               response.redirect("/events/list");
                           }
                           })
                   }
            
               })
               





               // response.render("users/Home",{"user":result});
            }

        })  

   

    }
   // response.send("post login")
});

authRouter.get("/register",(request,response)=>{
    response.render("authorization/register",{msg:request.flash("msg")});
   
   // if(request.body.userName!=null && request.body.userPasswor!=null)
   // {
          
  //  }
  //  else
  //  {
     //       request.flash("msg","username and password not correct try agian ....")
    //        response.redirect("/register");
   // }

});
authRouter.post("/register",[
    check('email').isEmail().withMessage('not valid')
      .trim()
      .normalizeEmail(),
   
    check('password', 'Must be at least 5 chars and contain one number').isLength({ min: 5 })
      .matches(/\d/),
   
    check('name').exists(),
    check('username').exists()

  ],(request,response)=>{


    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      //return response.status(422).json({ errors: errors.mapped() });
    }
   
    var pass1=request.body.password;
    var dater=request.body.date;
   // bcrypt.genSalt(saltRounds, function(err, salt) {
    //    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //        pass1=hash;
    //    });
    //});
    let user=new userModel({
        // _id:request.body._id,
         name:request.body.name,
         username:request.body.username,
         password:pass1,
         gender:request.body.gender,
         email:request.body.email,
         date:dater       
     });
   console.log(user);
     user.save((err,result)=>{
         if(!err)
         {
            request.session.username=request.body.username;
            request.session.password=pass1;

            response.cookie("count",1);
            // response.render("speakers/speakerslist",{"count":request.cookies.count});//,{user:request.body.userName,array:["eman","mona"]});
     
            
            response.redirect("/events/list");
           
         }
         else
         {
           response.json(err);
         }
     })
   


    //response.cookie("count",1);
   // response.render("speakers/speakerslist",{"count":request.cookies.count});//,{user:request.body.userName,array:["eman","mona"]});
    //response.redirect("users/Home");//,{"count":request.cookies.count});//,{user:request.body.userName,array:["eman","mona"]});

});
authRouter.get("/logout",(request,response)=>{
    request.session.destroy(()=>{
        response.redirect("/login")
    })
});

module.exports=authRouter;