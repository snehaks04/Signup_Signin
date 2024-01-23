const express=require('express');
const bcrypt=require('bcrypt');
const s=require('../model/db');
const session=require('express-session')
const flash=require('express-flash');

// const {  mongoose } = require('mongoose');
const route=express.Router();

route.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))
route.use(flash());



route.get('/signup',(req,res)=>{
    res.render('signup.ejs')
})

route.post('/signup', async (req,res)=>{
    try{
const hashpass= await bcrypt.hash(req.body.password,10);
await s.create({
    name:req.body.name,
    email:req.body.email,
    password:hashpass
})
// res.json({
//     msg:"user created successfully"
// })
res.redirect('/signin')
    } catch{
// res.redirect('/signup')
console.log("error")
    }
})
route.get('/signin',(req,res)=>{
   
    res.render('signin.ejs',{messages:req.flash('error')})
})
route.get('/welcome',(req,res)=>{
    res.render('welcome.ejs')
})
route.post("/signin",async (req,res) => {
    try{
        let user = await s.findOne({name : req.body.name});
        const ispasswordMatch= await bcrypt.compare(req.body.password,user.password)
            if(ispasswordMatch){
                res.render('welcome.ejs',{name:req.body.name})
            } else{
                res.send("Password invalid")
            }
    } catch{
       req.flash('error','Invalid username and password')
    //    console.log('error','Check username and password')
      res.redirect('/signin')
    }
})

module.exports=route;