//Samarth_modi
//133357202
//sdmodi@myseneca.ca

const express = require("express");

const path = require("path");

const app = express();

var final = require('./final.js')

const PORT = process.env.PORT || 8080;

function onhttp(){
    console.log("Express http server listening on port",PORT);
  }
//app.listen(PORT, () => console.log(`Express http server listening on ${PORT}`));

//home
app.get('/',(req,res)=>
{
    res.sendFile(path.join(__dirname , './finalViews/home.html'));
})


app.get("/register",(req,res)=>
{
    res.sendFile(path.join(__dirname ,'./finalViews/register.html'));
})

app.get("/signIn",(req,res)=>
{
    res.sendFile(path.join(__dirname,'./finalViews/signIn.html'));
})

app.post("/register",(req,res)=>
{
    final.register(req.body).then(()=>
    {

    }).catch(err=> res.render({message:"Error: Email or pasword cannot complete"}));
});

app.post("/signIn",(req,res)=>
{   
    final.signIn().then(()=>
    {

    }).catch(err => render({message: "Error: Email or pasword cannot complete" }))
});

app.use((req,res)=>
{
    res.status(404).send("Page Not found");
})

final.startDB().then(function()
{
    app.listen(PORT,onhttp);
})
.catch(function(err) 
{
    console.log('failer to start ' + err)
});
