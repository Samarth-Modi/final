const fs = require('fs');

var db = 'mongodb+srv://dbUser:sdmodi@senecaweb.yduebyi.mongodb.net/?retryWrites=true&w=majority'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var mongoose = require("mongoose");

const bcrypt = require('bcryptjs');

var finalUser = new Schema(
    {
        "email":
        {
            type : String,
            unique : true
        },
        "password" : String,
    });

let a;

module.exports.startDB = function()
{
    return new Promise((res,rej)=>
    {
        a = mongoose.createConnection(db, {useNewUrlParser: true, useUnifiedTopology: true}, function(error)
        {
            if(error){console.log(error);
            rej();
            }
            else
            {
                console.log("DB connection successful.");
                a = a.model("users",finalUser);
                res();
            }
        });
    });
}

module.exports.registerUser = function(userData){
    return new Promise((res, rej)=> {
    if(userData.password === "" || userData.email === "" ){
        rej("Error: email or password cannot be empty or only white spaces! ");
  
    }
  
    bcrypt.genSalt(10, function(err, salt) { 
        bcrypt.hash(userData.password, salt, function(err, hashValue) {
           if(err){
            rej("There was an error encrypting the password");   
           }else{
            userData.password = hashValue;
  
            let newUser = new  a(userData);
   
    newUser.save((err) => {
        if(err && err.code == 11000) {
          rej("user’s email) already taken");
        } else if(err && err.code != 11000) {
          rej("Error: cannot create the user. "+err);
        }
        else{
            console.log("Working"); 
            res();
        }
      
      });
            
           }
        });
        });
  
  
    });
  }

  module.exports.registerUser = function(userData){
    return new Promise((res, rej)=> {
    if(userData.password === "" || userData.email === "" ){
        rej("Error: email or password cannot be empty or only white spaces! ");
  
    }
  
    bcrypt.genSalt(10, function(err, salt) { 
        bcrypt.hash(userData.password, salt, function(err, hashValue) { 
           if(err){
            rej("There was an error encrypting the password");   
           }else{
            userData.password = hashValue;
  
            let newUser = new  a(userData);
   
    newUser.save((err) => {
        if(err && err.code == 11000) {
          rej("user’s email) already taken");
        } else if(err && err.code != 11000) {
          rej("Error: cannot create the user. "+err);
        }
        else{
            console.log("Working"); 
            res();
        }
      
      });
            
           }
        });
        });
  
  
    });
  }
