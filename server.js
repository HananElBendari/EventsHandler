let express=require("express"),
    morgan=require("morgan"),
    path=require("path"),
    authRouter=require("./Routes/authorization"),
    speakerRouter=require("./Routes/speakers"),
    eventRouter=require("./Routes/events"),
    userRouter=require("./Routes/users"),
    bodyparser=require("body-parser").urlencoded(),
    express_session=require("express-session"),
    connect_flash=require("connect-flash"),
    cookie_parser=require("cookie-parser"),
    mongoose=require("mongoose");
 
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

//1-create server

let app=express();
mongoose.connect("mongodb://localhost:27017/eventsDB");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,"publics")))
app.use(bodyparser);
app.use(express_session({
    "secret":"emanfathi"
}));
app.use(connect_flash());
app.use(cookie_parser());

//second MW
// app.use((request,response,next)=>{

//   let minutes=(new Date()).getMinutes();
//   if(minutes<20)
//   {
//     console.log("Authorized");
//     next();
//   }
//   else
//   {
//     //response.send("not Authorized");
//      next(new Error("not authoriezd"));
//      //throw 
//   }
// });


//third
// app.use((request,response)=>{
//     response.send(" Offer page");
//   });

///routing 
app.use(/\//,(request,response)=>{

    //response.send("Home");
    //response.sendfile(path.join(__dirname,"views","index.html"));
   // response.render("authorization/login"); 
    response.redirect("/login");

});


//app.use("/auth",authRouter);
app.use(authRouter);

app.use((request,response,next)=>{

    console.log("Here")
    if(request.session.username&&request.session.password)
    {
           //console.log("here")
           //response.locals.Name=request.session.userName;
           //console.log("locals "+request.locals);
            next();
    }
    else
    {
        response.redirect("/login");
    }
});

//errors
app.use((err,request,response,next)=>{
    response.send(err.message);
});

app.use("/speakers",speakerRouter);
app.use("/events",eventRouter);
app.use("/users",userRouter);



//2- port
app.listen(8081,()=>{
    console.log("I am Listening ....");
})