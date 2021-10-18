const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require ("nodemailer");

//for dotenv
require("dotenv").config();

//server create
const app = express();

//middleware usage
app.use(cors());
app.use(bodyParser.json());

//dataBase url
const dbURL = process.env.mongoURL;

//connect database
mongodb.MongoClient.connect(dbURL, (err, client) => {
    if (err) {
      return console.log("Error in connecting to DB");
    }
  
    //if no error
    console.log("Connected to Database");
    const newDB = client.db("todoDBfullStack");
  
    //apis here
  
    //signup API
    app.post("/signup", async (req, res) => {
      console.log("req.body=", req.body);
  
      //check if user exist or not
      var existingUser = await newDB
        .collection("user")
        .find({ email: req.body.email })
        .toArray();
      console.log("existing user=", existingUser);
  
      //if user exist
      if (existingUser.length > 0) {
        return res.status(401).json("User already exist please login instead");
      }
      //if user does not exist
      else if (existingUser.length === 0) {
        var createdUser = await newDB.collection("user").insertOne(req.body);
        console.log("created user=", createdUser);
        if (createdUser.acknowledged === true) {
          var User = await newDB
            .collection("user")
            .find({ email: req.body.email })
            .toArray();

            // const client = new SMTPClient({
            //   user: 'Srishti Tamboli',
            //   password: process.env.password,
            //   host: 'smtp.lktamboli39@gmail.com',
            //   ssl: true,
            // });

            // client.send(
            //   {
            //     text: `Thanks for signing up`,
            //     from: process.env.email,
            //     to: req.body.email,
            //     subject: `Hello ${req.body.name}`,
            //   },
            //   (err) => {
            //     console.log(err);
            //   }
            // );

          
                    
             //send mail to the person who has successfully signed in
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.email,
            pass: process.env.password,
          },
        });
        try {
          transporter.sendMail({
            to: req.body.email,
            subject: "Thanks for signup",
            html: `<h1>Hello ${req.body.name}, thanks for signing up !!!!!!!!</h1>`,
          });
        } catch (err) {
          console.log(err);
        }
           

          return res.status(200).json(User);
        } else {
          return res.status(401).json("Error in saving user to db");
        }
      }
    });

    // api for login.
    app.post("/login",async(req,res)=>{
      console.log("req.body=",req.body);

      try{
        var existingUser = await newDB.collection("user").find({email:req.body.email}).toArray();
        console.log("existingUser=",existingUser);
      }catch(err){
        console.log(err);
      }
      //if user does not exist.
      if(existingUser.length===0){
        return res.status(401).json("User does not exist,please signup instead");
      }
      //if user exist
      else if(existingUser.length>0){
        //match password entered with the database stored password.
        if(req.body.password===existingUser[0].password){
          return res.status(200).json(existingUser);
        }
        else{
          return res.status(401).json("wrong password entered");
        }
      }
    });

    //api for createTodo.
    app.post("/createTodo",async(req,res)=>{
      console.log("req.body=",req.body);
      const{title,description,deadline,userID}=req.body;  //destructring of todo.

      //create todo here.
      try{
        let createdTodo = await newDB.collection("todo").insertOne({
          title:title,
          description:description,
          deadline:deadline,
          userID:userID,
        });
        
        //if successfull.
        if(createdTodo.acknowledged===true){
          return res.status(200).json("Successfull");
        }else{
          return res.status(500).json("unsuccessfull");
        }

      }catch(err){
        console.log(err);
      }
    });

    //api for getAllTodo.
    app.get("/getAllTodo/:userID",async(req,res)=>{
      console.log("req.params.userID=",req.params.userID);

      //find all todo for logined or signuped user.
      try{
        let allTodo = await newDB.collection("todo").find({userID:req.params.userID}).toArray();
        return res.status(200).json(allTodo);
      }catch(err){
        console.log(err);
      }
    });

    //api to delete todo
    app.delete("/deleteTodo/:id",async(req,res)=>{
      console.log("req.body=",req.body);

      //to delete the corresponding todo.
      try{
     await newDB.collection("todo").deleteOne({_id:req.params.id}).then((deletedTodo)=>{
      return res.status(200).json("Successfully deleted");
    })
      }catch(err){
        console.log(err);
      }
    });

    app.put("/updateTodo/:id",async(req,res)=>{
      console.log("req.body=",req.body);

      //to update the corresponding todo.
      try{
      await newDB.collection("todo").updateOne({_id:req.params.id},{$set:{title:req.body.title}}).then((updatedTodo)=>{
        return res.status(200).json(updatedTodo);
      });
      }catch(err){
      console.log(err);
      }
    })
  });
  
  app.listen(8081, () => {
    console.log("Server has started");
  });




