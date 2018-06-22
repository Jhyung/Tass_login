"use strict"
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const Users=require("./model/users")

// const cors=require("cors");


const app=express();
const router=express.Router();

const port=process.env.API_PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.setHeader("Cache-Control", "no-cache");
    next();
});
// app.use(cors());

router.get("/",(req,res)=>{
    res.json({ message: "API Initiallized!"});
});

router.route("/signup")
.get((req,res)=>{
  res.json({"path:":"/signup"});
})
.post((req, res)=>{
    console.log("accessed");
    let user = new Users();
    user.email=req.body.email;
    user.password=req.body.password;
    user.phoneNumber=req.body.phone;
    user.userId=req.body.id;

    user.save((err)=>{
        if (err)
            res.send(err);
        res.json({ message: "Comment successfully added!",
        "redirect":"/" });
    });
});

app.use("/api",router);

app.listen(port,()=>{
    //console.log("api is running on port +"+port);
});

mongoose.connect('mongodb://test:test12@ds247830.mlab.com:47830/velopart');
