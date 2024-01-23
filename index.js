const express= require('express');
const app=express();
const ejs= require('ejs')
const path=require('path');
const route=require('./route/r.js');


app.set("view engine", "ejs");
app.set('views',path.join(__dirname,'views'));

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',route)
app.listen(3000,()=>{
    console.log("server running")
})