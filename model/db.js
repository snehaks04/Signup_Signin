const mongoose=require('mongoose');
mongoose.connect('your mongodb connection');
const userSchema= new mongoose.Schema({
    name:{type : String , required : true},  //username of the user     
    email : { type : String,required :true },   //email id of the user
    password :{ type :String, required:true}     //password for the user
})
module.exports=mongoose.model('s',userSchema);